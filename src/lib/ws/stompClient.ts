import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export type TokenProvider = () => string | Promise<string>;

type AckMode = "auto" | "client" | "client-individual";

type HandlerRecord = {
    id: string;
    cb: (payload: any, frame: IMessage) => void;
};

type SubRecord = {
    destination: string;
    headers?: Record<string, any>;
    ack?: AckMode;
    sub?: StompSubscription;
    handlers: Map<string, HandlerRecord>;
};

const WS_PATH = "http://localhost:8080/ws";

function safeUUID() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export class StompService {
    private client: Client | null = null;
    private tokenProvider?: TokenProvider;
    private subs = new Map<string, SubRecord>();
    private connecting = false;
    private connected = false;
    private publishQueue: Array<{ destination: string; body: any; headers?: Record<string, any> }> = [];

    ensureConnected = (tokenProvider?: TokenProvider) => {
        this.tokenProvider = tokenProvider ?? this.tokenProvider;
        if (this.connected || this.connecting) return;
        // Avoid SSR usage
        if (typeof window === "undefined") return;
        this.connect();
    };

    private async connect() {
        this.connecting = true;
        const token = (await this.tokenProvider?.()) ?? "";

        this.client = new Client({
            // Use SockJS factory for maximum browser compatibility
            webSocketFactory: () => new SockJS(WS_PATH),

            // If you use native WS instead, set brokerURL and remove webSocketFactory:
            // brokerURL: "wss://your-domain/ws",

            connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            reconnectDelay: 4000,
            debug: () => { }, // silence logs (or use console.log)

            onConnect: () => {
                this.connected = true;
                this.connecting = false;
                this.resubscribeAll();
                this.flushPublishQueue();
            },

            onStompError: (frame) => {
                console.error("[STOMP ERROR]", frame.headers["message"], frame.body);
            },

            onWebSocketClose: (evt) => {
                this.connected = false;
                this.connecting = false;
                console.warn("[WS CLOSED]", (evt && (evt as any).reason) || (evt && (evt as any).code));
                // Auto-reconnect handled by reconnectDelay
            },
        });

        this.client.activate();

        // Browser lifecycle hooks
        if (typeof window !== "undefined") {
            window.addEventListener("offline", this.handleOffline);
            window.addEventListener("online", this.handleOnline);
            document.addEventListener("visibilitychange", this.handleVisibility);
        }
    }

    private handleOffline = () => {
        if (this.client?.active) this.client.deactivate();
    };
    private handleOnline = () => {
        if (!this.client?.active) this.client?.activate();
    };
    private handleVisibility = () => {
        // optional: pause heartbeats when hidden, etc.
    };

    disconnect = async () => {
        if (typeof window !== "undefined") {
            window.removeEventListener("offline", this.handleOffline);
            window.removeEventListener("online", this.handleOnline);
            document.removeEventListener("visibilitychange", this.handleVisibility);
        }

        this.subs.forEach((s) => s.sub?.unsubscribe());
        this.subs.clear();

        if (this.client?.active) {
            await this.client.deactivate();
        }
        this.client = null;
        this.connected = false;
        this.connecting = false;
    };

    updateToken = async (nextToken: string) => {
        // Reconnect with a new token (e.g. after refresh)
        await this.disconnect();
        this.ensureConnected(() => nextToken);
    };

    publish = (destination: string, body: any, headers?: Record<string, any>) => {
        if (!this.client || !this.connected) {
            // queue until connected
            this.publishQueue.push({ destination, body, headers });
            return;
        }
        this.client.publish({
            destination,
            body: typeof body === "string" ? body : JSON.stringify(body),
            headers,
        });
    };

    private flushPublishQueue() {
        if (!this.client || !this.connected) return;
        while (this.publishQueue.length) {
            const msg = this.publishQueue.shift()!;
            this.client.publish({
                destination: msg.destination,
                body: typeof msg.body === "string" ? msg.body : JSON.stringify(msg.body),
                headers: msg.headers,
            });
        }
    }

    subscribe = (
        destination: string,
        cb: (payload: any, frame: IMessage) => void,
        opts?: { headers?: Record<string, any>; ack?: AckMode }
    ) => {
        const key = this.makeSubKey(destination, opts?.ack, opts?.headers);
        let record = this.subs.get(key);
        const handlerId = safeUUID();

        if (!record) {
            record = {
                destination,
                headers: opts?.headers,
                ack: opts?.ack,
                handlers: new Map<string, HandlerRecord>(),
            };
            this.subs.set(key, record);
            if (this.connected) this.attachUnderlyingSubscription(record);
        }

        record.handlers.set(handlerId, { id: handlerId, cb });

        return () => {
            const current = this.subs.get(key);
            if (!current) return;
            current.handlers.delete(handlerId);
            if (current.handlers.size === 0) {
                current.sub?.unsubscribe();
                this.subs.delete(key);
            }
        };
    };

    private makeSubKey(destination: string, ack?: AckMode, headers?: Record<string, any>): string {
        const ackPart = ack ?? "auto";
        const headersPart = headers ? JSON.stringify(this.sortObject(headers)) : "";
        return `${destination}|ack:${ackPart}|h:${headersPart}`;
    }

    private sortObject(obj: Record<string, any>): Record<string, any> {
        const sortedKeys = Object.keys(obj).sort();
        const out: Record<string, any> = {};
        for (const k of sortedKeys) {
            const v = (obj as any)[k];
            out[k] = v && typeof v === "object" && !Array.isArray(v) ? this.sortObject(v) : v;
        }
        return out;
    }

    private attachUnderlyingSubscription(record: SubRecord) {
        if (!this.client) return;
        record.sub = this.client.subscribe(
            record.destination,
            (frame) => {
                let data: any = frame.body;
                try {
                    data = JSON.parse(frame.body);
                } catch { }
                // fan-out to all handlers
                record.handlers.forEach((h) => {
                    try { h.cb(data, frame); } catch (e) { console.error(e); }
                });
                if (record.ack && "ack" in frame) {
                    (frame as any).ack?.();
                }
            },
            { ack: record.ack ?? "auto", ...(record.headers || {}) }
        );
    }

    private resubscribeAll() {
        if (!this.client) return;
        this.subs.forEach((record) => {
            if (record.sub) record.sub.unsubscribe();
            this.attachUnderlyingSubscription(record);
        });
    }

    isConnected = () => this.connected;
}

export const ws = new StompService();
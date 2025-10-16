import { useEffect, useRef } from "react";
import { ws } from "@/lib/ws/stompClient";

type ReadStateOptions = {
    ack?: "auto" | "client" | "client-individual";
    headers?: Record<string, any>;
};

const toNumber = (value: unknown): number | null => {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }

    if (value && typeof value === "object") {
        const possible = (value as Record<string, unknown>).lastReadMessageSeq
            ?? (value as Record<string, unknown>).seq
            ?? (value as Record<string, unknown>).value
            ?? (value as Record<string, unknown>).data;
        if (typeof possible === "number" || typeof possible === "string") {
            return toNumber(possible);
        }
    }

    return null;
};

export function useUserChatReadStateTopic(
    chatId: number | null,
    userId: number | null,
    onMessage: (lastReadSeq: number) => void,
    opts?: ReadStateOptions,
) {
    const handlerRef = useRef(onMessage);
    handlerRef.current = onMessage;
    useEffect(() => {
        if (!chatId || !userId) return;

        const destination: string = `/topic/user/chats/${chatId}/read-state/${userId}`;
        const unSub = ws.subscribe(destination, (payload) => {
            const parsed = toNumber(payload);
            if (parsed !== null)
                handlerRef.current(parsed);
        }, opts);

        return () => unSub?.();
    }, [chatId, userId, opts?.ack, JSON.stringify(opts?.headers)]);
}

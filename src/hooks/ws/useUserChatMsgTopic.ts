import { ws } from "@/lib/ws/stompClient";
import { useEffect, useRef } from "react";

export function useUserChatMsgTopic<T = any>(
    chatId: number,
    onMessage: (message: T) => void,
    opts?: { ack?: "auto" | "client" | "client-individual"; headers?: Record<string, any> }
) {
    const handlerRef = useRef(onMessage);
    handlerRef.current = onMessage;
    useEffect(() => {
        if (!chatId)
            return;
        const unSub = ws.subscribe(
            "/topic/user/chats/" + chatId + "/new-msg",
            (payload) => handlerRef.current(payload as T),
            opts
        );

        return () => unSub?.();
    }, [chatId, opts?.ack, JSON.stringify(opts?.headers)]);
}
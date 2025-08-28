import { ws } from "@/lib/ws/stompClient";
import { useEffect } from "react";

export function useUserChatMsgTopic<T = any>(
    chatId: number,
    onMessage: (message: T) => void,
    opts?: { ack?: "auto" | "client" | "client-individual"; headers?: Record<string, any> }
) {
    useEffect(() => {
        if (!chatId)
            return;
        const unSub = ws.subscribe("/topic/user/chats/" + chatId + "/new-msg",
            (payload) => {
                onMessage(payload as T)
            });

        return () => unSub?.();
    }, [chatId, JSON.stringify(opts)]);
}
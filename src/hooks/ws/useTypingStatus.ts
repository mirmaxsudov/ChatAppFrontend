import { ws } from "@/lib/ws/stompClient";
import { useEffect } from "react";

export function useTypingStatus(chatId: number, userId: number, onMessage: (isTyping: boolean) => void) {
    useEffect(() => {
        if (!chatId || !userId) return;
        const unSub = ws.subscribe(`/topic/user/chats/${chatId}/typing/${userId}`, (payload) => {
            onMessage(payload);
        }, {
            ack: "auto"
        })

        return () => unSub?.();
    }, [chatId, userId, onMessage])
}
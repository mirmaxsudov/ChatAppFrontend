import { ws } from "@/lib/ws/stompClient";
import { useEffect } from "react"

export function useUserOnlineStatusHandler(chatId: number, userId: number, onMessage: (payload: {
    chatId: number, userId: number, isOnline: boolean
}) => void) {
    useEffect(() => {
        if (!chatId)
            return;
        const unSub = ws.subscribe(`/topic/user/chats/${chatId}/online/${userId}`, (payload) => {
            onMessage(payload);
        }, {
            ack: "auto"
        });

        return () => unSub?.();
    }, [chatId, onMessage]);
}
import { ws } from "@/lib/ws/stompClient";
import { useEffect, useRef } from "react";

export function useTypingStatus(chatId: number, userId: number, onMessage: (isTyping: boolean) => void) {
    const handlerRef = useRef(onMessage);
    handlerRef.current = onMessage;
    useEffect(() => {
        if (!chatId || !userId) return;
        const unSub = ws.subscribe(`/topic/user/chats/${chatId}/typing/${userId}`, (payload) => {
            handlerRef.current(payload);
        }, {
            ack: "auto"
        })

        return () => unSub?.();
    }, [chatId, userId])
}
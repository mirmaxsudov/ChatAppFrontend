"use client";

import { ws } from "@/lib/ws/stompClient";
import { app } from "@/lib/ws/topics";
import { useCallback } from "react";

type TypingStatusRequest = {
    chatId: number;
    userId: number;
}

export function useTypingSender(chatId: number, userId: number) {
    const sendTyping = useCallback((isTyping: boolean) => {
        if (!chatId || !userId) return;
        const request: TypingStatusRequest = {
            chatId,
            userId,
        }
        ws.publish(app.typingStatus(isTyping), JSON.stringify(request));
    }, [chatId, userId])

    return { sendTyping }
}
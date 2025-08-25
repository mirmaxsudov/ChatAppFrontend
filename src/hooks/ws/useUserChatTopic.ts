"use client";

import { useEffect } from "react";
import { ws } from '../../lib/ws/stompClient';

export function useUserChatTopic<T = any>(
    userId: number,
    onMessage: (chat: T) => void,
    opts?: { ack?: "auto" | "client" | "client-individual"; headers?: Record<string, any> }
) {
    useEffect(() => {
        if (!userId)
            return;
        const unSub = ws.subscribe("/topic/user/chats/" + userId, (payload) => onMessage(payload as T), {
            ack: opts?.ack,
            headers: opts?.headers,
        });
        return () => unSub?.();
    }, [userId, JSON.stringify(opts)]);
}   
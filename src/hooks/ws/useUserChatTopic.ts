"use client";

import { useEffect, useRef } from "react";
import { ws } from '../../lib/ws/stompClient';

export function useUserChatTopic<T = any>(
    userId: number,
    onMessage: (chat: T) => void,
    opts?: { ack?: "auto" | "client" | "client-individual"; headers?: Record<string, any> }
) {
    const handlerRef = useRef(onMessage);
    handlerRef.current = onMessage;

    useEffect(() => {
        if (!userId) return;
        const unSub = ws.subscribe(
            "/topic/user/chats/" + userId,
            (payload) => handlerRef.current(payload as T),
            opts,
        );
        return () => unSub?.();
    }, [userId, opts?.ack, JSON.stringify(opts?.headers)]);
}   
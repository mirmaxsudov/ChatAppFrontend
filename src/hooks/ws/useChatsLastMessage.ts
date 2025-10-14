import { ws } from "@/lib/ws/stompClient";
import { ChatItemMessagePreview } from "@/type/chat/chat";
import { useEffect } from "react";

export function useMyChatsLastMessage(chatId: number, userId: number, onMessage: (request: ChatItemMessagePreview) => void) {
    useEffect(() => {
        if (!chatId || !userId) return;
        const unSub = ws.subscribe(`/topic/user/chats/preview-msg/${chatId}/${userId}`, (payload) => {
            onMessage(payload);
        }, {
            ack: "auto"
        });

        return () => unSub?.();
    }, [chatId, userId, onMessage]);
}
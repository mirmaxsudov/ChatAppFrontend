import { ws } from "@/lib/ws/stompClient";
import { MessageDeleteWsResponse } from "@/type/chat/message";
import { useEffect } from "react";

function deleteMessage(chatId: number, onMessage: (payload: MessageDeleteWsResponse) => void) {
    useEffect(() => {
        if (!chatId) return;
        ws.subscribe("/topic/user/chats/" + chatId + "/delete-message", (payload) => onMessage(payload));
    }, [chatId, onMessage]);
}

export default deleteMessage;
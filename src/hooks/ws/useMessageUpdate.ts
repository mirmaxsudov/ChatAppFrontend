import { ws } from "@/lib/ws/stompClient";
import { ChatMessageUpdateType } from "@/type/chat/chat";
import { useEffect } from "react";

export function useMessageUpdate(chatId: number, onMessage: (payload: ChatMessageUpdateType) => void) {
    useEffect(() => {
        console.log(chatId);
        
        if (!chatId) return;
        ws.subscribe("/topic/user/chats/update-msg/" + chatId, (payload) => {
            onMessage(payload);
        })
    }, [chatId, onMessage]);
}


export default useMessageUpdate;
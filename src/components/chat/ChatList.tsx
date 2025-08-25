"use client";

import { ChatSummary } from "@/type/chat/chat";
import { Button } from "../ui/button";
import ChatItem from "./ChatItem";
import ChatNav from "./ChatNav";
import { useMyChats } from "@/hooks/useMyChats";
import { useEffect, useState, useCallback } from "react";
import { useUserChatTopic } from "@/hooks/ws/useUserChatTopic";
import useUser from "@/store/useUser";

const ChatList = ({
    width,
    setSelectedChat,
}: {
    width: number;
    setSelectedChat: (chat: ChatSummary) => void;
}) => {
    const { data, isLoading, isError, refetch } = useMyChats();
    const [chats, setChats] = useState<ChatSummary[]>([]);
    const user = useUser((s) => s.user!);

    const handleIncomingChat = useCallback((incoming: ChatSummary) => {
        setChats((prev) => {
            const idx = prev.findIndex((c) => c.chatId === incoming.chatId);
            if (idx >= 0) {
                const next = [...prev];
                next[idx] = { ...next[idx], ...incoming };
                return next;
            }
            return [incoming, ...prev];
        });
    }, []);

    useUserChatTopic<ChatSummary>(user.id, handleIncomingChat);

    useEffect(() => {
        if (data) setChats(data);
    }, [data]); 

    return (
        <div style={{ width }} className="w-full relative h-full flex flex-col">
            <ChatNav />
            <div className="flex-1 overflow-y-auto h-0 scrollbar-hide p-2">
                {isLoading && (
                    <div className="space-y-2">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-12 rounded-md animate-pulse bg-muted/60" />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="flex h-full items-center justify-center gap-2 text-sm">
                        <span>Failed to load chats.</span>
                        <Button size="sm" variant="outline" onClick={() => refetch()}>
                            Retry
                        </Button>
                    </div>
                )}

                {!isLoading && !isError && (chats?.length ?? 0) === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                        No Chats
                    </div>
                )}

                {!isLoading && !isError && (chats?.length ?? 0) > 0 && (
                    <div className="space-y-1">
                        {chats.map((chat) => (
                            <div key={chat.chatId} onClick={() => setSelectedChat(chat)}>
                                <ChatItem chat={chat} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;
"use client";

import { ChatSummary } from "@/type/chat/chat";
import { Button } from "../ui/button";
import ChatItem from "./ChatItem";
import ChatNav from "./ChatNav";
import { useMyChats } from "@/hooks/useMyChats";
import { useEffect, useState, useCallback } from "react";
import { useUserChatTopic } from "@/hooks/ws/useUserChatTopic";
import useUser from "@/store/useUser";
import { ChatType } from "@/enums/ChatEnum";
import clsx from "clsx";
import { newStartChat } from "@/api/chat/chat.api";

const ChatList = ({
    width,
    setSelectedChat,
    selectedChat
}: {
    width: number;
    setSelectedChat: (chat: ChatSummary) => void;
    selectedChat: ChatSummary | null
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

    const createNewSavedChat = async () => {
        try {
            await newStartChat(user.id, "");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{ width }} className="w-full relative h-full flex flex-col">
            <ChatNav setSavedChat={() => {
                const filteredChats = chats.filter(chat => chat.type === ChatType.SAVED);
                if (filteredChats.length === 0)
                    createNewSavedChat();
                else
                    setSelectedChat(filteredChats[0]);
            }} />
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
                            <div className={clsx("", {
                                "bg-gray-200": chat.chatId === selectedChat?.chatId
                            })} key={chat.chatId} onClick={() => setSelectedChat(chat)}>
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
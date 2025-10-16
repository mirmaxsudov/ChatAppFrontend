"use client";

import { ChatItemResponse } from "@/type/chat/chat";
import { Button } from "../ui/button";
import ChatItem from "./ChatItem";
import ChatNav from "./ChatNav"; import { useEffect } from "react";
import clsx from "clsx";
import useMyChat from "@/store/useMyChatResponse";

type ChatListProps = {
    setSelectedChatId: (chatId: number | null) => void;
    selectedChatId: number | null;
    width: number;
}

const ChatList = ({ width, selectedChatId, setSelectedChatId }: ChatListProps) => {
    const { isLoading, isError, response } = useMyChat(s => s);

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
                        <Button size="sm" variant="outline">
                            Retry
                        </Button>
                    </div>
                )}

                {!isLoading && !isError && (response?.chats.items?.length ?? 0) === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                        No Chats
                    </div>
                )}

                {!isLoading && !isError && (response?.chats.items?.length ?? 0) > 0 && (
                    <div className="space-y-1">
                        {response?.chats?.items?.map((chat) => (
                            <div
                                onClick={() => {
                                    setSelectedChatId(chat.id);
                                }}
                                className={clsx("", {
                                    "bg-gray-200 dark:bg-[#272A30]": chat?.id === selectedChatId
                                })} key={chat?.id} >
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
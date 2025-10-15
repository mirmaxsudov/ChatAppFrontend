"use client";

import { ChatItemResponse, ChatSummary } from "@/type/chat/chat";
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
import useMyChat from "@/store/useMyChatResponse";

type ChatListProps = {
    setSelectedChat: (chatItem: ChatItemResponse | null) => void;
    selectedChat: ChatItemResponse | null;
    width: number;
}

const ChatList = ({ width, selectedChat, setSelectedChat }: ChatListProps) => {
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
                                    setSelectedChat(chat);
                                }}
                                className={clsx("", {
                                    "bg-gray-200 dark:bg-[#272A30]": chat?.id === selectedChat?.id
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
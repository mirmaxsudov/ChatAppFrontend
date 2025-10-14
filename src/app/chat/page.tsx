"use client"

import ChatContent from "@/components/chat/ChatContent";
import ChatFooter from "@/components/chat/ChatFooter";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatList from "@/components/chat/ChatList";
import AuthChecker from "@/helper/tsx/AuthChecker";
import { useMyChats } from "@/hooks/useMyChats";
import useMyChat from "@/store/useMyChatResponse";
import { ChatItemResponse, ChatSummary, MyChatResponse } from "@/type/chat/chat";
import { useEffect, useRef, useState } from "react";

const MIN_WIDTH = 200;
const MAX_WIDTH = 500;

const Chat = () => {
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const [selectedChat, setSelectedChat] = useState<ChatItemResponse | null>(null);
    const { data, isLoading, isError, refetch } = useMyChats();
    const { response, setResponse, setError, setLoading } = useMyChat(state => state);

    const isResizing = useRef(false);

    useEffect(() => {
        setLoading(isError);
        setError(isError);
        if (!isLoading && !isError)
            setResponse(data!);
    }, [isLoading, data, isError])

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    });

    const handleMouseDown = () => {
        isResizing.current = true;
        document.body.style.cursor = "col-resize";
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current) return;
        const newWidth = Math.min(Math.max(e.clientX, MIN_WIDTH), MAX_WIDTH);
        setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.body.style.cursor = "";
    };

    return (
        <AuthChecker>
            <section
                className="w-full h-screen flex overflow-x-hidden bg-white dark:bg-[#181A20] transition-colors duration-300">
                <div
                    className="h-full flex-shrink-0 bg-gray-100 dark:bg-[#23262F] border-r border-gray-200 dark:border-[#23262F] transition-colors duration-300"
                    style={{ width: sidebarWidth }}
                >
                    <ChatList selectedChat={selectedChat} setSelectedChat={setSelectedChat} width={sidebarWidth} />
                </div>
                <div
                    className="w-2 cursor-col-resize bg-gray-200 dark:bg-[#23262F] hover:bg-gray-300 dark:hover:bg-[#2A2D36] transition-colors duration-300"
                    onMouseDown={handleMouseDown}
                />
                {!selectedChat && <>
                    <div className="h-full w-full text-center flex justify-center items-center">
                        <span className="bg-gray-200 dark:bg-[#23262F] rounded-full px-4 py-1">
                            <h1 className="text-[14px]">Select a chat to start messaging</h1>
                        </span>
                    </div>
                </>}
                {selectedChat && <>
                    <div className="flex-1 h-full bg-white dark:bg-[#020618] transition-colors duration-300">
                        <div className="flex flex-col h-screen w-full">
                            <ChatHeader chat={selectedChat!} />
                            <div className="flex-1 overflow-y-auto p-[8px]">
                                <ChatContent chat={selectedChat!} />
                            </div>
                            <ChatFooter chat={selectedChat!} />
                        </div>
                    </div>
                </>}
            </section>
        </AuthChecker>
    );
};

export default Chat;
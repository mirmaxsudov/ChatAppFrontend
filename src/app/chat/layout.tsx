"use client";

import React, {useRef, useState} from "react";
import Chat from "@/components/chat/Chat";
import ChatList from "@/components/chat/ChatList";
import NotFound from "@/components/chat/NotFound";
import {ThemeToggle} from "@/components/ThemeToggle";
import AuthChecker from "@/helper/tsx/AuthChecker";

const MIN_WIDTH = 200;
const MAX_WIDTH = 500;

const ChatLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const isResizing = useRef(false);

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

    React.useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    });

    return (
        <AuthChecker>
            <section
                className="w-full h-screen flex overflow-x-hidden bg-white dark:bg-[#181A20] transition-colors duration-300">
                <div
                    className="h-full flex-shrink-0 bg-gray-100 dark:bg-[#23262F] border-r border-gray-200 dark:border-[#23262F] transition-colors duration-300"
                    style={{width: sidebarWidth}}
                >
                    <ChatList width={sidebarWidth}/>
                </div>
                <div
                    className="w-2 cursor-col-resize bg-gray-200 dark:bg-[#23262F] hover:bg-gray-300 dark:hover:bg-[#2A2D36] transition-colors duration-300"
                    onMouseDown={handleMouseDown}
                />
                <div className="flex-1 h-full bg-white dark:bg-[#020618] transition-colors duration-300">
                    {children}
                </div>
            </section>
        </AuthChecker>
    );
};

export default ChatLayout;
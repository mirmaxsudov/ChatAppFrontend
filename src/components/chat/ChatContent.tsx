"use client"

import { ChatSummary } from "@/type/chat/chat";
import ImageCaptionMessage from "./messages/images/ImageCaptionMessage";
import ImageMessageLeft from "./messages/images/ImageMessageLeft";
import ImagesMessage from "./messages/images/ImagesMessage";
import JustTextMessageLeft from "./messages/JustTextMessageLeft";
import JustTextMessageRight from "./messages/JustTextMessageRight";
import { useMyMessages } from "@/hooks/useMyMessages";
import useUser from "@/store/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCw, AlertCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { MessageResponse } from "@/type/chat/message";
import { useUserChatMsgTopic } from "@/hooks/ws/useUserChatMsgTopic";
import { linkify } from "@/helper/ts/Linkify";

// Message Skeleton Component
const MessageSkeleton = ({ isRight = false }: { isRight?: boolean }) => (
    <div className={`flex ${isRight ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-[70%] ${isRight ? 'order-2' : 'order-1'}`}>
            <Skeleton className="h-4 w-8 mb-2" />
            <Skeleton className={`h-12 rounded-lg ${isRight ? 'bg-primary/20' : 'bg-muted'}`} />
        </div>
    </div>
);

// Error Component
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Failed to load messages. Please try again.
            </AlertDescription>
        </Alert>
        <Button
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
        >
            <RefreshCw className="h-4 w-4" />
            Retry
        </Button>
    </div>
);

const LoadingSkeleton = () => (
    <div className="space-y-4 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
            <MessageSkeleton key={index} isRight={index % 2 === 0} />
        ))}
    </div>
);

const AnimatedMessage = ({
    message,
    isOwn,
    isNew = false
}: {
    message: MessageResponse;
    isOwn: boolean;
    isNew?: boolean;
}) => {
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isNew && messageRef.current) {
            messageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [isNew]);

    const MessageComponent = isOwn ? JustTextMessageRight : JustTextMessageLeft;

    return (
        <div
            ref={messageRef}
            className={`transition-all duration-500 ease-out ${isNew
                ? 'animate-in slide-in-from-bottom-2 fade-in-0'
                : ''
                }`}
            style={{
                animationDelay: isNew ? '0ms' : undefined,
                animationFillMode: 'both'
            }}
        >
            <MessageComponent message={linkify(message.text)} />
        </div>
    );
};

const ChatContent = ({
    chat
}: {
    chat: ChatSummary
}) => {
    const { data, isLoading, isError, refetch } = useMyMessages(chat.chatId);
    const cnrtUser = useUser(state => state.user);
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [newMessageIds, setNewMessageIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (!isLoading && !isError && data?.data) {
            setMessages(data.data);
            setNewMessageIds(new Set());
        }
    }, [data, isLoading, isError]);

    useUserChatMsgTopic(chat.chatId, (msg: MessageResponse) => {
        setMessages(prevMessages => [...prevMessages, msg]);
        // Mark this message as new for animation
        setNewMessageIds(prev => new Set([...prev, msg.id]));

        // Remove the new indicator after animation completes
        setTimeout(() => {
            setNewMessageIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(msg.id);
                return newSet;
            });
        }, 1000);
    });

    if (isLoading)
        return <LoadingSkeleton />;

    if (isError)
        return <ErrorState onRetry={() => refetch()} />;

    if (!messages || messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 text-muted-foreground">
                <div className="text-center">
                    <h3 className="text-lg font-medium">No messages yet</h3>
                    <p className="text-sm">Start a conversation by sending a message!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            {messages.map((message, index) => (
                <AnimatedMessage
                    key={message.id || index}
                    message={message}
                    isOwn={message.senderId === cnrtUser?.id}
                    isNew={newMessageIds.has(message.id)}
                />
            ))}
        </div>
    );
}

export default ChatContent;
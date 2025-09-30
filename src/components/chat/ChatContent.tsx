"use client"

import { useEffect, useState, useRef, useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, AlertCircle } from "lucide-react";
import { ChatSummary } from "@/type/chat/chat";
import { useMyMessages } from "@/hooks/useMyMessages";
import useUser from "@/store/useUser";
import { MessageResponse } from "@/type/chat/message";
import { useUserChatMsgTopic } from "@/hooks/ws/useUserChatMsgTopic";
import { useUserChatReadStateTopic } from "@/hooks/ws/useUserChatReadStateTopic";
import { linkify } from "@/helper/ts/Linkify";
import JustTextMessageRight from "./messages/JustTextMessageRight";
import JustTextMessageLeft from "./messages/JustTextMessageLeft";
import { ChatType } from "@/enums/ChatEnum";
import { readMessages } from "@/api/chat/chat.api";

const READ_THROTTLE_MS = 300;
const FULL_VISIBILITY_RATIO = 0.95;
const HEIGHT_TOLERANCE_PX = 2;

const isFullyVisible = (
    elementRect: DOMRect,
    containerRect: DOMRect,
): boolean =>
    elementRect.top >= containerRect.top - HEIGHT_TOLERANCE_PX &&
    elementRect.bottom <= containerRect.bottom + HEIGHT_TOLERANCE_PX;

const MessageSkeleton = ({ isRight = false }: { isRight?: boolean }) => (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"} mb-4`}>
        <div className={`max-w-[70%] ${isRight ? "order-2" : "order-1"}`}>
            <Skeleton className="h-4 w-8 mb-2" />
            <Skeleton className={`h-12 rounded-lg ${isRight ? "bg-primary/20" : "bg-muted"}`} />
        </div>
    </div>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load messages. Please try again.</AlertDescription>
        </Alert>
        <Button onClick={onRetry} variant="outline" size="sm" className="flex items-center gap-2">
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
    formattedText,
    isOwn,
    isRead,
    isNew = false,
    onNodeChange,
}: {
    formattedText: string;
    isOwn: boolean;
    isRead: boolean;
    isNew?: boolean;
    onNodeChange?: (node: HTMLDivElement | null) => void;
}) => {
    const messageRef = useRef<HTMLDivElement>(null);

    const handleRef = useCallback(
        (node: HTMLDivElement | null) => {
            messageRef.current = node;
            onNodeChange?.(node);
        },
        [onNodeChange]
    );

    useEffect(() => {
        if (isNew && isOwn && messageRef.current) {
            messageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [isNew, isOwn]);

    return (
        <div
            ref={handleRef}
            className={`transition-all duration-500 ease-out ${isNew ? "animate-in slide-in-from-bottom-2 fade-in-0" : ""}`}
            style={{
                animationDelay: isNew ? "0ms" : undefined,
                animationFillMode: "both",
            }}
        >
            {isOwn ? (
                <JustTextMessageRight message={formattedText} isRead={isRead} />
            ) : (
                <JustTextMessageLeft message={formattedText} />
            )}
        </div>
    );
};

const ChatContent = ({ chat }: { chat: ChatSummary }) => {
    const { data, isLoading, isError, refetch } = useMyMessages(chat.chatId);
    const currentUser = useUser((state) => state.user);
    const currentUserId = currentUser?.id ?? null;

    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [newMessageIds, setNewMessageIds] = useState<Set<number>>(new Set());
    const [lastReadSeq, setLastReadSeq] = useState<number>(chat.lastReadMessageSeq ?? 0);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const latestSentSeqRef = useRef<number>(chat.lastReadMessageSeq ?? 0);
    const pendingSeqRef = useRef<number | null>(null);
    const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const messageNodesRef = useRef<Map<number, HTMLDivElement>>(new Map());
    const nodeMetaRef = useRef<Map<HTMLDivElement, { seq: number; senderId: number | null }>>(new Map());
    const highestVisibleSeqRef = useRef<number>(chat.lastReadMessageSeq ?? 0);

    useEffect(() => {
        const initialSeq = chat.lastReadMessageSeq ?? 0;
        setLastReadSeq(initialSeq);
        latestSentSeqRef.current = initialSeq;
        highestVisibleSeqRef.current = initialSeq;
    }, [chat.chatId, chat.lastReadMessageSeq]);

    useEffect(() => {
        messageNodesRef.current.forEach((node) => observerRef.current?.unobserve(node));
        messageNodesRef.current.clear();
        nodeMetaRef.current.clear();
    }, [chat.chatId]);

    useEffect(() => {
        if (!isLoading && !isError && data?.data) {
            setMessages(data.data);
            setNewMessageIds(new Set());
        }
    }, [data, isLoading, isError]);

    useEffect(() => {
        latestSentSeqRef.current = Math.max(latestSentSeqRef.current, lastReadSeq);
    }, [lastReadSeq]);

    useEffect(() => {
        return () => {
            if (throttleRef.current) {
                clearTimeout(throttleRef.current);
            }
        };
    }, []);

    const scheduleReadUpdate = useCallback(
        (seq: number) => {
            if (chat.type === ChatType.SAVED) return;
            if (seq <= 0) return;
            if (seq <= latestSentSeqRef.current) return;

            pendingSeqRef.current = Math.max(pendingSeqRef.current ?? 0, seq);
            if (throttleRef.current) return;

            throttleRef.current = window.setTimeout(async () => {
                throttleRef.current = null;
                const toSend = pendingSeqRef.current;
                pendingSeqRef.current = null;

                if (!toSend || toSend <= latestSentSeqRef.current) return;

                try {
                    await readMessages(chat.chatId, toSend);
                    latestSentSeqRef.current = toSend;
                } catch (error) {
                    console.error("Failed to update read messages", error);
                }
            }, READ_THROTTLE_MS);
        },
        [chat.chatId, chat.type]
    );

    const evaluateVisibleMessages = useCallback(() => {
        const container = contentRef.current?.parentElement ?? contentRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        let maxSeq = highestVisibleSeqRef.current;

        messageNodesRef.current.forEach((node, seq) => {
            const meta = nodeMetaRef.current.get(node);
            if (!meta) return;

            if (currentUserId !== null && meta.senderId === currentUserId) return;

            const rect = node.getBoundingClientRect();
            if (!isFullyVisible(rect, containerRect)) return;

            if (seq > maxSeq) {
                maxSeq = seq;
            }
        });

        if (maxSeq > highestVisibleSeqRef.current) {
            highestVisibleSeqRef.current = maxSeq;
            scheduleReadUpdate(maxSeq);
        }
    }, [currentUserId, scheduleReadUpdate]);

    const handleVisibilityEntries = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            let shouldEvalFallback = false;

            for (const entry of entries) {
                if (!entry.isIntersecting) {
                    continue;
                }

                const fullyVisible =
                    entry.intersectionRatio >= FULL_VISIBILITY_RATIO ||
                    entry.intersectionRect.height >= entry.boundingClientRect.height - HEIGHT_TOLERANCE_PX;

                if (!fullyVisible) {
                    shouldEvalFallback = true;
                    continue;
                }

                const element = entry.target as HTMLDivElement;
                const meta = nodeMetaRef.current.get(element);
                if (!meta) continue;

                const isOwnMessage = currentUserId !== null && meta.senderId === currentUserId;
                if (isOwnMessage) continue;

                if (meta.seq > highestVisibleSeqRef.current) {
                    highestVisibleSeqRef.current = meta.seq;
                    scheduleReadUpdate(meta.seq);
                }
            }

            if (shouldEvalFallback) {
                evaluateVisibleMessages();
            }
        },
        [currentUserId, evaluateVisibleMessages, scheduleReadUpdate]
    );

    useEffect(() => {
        const container = contentRef.current?.parentElement ?? contentRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(handleVisibilityEntries, {
            root: container,
            threshold: [FULL_VISIBILITY_RATIO, 1],
        });

        observerRef.current = observer;

        messageNodesRef.current.forEach((node) => {
            observer.observe(node);
        });

        return () => {
            observer.disconnect();
            observerRef.current = null;
        };
    }, [handleVisibilityEntries, chat.chatId]);

    useEffect(() => {
        const container = contentRef.current?.parentElement ?? contentRef.current;
        if (!container) return;

        let frame = 0;
        const handleScroll = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(evaluateVisibleMessages);
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        evaluateVisibleMessages();

        return () => {
            if (frame) cancelAnimationFrame(frame);
            container.removeEventListener("scroll", handleScroll);
        };
    }, [evaluateVisibleMessages, chat.chatId]);

    const handleMessageNodeChange = useCallback(
        (message: MessageResponse, node: HTMLDivElement | null) => {
            if (!Number.isFinite(message.seq)) return;
            const seq = message.seq;
            const existingNode = messageNodesRef.current.get(seq);

            if (node) {
                if (existingNode && existingNode !== node) {
                    observerRef.current?.unobserve(existingNode);
                    nodeMetaRef.current.delete(existingNode);
                }

                messageNodesRef.current.set(seq, node);
                nodeMetaRef.current.set(node, { seq, senderId: message.senderId ?? null });

                if (observerRef.current) {
                    observerRef.current.observe(node);
                }

                requestAnimationFrame(() => {
                    evaluateVisibleMessages();
                });
            } else if (existingNode) {
                observerRef.current?.unobserve(existingNode);
                nodeMetaRef.current.delete(existingNode);
                messageNodesRef.current.delete(seq);
            }
        },
        [evaluateVisibleMessages]
    );

    const handleIncomingReadState = useCallback((seq: number) => {
        setLastReadSeq((prev) => Math.max(prev, seq));
        latestSentSeqRef.current = Math.max(latestSentSeqRef.current, seq);
    }, []);

    useUserChatReadStateTopic(chat.chatId, currentUserId, handleIncomingReadState);

    useUserChatMsgTopic(chat.chatId, (msg: MessageResponse) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
        setNewMessageIds((prev) => new Set([...prev, msg.id]));

        window.setTimeout(() => {
            setNewMessageIds((prevSet) => {
                const next = new Set(prevSet);
                next.delete(msg.id);
                return next;
            });
        }, 1000);
    });

    if (isLoading) return <LoadingSkeleton />;

    if (isError) return <ErrorState onRetry={() => refetch()} />;

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
        <div ref={contentRef} className="space-y-4 p-4">
            {messages.map((message) => {
                const isOwn = message.senderId === currentUserId;
                const formattedText = linkify(message.text);
                const isRead = isOwn && message.seq <= lastReadSeq;

                return (
                    <AnimatedMessage
                        key={message.id ?? `${message.seq}-${message.senderId}`}
                        formattedText={formattedText}
                        isOwn={isOwn}
                        isRead={isRead}
                        isNew={message.id ? newMessageIds.has(message.id) : false}
                        onNodeChange={(node) => handleMessageNodeChange(message, node)}
                    />
                );
            })}
        </div>
    );
};

export default ChatContent;

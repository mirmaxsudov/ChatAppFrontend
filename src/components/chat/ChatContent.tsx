"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, AlertCircle } from "lucide-react";
import { ChatItemResponse, ChatSummary } from "@/type/chat/chat";
import { useMyMessages } from "@/hooks/useMyMessages";
import useUser from "@/store/useUser";
import { MessageItemResponse } from "@/type/chat/message";
import { useUserChatMsgTopic } from "@/hooks/ws/useUserChatMsgTopic";
import { useUserChatReadStateTopic } from "@/hooks/ws/useUserChatReadStateTopic";
import { linkify } from "@/helper/ts/Linkify";
import JustTextMessageRight from "./messages/JustTextMessageRight";
import UpdateMessageModal from "./modal/UpdateMessageModal";
import useMyModals from "@/store/useMyModals";
import JustTextMessageLeft from "./messages/JustTextMessageLeft";
import { ChatType } from "@/enums/ChatEnum";
import { readMessages } from "@/api/chat/chat.api";
import useMyChatMessages from "@/store/useMyChatMessages";
import useMyChat from "@/store/useMyChatResponse";
import useMessageUpdate from "@/hooks/ws/useMessageUpdate";

const READ_THROTTLE_MS = 300;
// We'll still use our own geometry tolerance check, so 1 here is okay.
const FULL_VISIBILITY_RATIO = 1;
const HEIGHT_TOLERANCE_PX = 2;

/** Find the nearest actual scroll container for a given element */
const getScrollContainer = (el: HTMLElement | null): HTMLElement | null => {
    let node: HTMLElement | null = el;
    while (node && node !== document.body) {
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        if (overflowY === "auto" || overflowY === "scroll") return node;
        node = node.parentElement as HTMLElement | null;
    }
    return (document.scrollingElement as HTMLElement) ?? null;
};

const isFullyVisible = (elementRect: DOMRect, containerRect: DOMRect): boolean =>
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
    chat,
    message,
    onNodeChange,
}: {
    formattedText: string;
    isOwn: boolean;
    isRead: boolean;
    isNew?: boolean;
    chat: ChatItemResponse,
    message: MessageItemResponse,
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
                <JustTextMessageRight
                    message={formattedText}
                    isRead={isRead}
                    sentAt={message.sentAt}
                    messageId={message.id}
                    edited={message.isEdited}
                    editedAt={message.editedAt}
                    chatId={chat.id} />
            ) : (
                <JustTextMessageLeft
                    isEdited={message.isEdited}
                    chat={chat}
                    message={formattedText}
                    sentAt={message.sentAt} />
            )}
        </div>
    );
};

const ChatContent = ({ chat }: { chat: ChatItemResponse }) => {
    const { updateMessageModal, updateMessageData, setUpdateMessageData, updateVal } = useMyModals();
    const { data, isLoading, isError, refetch } = useMyMessages(chat.id);
    const currentUser = useUser((state) => state.user);
    const currentUserId = currentUser?.id ?? null;

    const [newMessageIds, setNewMessageIds] = useState<Set<number>>(new Set());
    const [lastReadSeq, setLastReadSeq] = useState<number>(chat.lastReadMessageSeq ?? 0);

    const contentRef = useRef<HTMLDivElement | null>(null);

    const latestSentSeqRef = useRef<number>(chat.lastReadMessageSeq ?? 0);
    const pendingSeqRef = useRef<number | null>(null);
    const throttleRef = useRef<number | null>(null);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const messageNodesRef = useRef<Map<number, HTMLDivElement>>(new Map());
    const nodeMetaRef = useRef<Map<HTMLDivElement, { seq: number; senderId: number | null }>>(new Map());
    const highestVisibleSeqRef = useRef<number>(chat.lastReadMessageSeq ?? 0);

    const { setResponse, response, addMessage, updateMessage } = useMyChatMessages();
    const changeLastReadMessageSeq = useMyChat(state => state.changeLastReadMessageSeq);

    useMessageUpdate(chat.id, updateMessage)

    /** Reset read seqs when chat changes */
    useEffect(() => {
        const initialSeq = chat.lastReadMessageSeq ?? 0;
        setLastReadSeq(initialSeq);
        latestSentSeqRef.current = initialSeq;
        highestVisibleSeqRef.current = initialSeq;
    }, [chat.id, chat.lastReadMessageSeq]);

    /** Clear node maps when chat changes */
    useEffect(() => {
        messageNodesRef.current.forEach((node) => observerRef.current?.unobserve(node));
        messageNodesRef.current.clear();
        nodeMetaRef.current.clear();
    }, [chat.id]);

    /** Load messages -> reset "new" markers */
    useEffect(() => {
        if (!isLoading && !isError && data?.data) {
            setNewMessageIds(new Set());
            setResponse(data.data);
        }
    }, [data, isLoading, isError]);

    /** Keep latest sent seq monotonic */
    useEffect(() => {
        latestSentSeqRef.current = Math.max(latestSentSeqRef.current, lastReadSeq);
    }, [lastReadSeq]);

    /** Cleanup timers on unmount */
    useEffect(() => {
        return () => {
            if (throttleRef.current) clearTimeout(throttleRef.current);
        };
    }, []);

    /** Throttled "read" sender */
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
                    await readMessages(chat.id, toSend);
                    latestSentSeqRef.current = toSend;
                } catch (error) {
                    console.error("Failed to update read messages", error);
                }
            }, READ_THROTTLE_MS);
        },
        [chat.id, chat.type]
    );

    /** Geometry fallback sweep — checks all nodes for full visibility */
    const evaluateVisibleMessages = useCallback(() => {
        const container = getScrollContainer(contentRef.current);
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        let maxSeq = highestVisibleSeqRef.current;

        messageNodesRef.current.forEach((node, seq) => {
            const meta = nodeMetaRef.current.get(node);
            if (!meta) return;
            if (currentUserId !== null && meta.senderId === currentUserId) return;

            const rect = node.getBoundingClientRect();
            if (!isFullyVisible(rect, containerRect)) return;

            if (seq > maxSeq) maxSeq = seq;
        });

        if (maxSeq > highestVisibleSeqRef.current) {
            highestVisibleSeqRef.current = maxSeq;
            scheduleReadUpdate(maxSeq);
        }
    }, [currentUserId, scheduleReadUpdate]);

    /** IO callback — prefers IO, falls back to geometry when near-full */
    const handleVisibilityEntries = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            let fallbackNeeded = false;

            for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                const fullyVisible =
                    entry.intersectionRatio >= FULL_VISIBILITY_RATIO ||
                    entry.intersectionRect.height >= entry.boundingClientRect.height - HEIGHT_TOLERANCE_PX;

                if (!fullyVisible) {
                    fallbackNeeded = true;
                    continue;
                }

                const element = entry.target as HTMLDivElement;
                const meta = nodeMetaRef.current.get(element);
                if (!meta) continue;

                const isOwn = currentUserId !== null && meta.senderId === currentUserId;
                if (isOwn) continue;

                if (meta.seq > highestVisibleSeqRef.current) {
                    highestVisibleSeqRef.current = meta.seq;
                    scheduleReadUpdate(meta.seq);
                }
            }

            if (fallbackNeeded) evaluateVisibleMessages();
        },
        [currentUserId, evaluateVisibleMessages, scheduleReadUpdate]
    );

    /** Create observer with the real root — re-create on chat change and message count change */
    useEffect(() => {
        const container = getScrollContainer(contentRef.current);
        if (!container) return;

        const observer = new IntersectionObserver(handleVisibilityEntries, {
            root: container,
            // tiny negative bottom margin to avoid 1px rounding blocking "full"
            rootMargin: `0px 0px ${-HEIGHT_TOLERANCE_PX}px 0px`,
            threshold: [0, 1],
        });

        observerRef.current = observer;

        // (Re)observe everything we have already tracked
        messageNodesRef.current.forEach((node) => observer.observe(node));

        return () => {
            observer.disconnect();
            observerRef.current = null;
        };
    }, [handleVisibilityEntries, chat.id, data?.data.items?.length]);

    /** Scroll listener using the real container */
    useEffect(() => {
        const container = getScrollContainer(contentRef.current);
        if (!container) return;

        let frame = 0;
        const onScroll = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(evaluateVisibleMessages);
        };

        container.addEventListener("scroll", onScroll, { passive: true });
        evaluateVisibleMessages();

        return () => {
            if (frame) cancelAnimationFrame(frame);
            container.removeEventListener("scroll", onScroll);
        };
    }, [evaluateVisibleMessages, chat.id]);

    /** Track read-state sent from server (e.g., other client or confirmation) */
    const handleIncomingReadState = useCallback((seq: number) => {
        changeLastReadMessageSeq(seq, chat.id)
        setLastReadSeq((prev) => Math.max(prev, seq));
        latestSentSeqRef.current = Math.max(latestSentSeqRef.current, seq);
    }, []);

    useUserChatReadStateTopic(chat.id, currentUserId, handleIncomingReadState);

    /** Track new incoming messages (websocket) */
    useUserChatMsgTopic(chat.id, (msg: MessageItemResponse) => {
        setNewMessageIds((prev) => new Set(prev).add(msg.id));
        addMessage(msg);

        window.setTimeout(() => {
            setNewMessageIds((prev) => {
                const next = new Set(prev);
                next.delete(msg.id);
                return next;
            });
        }, 1000);
    });

    /** Node mount/unmount => (re)observe + sweep */
    const handleMessageNodeChange = useCallback(
        (message: MessageItemResponse, node: HTMLDivElement | null) => {
            if (!Number.isFinite(message.seq)) return;
            const seq = message.seq;
            const prevNode = messageNodesRef.current.get(seq);

            if (node) {
                if (prevNode && prevNode !== node) {
                    observerRef.current?.unobserve(prevNode);
                    nodeMetaRef.current.delete(prevNode);
                }

                messageNodesRef.current.set(seq, node);
                nodeMetaRef.current.set(node, { seq, senderId: message.owner.userId ?? null });

                if (observerRef.current) observerRef.current.observe(node);

                requestAnimationFrame(evaluateVisibleMessages);
            } else if (prevNode) {
                observerRef.current?.unobserve(prevNode);
                nodeMetaRef.current.delete(prevNode);
                messageNodesRef.current.delete(seq);
            }
        },
        [evaluateVisibleMessages]
    );

    if (isLoading) return <LoadingSkeleton />;

    if (isError) return <ErrorState onRetry={() => refetch()} />;

    if (!response?.items || response?.items?.length === 0) {
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
            {response.items?.map((message) => {
                const isOwn = message.owner.userId === currentUserId;
                const formattedText = linkify(message.message);
                const isRead = isOwn && message.seq <= lastReadSeq;

                return (
                    <AnimatedMessage
                        chat={chat}
                        message={message}
                        key={message.id ?? `${message.seq}-${message.owner.userId}`}
                        formattedText={formattedText}
                        isOwn={isOwn}
                        isRead={isRead}
                        isNew={message.id ? newMessageIds.has(message.id) : false}
                        onNodeChange={(node) => handleMessageNodeChange(message, node)}
                    />
                );
            })}
            <UpdateMessageModal
                open={updateMessageModal}
                setOpen={(val: boolean) => updateVal("updateMessageModal", val)}
                chatId={updateMessageData?.chatId ?? chat.id}
                messageId={updateMessageData?.messageId ?? undefined}
                text={updateMessageData?.text ?? ""}
                onUpdated={(newText) => {
                    if (updateMessageData?.messageId) {
                        useMyChatMessages.getState().updateMessage({ messageId: updateMessageData.messageId, text: newText });
                    }
                    setUpdateMessageData(null);
                }}
            />
        </div>
    );
};

export default ChatContent;
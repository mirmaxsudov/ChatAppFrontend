import { ChatType } from "@/enums/ChatEnum";
import { AttachmentResponse } from "../attachment/attachment";

export type ChatSummary = {
    chatId: number;
    ownerId: number;
    type: ChatType;
    currentUserId: number;
    secondUserId: number | null;
    lastMessageId: number;
    lastReadMessageSeq: number;
    chatTitle: string;
};


export type MyChatResponse = {
    chats: ChatResponse;
}

export type ChatResponse = {
    totalCount: number;
    items: ChatItemResponse[];
    pinnedChatsResponse: PinnedChatsResponse;
}

export interface ChatItemResponse {
    id: number;
    secondUserId: number;
    ownerId: number;
    profileImage: AttachmentResponse;
    isOnline: boolean;
    countOfOnline: boolean;
    membersCount: number;
    isTyping: boolean;
    title: string;
    type: ChatType;
    lastReadMessageSeq: number;
    lastMessage: ChatItemMessagePreview;
    unreadMessageCount: number;
    isMute: boolean;
}

export interface PinnedChatsResponse {
    totalCount: number;
    availablePinnedChats: number;
    pinnedChats: PinnedChatItemResponse[];
}

export interface PinnedChatItemResponse extends ChatItemResponse {
    priority: number;
}

export type ChatItemMessagePreview = {
    messageId: number;
    title: string;
    sendAt: Date;
    isRead: boolean;
    isMine: boolean;
}
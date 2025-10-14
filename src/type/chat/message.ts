import { LinkPreviewEnum, MessageTypeEnum } from "@/enums/ChatEnum"
import { AttachmentResponse } from "../attachment/attachment";
import { MessageAttachment } from "../attachment/messageAttachment";

export type MessageResponse = {
    items: MessageItemResponse[];
    chatId: number;
}

export type MessageItemResponse = {
    id: number;
    message: string;
    attachments: MessageAttachment[];
    files: AttachmentResponse[];
    sentAt: Date;
    seq: number;
    replyMessage: ReplyMessagePreview;
    owner: MessageOwnerPreview;
    linkPreview: LinkPreviewResponse;
}

export type ReplyMessagePreview = {
    replyMessageId: number;
    attachment: MessageAttachment;
    title: string;
}

export type MessageOwnerPreview = {
    userId: number;
    profileImage: MessageAttachment;
}

export type LinkPreviewResponse = {
    id: number;
    url: string;
    title: string;
    description: string;
    imageUrl: string;
    siteName: string;
    faviconUrl: string;
    contentType: string;
    status: LinkPreviewEnum;
}
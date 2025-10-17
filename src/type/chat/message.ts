import { LinkPreviewEnum, MessageTypeEnum } from "@/enums/ChatEnum"
import { MessageAttachmentResponse } from "../attachment/messageAttachment";
import { AttachmentResponse } from "../attachment/attachment";

export type MessageResponse = {
    items: MessageItemResponse[];
    chatId: number;
}

export type MessageItemResponse = {
    id: number;
    message: string;
    attachments: MessageAttachmentResponse[];
    files: MessageAttachmentResponse[];
    sentAt: Date;
    seq: number;
    editedAt: Date;
    isEdited: boolean;
    type: MessageTypeEnum;
    replyMessage: ReplyMessagePreview;
    owner: MessageOwnerPreview;
    linkPreview: LinkPreviewResponse;
}

export type ReplyMessagePreview = {
    replyMessageId: number;
    attachment: AttachmentResponse;
    title: string;
}

export type MessageOwnerPreview = {
    userId: number;
    profileImage: AttachmentResponse;
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
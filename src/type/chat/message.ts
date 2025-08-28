import { MessageTypeEnum } from "@/enums/ChatEnum"

export type MessageResponse = {
    id: number,
    seq: number,
    senderId: number,
    type: MessageTypeEnum,
    text: string,
    replyToId: number,
    forwardedFromChatId: number,
    forwardedFromSeq: number,
    editedAt: Date,
}
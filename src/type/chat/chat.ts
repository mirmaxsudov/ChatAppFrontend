import { ChatType } from "@/enums/ChatEnum";

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

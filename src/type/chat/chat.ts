import { ChatType } from "@/enums/ChatEnum";

export type ChatSummary = {
    chatId: number;
    ownerId: number;
    type: ChatType;
    secondUserId: number | null;
    lastMessageId: number;
    chatTitle: string;
};
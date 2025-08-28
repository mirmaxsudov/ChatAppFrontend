export type ChatSummary = {
    chatId: number;
    ownerId: number;
    secondUserId: number | null;
    lastMessageId: number | null;
    chatTitle: string;
};
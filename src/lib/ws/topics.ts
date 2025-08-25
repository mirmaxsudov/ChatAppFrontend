export const topics = {
    userChat: (userId: number) => `/topic/user/chats/${userId}`
};

export const app = {
    sendChat: (chatId: string | number) => `/app/chat/${chatId}`,
    readChat: (chatId: string | number) => `/app/read/${chatId}`,
    typing: (chatId: string | number) => `/app/typing/${chatId}`,
};

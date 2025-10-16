export const topics = {
    userChat: (userId: number) => `/topic/user/chats/${userId}`
};

export const app = {
    sendChat: (chatId: string | number) => `/app/chat/${chatId}`,
    readChat: (chatId: string | number) => `/app/read/${chatId}`,
    typingStatus: (isTyping: boolean) => `/app/chat/typing-status/${isTyping}`,
    onlineStatus: (userId: number) => `/app/chat/i-am-online/${userId}`
};

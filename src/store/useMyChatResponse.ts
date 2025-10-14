import { ChatItemMessagePreview, MyChatResponse } from "@/type/chat/chat"
import { create } from "zustand";

type MyChatResponseType = {
    response: MyChatResponse | null;
    isLoading: boolean;
    isError: boolean;
    setResponse: (response: MyChatResponse) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (isError: boolean) => void;
    changeLastMessagePreview: (prev: ChatItemMessagePreview, chatId: number) => void;
    changeLastReadMessageSeq: (lastReadMessageSeq: number, chatId: number) => void;
    clearChat: () => void;
}

const useMyChat = create<MyChatResponseType>((set, get) => {
    return {
        response: null,
        isLoading: false,
        isError: false,
        setResponse: (response) => {
            set({ response: { ...response } })
        },
        clearChat: () => {
            set({ response: null })
        },
        setLoading: (isLoading: boolean) => {
            set({ isLoading });
        },
        changeLastMessagePreview: (payload, chatId) => {
            set((state) => {
                const resp = state.response;
                if (!resp?.chats?.items) return state;

                const items = resp.chats.items.map((chat) =>
                    chat.id === chatId
                        ? {
                            ...chat,
                            lastMessage: { ...chat.lastMessage, ...payload },
                        }
                        : chat
                );

                return {
                    response: {
                        ...resp,
                        chats: { ...resp.chats, items },
                    },
                };
            })
        },
        changeLastReadMessageSeq: (lastReadMessageSeq: number, chatId: number) => {
            set((state) => {
                const { response } = state;

                if (!response?.chats?.items) {
                    return state;
                }

                const items = response.chats.items.map(chat => {
                    // Check for the chat with the matching ID
                    if (chat.id === chatId) {
                        // Return a new object with the updated lastReadMessageSeq
                        return {
                            ...chat,
                            lastReadMessageSeq,
                        };
                    }
                    // Return the original chat object for all other chats
                    return chat;
                });

                console.log(items, chatId);
                

                return {
                    response: {
                        ...response,
                        chats: {
                            items, // Only provide the updated items array
                        },
                    },
                };
            });
        },
        setError: (isError: boolean) => {
            set({ isError });
        }
    }
})

export default useMyChat;
import { ChatMessageUpdateType } from "@/type/chat/chat";
import { MessageItemResponse, MessageResponse } from "@/type/chat/message"
import { create } from "zustand";

type MyChatMessaagesType = {
    response: MessageResponse;
    isLoading: boolean;
    isError: boolean;
    setResponse: (response: MessageResponse) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (isError: boolean) => void;
    clearMessages: () => void;
    addMessage: (message: MessageItemResponse) => void;
    updateMessage: (payload: ChatMessageUpdateType) => void;
};

const useMyChatMessages = create<MyChatMessaagesType>((set, get) => {
    return {
        response: null,
        isLoading: false,
        isError: false,
        setResponse: response => {
            set({ response: { ...response } });
        },
        clearMessages: () => {
            set({ response: undefined })
        },
        setLoading: (isLoading: boolean) => {
            set({ isLoading });
        },
        setError: (isError: boolean) => {
            set({ isError });
        },
        addMessage: (message: MessageItemResponse) => {
            const res = get().response;
            set({ response: { ...res, items: [...res.items, message] } })
        },
        updateMessage: (payload: ChatMessageUpdateType) => {
            const response = get().response;
            if (!payload)
                return response;

            const messages = response.items.map(m => {
                if (m.id === payload.messageId) {
                    return { ...m, message: payload.text }
                } else {
                    return m;
                }
            });

            set({
                response: {
                    ...response, items: [...messages]
                }
            });
        }
    }
})

export default useMyChatMessages;
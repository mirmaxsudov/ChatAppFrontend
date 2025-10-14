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
        }
    }
})

export default useMyChatMessages;
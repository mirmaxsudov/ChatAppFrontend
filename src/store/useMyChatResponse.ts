import { MyChatResponse } from "@/type/chat/chat"
import { create } from "zustand";

type MyChatResponseType = {
    response: MyChatResponse | null;
    isLoading: boolean;
    isError: boolean;
    setResponse: (response: MyChatResponse) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (isError: boolean) => void;
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
        setError: (isError: boolean) => {
            set({ isError });
        }
    }
})

export default useMyChat;
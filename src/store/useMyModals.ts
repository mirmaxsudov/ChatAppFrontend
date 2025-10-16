import { create } from "zustand";

type MyModalsType = {
    newMessageModal: boolean,
    profileModal: boolean,
    newChannelModal: boolean,
    updateMessageModal: boolean,
    updateMessageData: { chatId: number, messageId: number, text?: string } | null,
    setUpdateMessageData: (data: { chatId: number, messageId: number, text: string } | null) => void,
    updateVal: (fieldName: keyof Omit<MyModalsType, "updateVal">, val: boolean) => void
};


const useMyModals = create<MyModalsType>((set, get) => {
    return {
        newMessageModal: false,
        profileModal: false,
        newChannelModal: false,
        updateMessageModal: false,
        updateMessageData: null,
        setUpdateMessageData: (data) => set({ updateMessageData: data }),
        updateVal: (fieldName: string, val: boolean) => {
            set(() => ({ [fieldName]: val }));
        }
    }
});

export default useMyModals;
import { create } from "zustand";

type MyModalsType = {
    newMessageModal: boolean,
    profileModal: boolean,
    newChannelModal: boolean,
    updateMessageModal: boolean,
    updateVal: (fieldName: keyof Omit<MyModalsType, "updateVal">, val: boolean) => void
};


const useMyModals = create<MyModalsType>((set, get) => {
    return {
        newMessageModal: false,
        profileModal: false,
        newChannelModal: false,
        updateMessageModal: false,
        updateVal: (fieldName: string, val: boolean) => {
            set(() => ({ [fieldName]: val }));
        }
    }
});

export default useMyModals;
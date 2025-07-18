// hooks/useMyNotice.ts
import {toast} from "sonner";
import NoticeEnum from "@/enums/NoticeEnum";

type ToastRef = {
    id?: string | number;
};

const useMyNotice = () => {
    const showMessage = (
        message: string,
        type: NoticeEnum = NoticeEnum.ERROR,
        duration?: number,
        toastRef?: ToastRef
    ) => {
        const toastOptions = {
            duration: duration || 3000,
        };

        switch (type) {
            case NoticeEnum.INFO:
                toastRef
                    ? (toastRef.id = toast(message, {...toastOptions, description: "Info", id: toastRef.id}))
                    : toast(message, {...toastOptions, description: "Info"});
                break;
            case NoticeEnum.SUCCESS:
                toastRef
                    ? toast.success(message, {...toastOptions, id: toastRef.id})
                    : toast.success(message, toastOptions);
                break;
            case NoticeEnum.ERROR:
                toastRef
                    ? toast.error(message, {...toastOptions, id: toastRef.id})
                    : toast.error(message, toastOptions);
                break;
            case NoticeEnum.WARNING:
                toastRef
                    ? toast.warning(message, {...toastOptions, id: toastRef.id})
                    : toast.warning(message, toastOptions);
                break;
            case NoticeEnum.LOADING:
                toastRef
                    ? (toastRef.id = toast.loading(message, {duration: duration || 9999, id: toastRef.id}))
                    : toast.loading(message, {duration: duration || 9999});
                break;
            default:
                toast.error(message);
        }
    };

    const dismiss = (toastRef?: ToastRef) => {
        if (toastRef?.id) toast.dismiss(toastRef.id);
    };

    return {showMessage, dismiss};
};

export default useMyNotice;
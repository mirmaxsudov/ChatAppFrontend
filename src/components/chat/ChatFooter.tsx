"use client"

import { useEffect, useRef, useState } from "react";
import StickerPicker from "./StickerPicker";
import ChatStickerDropdown from "./ChatStickerDropdown";
import UploadDropdown from "./UploadDropdown";
import { X } from "lucide-react";
import { ChatSummary } from "@/type/chat/chat";
import { sendMessage } from "@/api/chat/chat.api";
import useMyNotice from "@/hooks/useMyNotice";
import NoticeEnum from "@/enums/NoticeEnum";

interface UploadedItem {
    file: File;
    url: string;
    type: "image" | "file";
}

const ChatFooter = ({ chat }: { chat: ChatSummary }) => {
    const [sticker, setSticker] = useState<string | undefined>();
    const [text, setText] = useState<string>("");
    const [uploads, setUploads] = useState<UploadedItem[]>([]);
    const [isSending, setIsSending] = useState<boolean>(false);
    const { showMessage, dismiss } = useMyNotice();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (sticker) {
            setText(text + sticker);
            setSticker(undefined);
        }
    }, [sticker]);

    const handleFilesSelected = (files: File[], type: "image" | "file") => {
        const newUploads = files.map(file => ({
            file,
            url: type === "image" ? URL.createObjectURL(file) : "",
            type
        }));
        setUploads(prev => [...prev, ...newUploads]);
    };

    const handleRemoveUpload = (idx: number) => {
        setUploads(prev => {
            const toRevoke = prev[idx];
            if (toRevoke.type === "image" && toRevoke.url) URL.revokeObjectURL(toRevoke.url);
            return prev.filter((_, i) => i !== idx);
        });
    };

    const handleSendMessage = async () => {
        if (!text.trim() && uploads.length === 0) {
            showMessage("Please enter a message or attach a file", NoticeEnum.WARNING);
            return;
        }

        if (isSending) return;

        setIsSending(true);
        const toastRef = { id: undefined };
        let messageSent = false;

        try {
            showMessage("Sending message...", NoticeEnum.LOADING, undefined, toastRef);

            const response = await sendMessage(chat.chatId, text.trim());

            if (response.success) {
                dismiss(toastRef);
                showMessage("Message sent successfully!", NoticeEnum.SUCCESS);
                setText("");
                setUploads([]);
                messageSent = true;
            } else {
                dismiss(toastRef);
                showMessage(response.message || "Failed to send message", NoticeEnum.ERROR);
            }
        } catch (error) {
            dismiss(toastRef);
            console.error("Error sending message:", error);
            showMessage("Failed to send message. Please try again.", NoticeEnum.ERROR);
        } finally {
            setIsSending(false);
            if (messageSent) {
                setTimeout(() => inputRef.current?.focus(), 0);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <hr />
            {uploads.length > 0 && (
                <div className="flex gap-2 mb-2 flex-wrap items-center">
                    {uploads.map((item, idx) => (
                        <div key={idx} className="relative group">
                            {item.type === "image" ? (
                                <img
                                    src={item.url}
                                    alt={item.file.name}
                                    className="w-16 h-16 object-cover rounded-lg border border-muted"
                                />
                            ) : (
                                <div
                                    className="w-16 h-16 flex flex-col items-center justify-center bg-muted rounded-lg border border-muted text-xs p-1">
                                    <span className="truncate w-full">{item.file.name}</span>
                                    <span
                                        className="text-[10px] text-muted-foreground">{(item.file.size / 1024).toFixed(1)} KB</span>
                                </div>
                            )}
                            <button
                                className="absolute -top-2 -right-2 bg-background border border-muted rounded-full p-0.5 opacity-80 hover:opacity-100"
                                onClick={() => handleRemoveUpload(idx)}
                                type="button"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div
                className="w-full p-[8px] dark:bg-[#23262F] gap-[20px] z-10 py-[10px] flex justify-between items-center px-[20px]">
                <UploadDropdown onFilesSelected={handleFilesSelected}>
                    <div className="size-[30px] upload-btn cursor-pointer flex items-center justify-center">
                        <svg width="30" height="30" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.3332 7.33332L12.6666 7.33332L12.6666 12.6666L7.33324 12.6666L7.33324 15.3333L12.6666 15.3333L12.6666 20.6667L15.3332 20.6667L15.3332 15.3333L20.6666 15.3333L20.6666 12.6666L15.3332 12.6666L15.3332 7.33332ZM13.9999 0.666648C6.63991 0.666648 0.666576 6.63998 0.666577 14C0.666576 21.36 6.63991 27.3333 13.9999 27.3333C21.3599 27.3333 27.3332 21.36 27.3332 14C27.3332 6.63998 21.3599 0.666648 13.9999 0.666648ZM13.9999 24.6667C8.11991 24.6666 3.33324 19.88 3.33325 14C3.33324 8.11998 8.11991 3.33332 13.9999 3.33332C19.8799 3.33332 24.6666 8.11998 24.6666 14C24.6666 19.88 19.8799 24.6666 13.9999 24.6667Z"
                                fill="#747881" />
                        </svg>
                    </div>
                </UploadDropdown>
                <div
                    className="border-[#747881] border-[1px] rounded-full px-[16px] py-[10px] w-full flex items-center">
                    <input
                        ref={inputRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isSending}
                        className="w-full outline-0 bg-transparent"
                        type="text"
                        placeholder={isSending ? "Sending..." : "Type your message"}
                    />
                    <ChatStickerDropdown setSticker={setSticker} />
                </div>
                <button
                    onClick={handleSendMessage}
                    disabled={isSending || (!text.trim() && uploads.length === 0)}
                    className={`size-[40px] transition-all duration-300 flex items-center justify-center ${isSending || (!text.trim() && uploads.length === 0)
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:opacity-60 cursor-pointer'
                        }`}
                >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="#B4B7BB" />
                        <path d="M12.0095 30L32 20L12.0095 10L12 17.7778L26.2857 20L12 22.2222L12.0095 30Z"
                            fill="white" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default ChatFooter;



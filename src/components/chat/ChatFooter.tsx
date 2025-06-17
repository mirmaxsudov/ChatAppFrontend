"use client"

import { useEffect, useState } from "react";
import StickerPicker from "./StickerPicker";
import ChatStickerDropdown from "./ChatStickerDropdown";

const ChatFooter = () => {
    const [sticker, setSticker] = useState();
    const [text, setText] = useState<string>("")

    useEffect(() => {
        if (sticker) {
            setText(text + sticker);
            setSticker(undefined);
        }
    }, [sticker]);

    return (
        <>
            <hr />
            <div className="w-full p-[8px] dark:bg-[#23262F] gap-[20px] z-10 py-[10px] flex justify-between items-center px-[20px]">
                <div className="size-[30px]">
                    <svg width="30" height="30" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.3332 7.33332L12.6666 7.33332L12.6666 12.6666L7.33324 12.6666L7.33324 15.3333L12.6666 15.3333L12.6666 20.6667L15.3332 20.6667L15.3332 15.3333L20.6666 15.3333L20.6666 12.6666L15.3332 12.6666L15.3332 7.33332ZM13.9999 0.666648C6.63991 0.666648 0.666576 6.63998 0.666577 14C0.666576 21.36 6.63991 27.3333 13.9999 27.3333C21.3599 27.3333 27.3332 21.36 27.3332 14C27.3332 6.63998 21.3599 0.666648 13.9999 0.666648ZM13.9999 24.6667C8.11991 24.6666 3.33324 19.88 3.33325 14C3.33324 8.11998 8.11991 3.33332 13.9999 3.33332C19.8799 3.33332 24.6666 8.11998 24.6666 14C24.6666 19.88 19.8799 24.6666 13.9999 24.6667Z" fill="#747881" />
                    </svg>
                </div>
                <div className="border-[#747881] border-[1px] rounded-full px-[16px] py-[10px] w-full flex items-center">
                    <input value={text} onChange={(e) => setText(e.target.value)} className="w-full outline-0" type="text" placeholder="Type your message" />
                    <ChatStickerDropdown setSticker={setSticker} />
                </div>
                <div className="size-[40px] hover:opacity-60 transition-all duration-300 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="#B4B7BB" />
                        <path d="M12.0095 30L32 20L12.0095 10L12 17.7778L26.2857 20L12 22.2222L12.0095 30Z" fill="white" />
                    </svg>
                </div>
            </div>
        </>
    );
}

export default ChatFooter;
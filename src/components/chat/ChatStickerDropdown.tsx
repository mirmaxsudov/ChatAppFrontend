"use client"

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import StickerPicker from "./StickerPicker";

const ChatStickerDropdown = ({ setSticker }) => {
    const [open, setOpen] = useState(false);

    return <>
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>
                <svg className="hover:opacity-60 transition-all duration-300" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9867 0.666687C6.62669 0.666687 0.666687 6.64002 0.666687 14C0.666687 21.36 6.62669 27.3334 13.9867 27.3334C21.36 27.3334 27.3334 21.36 27.3334 14C27.3334 6.64002 21.36 0.666687 13.9867 0.666687ZM14 24.6667C8.10669 24.6667 3.33335 19.8934 3.33335 14C3.33335 8.10669 8.10669 3.33335 14 3.33335C19.8934 3.33335 24.6667 8.10669 24.6667 14C24.6667 19.8934 19.8934 24.6667 14 24.6667ZM18.6667 12.6667C19.7734 12.6667 20.6667 11.7734 20.6667 10.6667C20.6667 9.56002 19.7734 8.66669 18.6667 8.66669C17.56 8.66669 16.6667 9.56002 16.6667 10.6667C16.6667 11.7734 17.56 12.6667 18.6667 12.6667ZM9.33335 12.6667C10.44 12.6667 11.3334 11.7734 11.3334 10.6667C11.3334 9.56002 10.44 8.66669 9.33335 8.66669C8.22669 8.66669 7.33335 9.56002 7.33335 10.6667C7.33335 11.7734 8.22669 12.6667 9.33335 12.6667ZM14 21.3334C17.1067 21.3334 19.7467 19.3867 20.8134 16.6667H7.18669C8.25335 19.3867 10.8934 21.3334 14 21.3334Z" fill="#747881" />
                </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-transparent border-0" onInteractOutside={(e) => {
                const target = e.target as HTMLElement;
                if (!target.closest('.sticker-picker'))
                    setOpen(false);
            }}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <StickerPicker onSelect={setSticker} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}

export default ChatStickerDropdown;
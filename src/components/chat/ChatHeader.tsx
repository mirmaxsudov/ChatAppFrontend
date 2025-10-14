import { CircleArrowLeft, EllipsisVertical, PenOff, Trash, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChatItemResponse, ChatSummary } from "@/type/chat/chat";

import SavedMessageImage from "../../../public/images/savedMessage.png";
import { ChatType } from "@/enums/ChatEnum";
import Image from "next/image";
import { useTypingStatus } from "@/hooks/ws/useTypingStatus";
import { useState } from "react";
import clsx from "clsx";
import useUser from "@/store/useUser";

const ChatHeader = ({
    chat
}: {
    chat: ChatItemResponse
}) => {
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const user = useUser(state => state.user);

    useTypingStatus(chat.id, user?.id!, (isTyping) => {
        setIsTyping(isTyping);
    });

    return (
        <>
            <div className={`sticky top-0 left-0 w-full dark:bg-[#23262F] z-10 py-[10px] px-[8px] flex justify-between items-center`}>
                <div className="flex items-center gap-[18px]">
                    <div className="size-[40px]">
                        <Image className="size-full rounded-full" width={40} height={40} src={chat.type === ChatType.SAVED ? SavedMessageImage.src : ""} alt="something" />
                    </div>
                    <div className="flex flex-col">
                        <h1>
                            {chat.title}
                        </h1>
                        {chat.type === ChatType.DM ? <p className={clsx("text-sm ", isTyping ? "text-[#1468fa]" : "text-[#747881]")}>
                            {isTyping ? "Typing..." : "Online for 10 mins"}
                        </p> : ""}
                    </div>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical width={"18px"} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <User /> Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CircleArrowLeft /> Leave
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <PenOff /> Read all
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500 hover:text-red-500">
                                <Trash className="text-red-500" /> <p className="text-red-500 dark:text-red-500">Delete</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <hr />
        </>
    );
};

export default ChatHeader;
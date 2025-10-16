import { CircleArrowLeft, EllipsisVertical, PenOff, Trash, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChatItemResponse, ChatSummary } from "@/type/chat/chat";

import SavedMessageImage from "../../../public/images/savedMessage.png";
import { ChatType } from "@/enums/ChatEnum";
import Image from "next/image";
import clsx from "clsx";
import RandomProfile from "@/helper/tsx/RandomProfile";

const ChatHeader = ({
    chat
}: {
    chat: ChatItemResponse
}) => {
    return (
        <>
            <div className={`sticky top-0 left-0 w-full dark:bg-[#23262F] z-10 py-[10px] px-[8px] flex justify-between items-center`}>
                <div className="flex items-center gap-[18px]">
                    <div className="size-[40px]">
                        {chat.type === ChatType.SAVED ?
                            <Image src={SavedMessageImage} alt="Saved Message Image" /> :
                            <RandomProfile title={chat.title.toUpperCase() || ""} bgColor={chat.bgColor} textColor={chat.textColor} />
                        }                    </div>
                    <div className="flex flex-col">
                        <h1>
                            {chat.title}
                        </h1>
                        {chat.type === ChatType.DM ? <p className={clsx("text-sm ", chat.isTyping || chat.isOnline ? "text-[#1468fa]" : "text-[#747881]")}>
                            {chat.isTyping ? "Typing..." : (
                                chat.isOnline ? "Online" : "Last Seen Recently"
                            )}
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
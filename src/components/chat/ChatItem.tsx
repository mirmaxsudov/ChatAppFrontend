import { ChatSummary } from "@/type/chat/chat";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ChatItem = ({ chat }: { chat: ChatSummary }) => {
    return <>
        <div className="flex justify-between items-end p-[11px] transition-all duration-300 hover:bg-[#DBDDE1] dark:hover:bg-[#272A30]">
            <div className="flex gap-[10px]">
                <div className="size-[50px]">
                    <Avatar>
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarFallback>
                            {chat.secondUserId}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <h5 className="text-[16px]">{chat.chatTitle}</h5>
                    <p className="text-sm dark:text-[#747881]">{chat.lastMessageId}</p>
                </div>
            </div>
            <div>
                9:43 AM
            </div>
        </div>
    </>
}

export default ChatItem;
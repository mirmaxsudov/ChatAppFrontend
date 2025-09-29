import { ChatSummary } from "@/type/chat/chat";
import SavedMessageImage from "../../../public/images/savedMessage.png";
import { ChatType } from "@/enums/ChatEnum";
import Image from "next/image";
import { useMyMessage } from "@/hooks/useMyMessages";

const ChatItem = ({ chat }: { chat: ChatSummary }) => {
    // lastMessageId could be -1 which means no message.
    const { data, isLoading, isSuccess } = useMyMessage(chat.lastMessageId);

    return <>
        <div className="flex justify-between items-end p-[11px] transition-all duration-300 hover:bg-[#DBDDE1] dark:hover:bg-[#272A30]">
            <div className="flex gap-[10px]">
                <div className="size-[50px]">
                    <Image src={chat.type === ChatType.SAVED ? SavedMessageImage : ""} alt="Saved Message Image" />
                </div>
                <div>
                    <h5 className="text-[16px]">{chat.chatTitle}</h5>
                    {
                        isLoading && <div key={chat.chatId} className="h-4 rounded-md animate-pulse bg-muted/60" />
                    }
                    {isSuccess && data &&
                        <p className="text-sm dark:text-[#747881] line-clamp-1">
                            {data.text.substring(0, 20) + (data.text.length > 20 ? "..." : "")}
                        </p>
                    }
                    {
                        chat.lastMessageId === -1 && <p className="text-sm dark:text-[#747881]">
                            No messages yet
                        </p>
                    }
                </div>
            </div>
            <div>
                9:43 AM
            </div>
        </div>
    </>
}

export default ChatItem;
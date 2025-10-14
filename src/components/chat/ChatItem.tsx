import { ChatItemResponse, ChatSummary } from "@/type/chat/chat";
import SavedMessageImage from "../../../public/images/savedMessage.png";
import { ChatType } from "@/enums/ChatEnum";
import Image from "next/image";
import { useMyMessage } from "@/hooks/useMyMessages";
import { toFormattedDate } from "@/helper/ts/dateFormater";

const ChatItem = ({ chat }: { chat: ChatItemResponse }) => {
    const { lastMessage } = chat;

    return <>
        <div className="flex justify-between items-end p-[11px] transition-all duration-300 hover:bg-[#DBDDE1] dark:hover:bg-[#272A30]">
            <div className="flex gap-[10px]">
                <div className="size-[50px]">
                    <Image src={chat.type === ChatType.SAVED ? SavedMessageImage : ""} alt="Saved Message Image" />
                </div>
                <div>
                    <h5 className="text-[16px]">{chat.title}</h5>
                    {lastMessage && <p className="text-sm dark:text-[#747881] line-clamp-1">
                        {lastMessage.title.substring(0, 20) + (lastMessage.title.length > 20 ? "..." : "")}
                    </p>}
                    {
                        !lastMessage && <p className="text-sm dark:text-[#747881]">
                            No messages yet
                        </p>
                    }
                </div>
            </div>
            <div>
                {lastMessage ? <p>
                    {toFormattedDate(lastMessage.sendAt)}
                </p> : ""}
            </div>
        </div>
    </>
}

export default ChatItem;
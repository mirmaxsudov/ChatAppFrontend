import { ChatItemResponse, ChatSummary } from "@/type/chat/chat";
import SavedMessageImage from "../../../public/images/savedMessage.png";
import { ChatType } from "@/enums/ChatEnum";
import Image from "next/image";
import { useMyMessage } from "@/hooks/useMyMessages";
import { toFormattedDate } from "@/helper/ts/dateFormater";
import { useMyChatsLastMessage } from "@/hooks/ws/useChatsLastMessage";
import useUser from "@/store/useUser";
import useMyChat from "@/store/useMyChatResponse";
import RandomProfile from "@/helper/tsx/RandomProfile";

const ChatItem = ({ chat }: { chat: ChatItemResponse }) => {
    console.log(chat);

    const { lastMessage, id } = chat;
    const user = useUser(s => s.user);
    const changeLastMessagePreview = useMyChat(state => state.changeLastMessagePreview);

    useMyChatsLastMessage(id, user?.id!, (payload) => {
        changeLastMessagePreview(payload, id);
    });

    return <>
        <div className="flex justify-between items-end p-[11px] transition-all duration-300 hover:bg-[#DBDDE1] dark:hover:bg-[#272A30]">
            <div className="flex gap-[10px]">
                <div className="size-[50px] flex justify-center items-center">
                    {chat.type === ChatType.SAVED ?
                        <Image src={SavedMessageImage} alt="Saved Message Image" /> :
                        <RandomProfile title={chat.title.toUpperCase() || ""} bgColor={chat.bgColor} textColor={chat.textColor} />
                    }
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
                {lastMessage && <p>
                    {toFormattedDate(lastMessage.sendAt)}
                </p>}
            </div>
        </div>
    </>
}

export default ChatItem;
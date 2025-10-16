import { ChatItemResponse } from "@/type/chat/chat";
import SavedMessageImage from "../../../public/images/savedMessage.png";
import { ChatType } from "@/enums/ChatEnum";
import Image from "next/image";
import { toFormattedDate } from "@/helper/ts/dateFormater";
import { useMyChatsLastMessage } from "@/hooks/ws/useChatsLastMessage";
import useUser from "@/store/useUser";
import useMyChat from "@/store/useMyChatResponse";
import RandomProfile from "@/helper/tsx/RandomProfile";
import { useUserOnlineStatusHandler } from "@/hooks/ws/useUserOnlineStatusHandler";
import { useTypingStatus } from "@/hooks/ws/useTypingStatus";
import { useCallback } from "react";
import { ChatItemMessagePreview } from "@/type/chat/chat";

const ChatItem = ({ chat }: { chat: ChatItemResponse }) => {
    const { lastMessage, id } = chat;
    const user = useUser(s => s.user);
    const changeLastMessagePreview = useMyChat(state => state.changeLastMessagePreview);
    const changeOnlineStatus = useMyChat(state => state.changeOnlineStatus);
    const changeTypingStatus = useMyChat(state => state.changeTypingStatus);

    // WS's
    const handleLastMessage = useCallback((payload: ChatItemMessagePreview) => {
        changeLastMessagePreview(payload, id);
    }, [changeLastMessagePreview, id]);

    const handleTypingStatus = useCallback((isTyping: boolean) => {
        changeTypingStatus(chat.id, isTyping);
    }, [changeTypingStatus, chat.id]);

    useMyChatsLastMessage(id, user?.id!, handleLastMessage);
    useUserOnlineStatusHandler(id, chat.secondUserId, handleOnlineStatus);
    useTypingStatus(id, user?.id!, handleTypingStatus);

    function handleOnlineStatus(payload: {
        chatId: number, userId: number, isOnline: boolean
    }) {
        console.log("Taking from backend");
        console.log(payload);

        changeOnlineStatus(payload.chatId, payload.isOnline);
    }

    return <>
        <div className="flex justify-between items-end p-[11px] transition-all duration-300 hover:bg-[#DBDDE1] dark:hover:bg-[#272A30]">
            <div className="flex gap-[10px]">
                <div className="size-[50px] flex justify-center items-center relative">
                    {chat.type === ChatType.SAVED ?
                        <Image src={SavedMessageImage} alt="Saved Message Image" /> :
                        <RandomProfile title={chat.title.toUpperCase() || ""} bgColor={chat.bgColor} textColor={chat.textColor} />
                    }
                    {
                        (chat.isOnline && chat.type === ChatType.DM) && <div className="absolute size-3 bg-green-500 rounded-full top-0 right-0 ring-1 ring-black" />
                    }
                </div>
                <div>
                    <h5 className="text-[16px]">{chat.title}</h5>
                    {
                        chat.isTyping ? <>
                            <p className="text-sm text-[#1468fa]">
                                Typing ...
                            </p>
                        </> : <>
                            {lastMessage && <p className="text-sm dark:text-[#747881] line-clamp-1">
                                {lastMessage.title.substring(0, 20) + (lastMessage.title.length > 20 ? "..." : "")}
                            </p>}
                            {
                                !lastMessage && <p className="text-sm dark:text-[#747881]">
                                    No messages yet
                                </p>
                            }
                        </>
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
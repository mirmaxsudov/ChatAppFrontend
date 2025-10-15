"use client";

import { toTimeFormatted } from "@/helper/ts/dateFormater";
import RandomProfile from "@/helper/tsx/RandomProfile";
import { ChatItemResponse } from "@/type/chat/chat";

const JustTextMessageLeft = ({ chat, message, sentAt, isEdited }: { chat: ChatItemResponse, message: string, sentAt: string | Date, isEdited: boolean }) => {
    return <>
        <div className="flex flex-row gap-[8px] items-start my-[5px]">
            <div className="size-[36px] self-end">
                <RandomProfile title={chat.title.toUpperCase() || ""} bgColor={chat.bgColor} textColor={chat.textColor} />
            </div>
            <div className="bg-[#E9EAED] rounded-[10px] break-all dark:text-[#fff] text-[#080707] py-[8px] px-[16px] dark:bg-[#23262F] text-justify w-fit max-w-[426px]">
                <div>
                    <p className="text-[14px]" dangerouslySetInnerHTML={{
                        __html: message
                    }} />
                    <div className="flex gap-1">
                        <p className="text-[#747881] mt-[4px] text-start text-[10px]">
                            {toTimeFormatted(sentAt)}
                        </p>
                        {
                            isEdited && <>
                                <p className="text-[#747881] mt-[4px] text-start text-[10px]">
                                    Edited
                                </p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default JustTextMessageLeft;

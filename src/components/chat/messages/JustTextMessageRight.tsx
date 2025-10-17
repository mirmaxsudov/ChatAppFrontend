"use client";

import { toTimeFormatted } from "@/helper/ts/dateFormater";
import { BOTH_SIDE_READ, SINGLE_READ } from "@/helper/tsx/MessageReadTypes";
import useMyModals from "@/store/useMyModals";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { CopyIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Pin, Reply } from "lucide-react";
import React, { ReactNode } from "react";
import { MessageItemResponse } from '../../../type/chat/message';

const JustTextMessageRight = ({ message, text, isRead = false, edited = false, editedAt, sentAt, chatId, messageId }: {
  message: MessageItemResponse, text: string, isRead: boolean, sentAt: Date | string, chatId: number, messageId: number, edited: boolean, editedAt: string | Date
}) => {
  const { updateVal, setUpdateMessageData } = useMyModals();


  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <div className="flex flex-col items-end my-[5px]">
          <div className="bg-[#E0F0FF] rounded-[10px] break-all dark:text-[#fff] text-[#080707] py-[8px] px-[16px] dark:bg-[#001A3D] text-justify w-fit max-w-[426px]">
            <p className="text-[14px]" >
              {text}
            </p>
            <div className="flex mt-[4px] items-center justify-end gap-[5px]">
              {isRead ? BOTH_SIDE_READ : SINGLE_READ}
              <p className="text-[#747881] text-end text-[10px]">
                {toTimeFormatted(sentAt)}
              </p>
              <p className="text-[#747881] text-end text-[10px]">
                {edited && "Edited"}
              </p>
            </div>
          </div>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="min-w-[180px] bg-white dark:bg-gray-900 rounded-lg p-1 shadow-lg border border-gray-200 dark:border-gray-700 z-[1000] animate-fade-in"
        >
          {edited && <>
            <ContextMenuItem>
              Edited {toTimeFormatted(editedAt)}
            </ContextMenuItem>
            <ContextMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
          </>
          }
          <ContextMenuItem
            onSelect={() => console.log("reply")}
            label="Reply"
            icon={<Reply className="w-4 h-4" />}
          />
          <ContextMenuItem
            onSelect={() => {
              setUpdateMessageData({ chatId, messageId, text: message });
              updateVal("updateMessageModal", true);
            }}
            label="Edit"
            icon={<Pencil2Icon className="w-4 h-4" />}
          />
          <ContextMenuItem
            onSelect={() => console.log("pin")}
            label="Pin"
            icon={<Pin className="w-4 h-4" />}
          />
          <ContextMenuItem
            onSelect={() => console.log("copy link")}
            label="Copy"
            icon={<CopyIcon className="w-4 h-4" />}
          />
          <ContextMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
          <ContextMenuItem
            onSelect={() => console.log("delete")}
            label="Delete"
            icon={<TrashIcon className="w-4 h-4" />}
            destructive
          />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default JustTextMessageRight;

const ContextMenuItem = ({ icon, label, onSelect, destructive = false, children }: {
  icon?: ReactNode,
  label?: string,
  onSelect?: () => void,
  destructive?: boolean,
  children?: ReactNode
}) => {
  return (
    <ContextMenu.Item
      onSelect={onSelect}
      className={`
        flex items-center gap-2 px-4 py-2 text-sm rounded-md cursor-pointer outline-none select-none transition-colors
        ${destructive
          ? 'text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-blue-500 dark:hover:text-blue-400'
        }
      `}
    >
      {
        children ? children : <>
          {icon}
          <span>{label}</span>
        </>}
    </ContextMenu.Item>
  );
};

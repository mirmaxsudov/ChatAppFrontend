"use client";

import { BOTH_SIDE_READ } from "@/helper/tsx/MessageReadTypes";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { styled } from "styled-components";

const StyledContent = styled(ContextMenu.Content)`
  min-width: 180px;
  background: var(--bg, #fff);
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  z-index: 1000;
`;

const StyledItem = styled(ContextMenu.Item)`
  font-size: 15px;
  color: var(--text, #222);
  padding: 8px 18px;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  transition: background 0.15s;
  &:hover, &[data-highlighted] {
    background: var(--hover, #f3f4f6);
    color: var(--accent, #0070f3);
  }
  &[data-disabled] {
    color: #aaa;
    pointer-events: none;
  }
`;

// Separator line
const StyledSeparator = styled(ContextMenu.Separator)`
  height: 1px;
  background: #e5e7eb;
  margin: 4px 0;
`;

// Optional: Label for sections
const StyledLabel = styled(ContextMenu.Label)`
  font-size: 12px;
  color: #888;
  padding: 6px 18px 2px 18px;
  user-select: none;
`;

const JustTextMessageRight = ({ message }) => {
    return <>
        <ContextMenu.Root>
            <ContextMenu.Trigger asChild>

                <div className="flex flex-col items-end my-[5px]">
                    <div className="bg-[#E0F0FF] rounded-[10px] break-all dark:text-[#fff] text-[#080707] py-[8px] px-[16px] dark:bg-[#001A3D] text-justify w-fit max-w-[426px]">
                        <p className="text-[14px]" dangerouslySetInnerHTML={{
                          __html: message
                        }}>
                        </p>
                        <div className="flex mt-[4px] items-center justify-end gap-[5px]">
                            {BOTH_SIDE_READ}
                            <p className="text-[#747881] text-end text-[10px]">
                                2:16 PM
                            </p>
                        </div>
                    </div>
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <StyledContent>
                    <StyledItem onSelect={() => console.log("reply")}>Reply</StyledItem>
                    <StyledItem onSelect={() => console.log("edit")}>Edit</StyledItem>
                    <StyledItem onSelect={() => console.log("pin")}>Pin</StyledItem>
                    <StyledItem onSelect={() => console.log("copy link")}>Copy link</StyledItem>
                    <StyledSeparator />
                    <StyledItem onSelect={() => console.log("delete")}>Delete</StyledItem>
                </StyledContent>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    </>
}

export default JustTextMessageRight;
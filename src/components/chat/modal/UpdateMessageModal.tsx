"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateMessage } from "@/api/chat/chat.api";
import useMyNotice from "@/hooks/useMyNotice";
import NoticeEnum from "@/enums/NoticeEnum";

type UpdateMessageModalType = {
    open: boolean,
    text: { chatId: number, messageId: number, message?: string },
    setOpen: (val: boolean) => void,
    chatId?: number,
    messageId?: number,
    onUpdated?: (newText: string) => void
}

const MIN_LENGTH = 1;
const MAX_LENGTH = 4000;

const UpdateMessageModal = ({
    open, text, setOpen, chatId, messageId, onUpdated
}: UpdateMessageModalType) => {
    const [value, setValue] = useState<string>(text ? text.message ?? "" : "");
    const [saving, setSaving] = useState<boolean>(false);
    const { showMessage } = useMyNotice();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (open) {            
            setValue(text ? text.message ?? "" : "");
        }
    }, [open, text]);

    useEffect(() => {
        if (open && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(value.length, value.length);
        }
    }, [open, value.length]);

    const remaining = useMemo(() => MAX_LENGTH - value.length, [value.length]);
    const isValid = value?.trim().length >= MIN_LENGTH && value.length <= MAX_LENGTH && value?.trim() !== (typeof text === 'string' ? text : "").trim();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!isValid) return;

        if (!chatId || !messageId) {
            onUpdated?.(value.trim());
            setOpen(false);
            return;
        }

        setSaving(true);
        try {
            const res = await updateMessage(chatId, messageId, value.trim());
            showMessage(res.message, NoticeEnum.SUCCESS);
            onUpdated?.(value.trim());
            setOpen(false);
        } catch (e) {
            showMessage("Failed to update message", NoticeEnum.ERROR);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit message</DialogTitle>
                    <DialogDescription>
                        Update your message. Press Shift+Enter for a new line.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="edit-message" className="block text-sm font-medium">Message</label>
                        <Textarea
                            id="edit-message"
                            ref={textareaRef}
                            rows={4}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Edit your message..."
                            maxLength={MAX_LENGTH}
                            className="break-words"
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className={""}>{remaining} characters left</span>
                            {!isValid && (
                                <span className="text-destructive">
                                    {value?.trim() === (text ? text.message ?? "" : "").trim() ? "No changes detected" : value?.trim().length < MIN_LENGTH ? "Message is required" : value.length > MAX_LENGTH ? "Too long" : ""}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={saving}>Cancel</Button>
                        <Button type="submit" disabled={!isValid || saving}>{saving ? "Saving..." : "Save changes"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateMessageModal;
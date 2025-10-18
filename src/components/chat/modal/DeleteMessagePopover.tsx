"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { deleteMessage } from "@/api/chat/chat.api";
import { toast } from "sonner";

interface DeleteMessagePopoverProps {
  children?: React.ReactNode;
  messageId: number;
  chatId: number;
  messageText: string;
  onMessageDeleted: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const DeleteMessagePopover = ({ 
  children,
  messageId, 
  chatId, 
  messageText, 
  onMessageDeleted,
  isOpen = false,
  onClose
}: DeleteMessagePopoverProps) => {
  const [isForAll, setIsForAll] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(isOpen);

  // Sync external isOpen state
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteMessage(chatId, messageId, isForAll);
      toast.success("Message deleted successfully");
      onMessageDeleted();
      setOpen(false);
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        {children || <div />}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end" side="top">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Delete message</h4>
            <p className="text-xs text-muted-foreground">
              Are you sure you want to delete this message?
            </p>
          </div>

          {/* Message preview */}
          <div className="bg-muted rounded-lg p-3 border">
            <p className="text-xs text-muted-foreground mb-1">Message:</p>
            <p className="text-sm break-words line-clamp-3">{messageText}</p>
          </div>

          {/* Delete for everyone option */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="delete-for-all" 
              checked={isForAll}
              onCheckedChange={(checked) => setIsForAll(checked as boolean)}
            />
            <label 
              htmlFor="delete-for-all" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Delete for everyone
            </label>
          </div>

          <p className="text-xs text-muted-foreground">
            {isForAll 
              ? "This message will be deleted for all participants in this chat."
              : "This message will only be deleted for you."
            }
          </p>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleOpenChange(false)}
              className="flex-1"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDelete}
              className="flex-1"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteMessagePopover;

"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandGroup,
    CommandList,
    CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";
import { UserForNewChatType } from "@/type/user/UserType";
import { getUserForNewChat } from "@/api/chat/user.api";
import useMyNotice from "@/hooks/useMyNotice";
import NoticeEnum from "@/enums/NoticeEnum";
import $api from '@/api/request';
import { newStartChat } from "@/api/chat/chat.api";

interface UserComboboxProps {
    selected: UserForNewChatType | null;
    onSelect: (u: UserForNewChatType) => void;
}

function UserCombobox({ selected, onSelect }: UserComboboxProps) {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<UserForNewChatType[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (query.length < 3) {
                setUsers([]);
                return;
            }

            setFetching(true);
            try {
                const response = await getUserForNewChat(query);
                setUsers(response.data);
            } catch (e) {
                console.log(e);
                setUsers([]);
            } finally {
                setFetching(false);
            }
        };

        fetchUsers();
    }, [query]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded="false"
                    className="w-full justify-between"
                >
                    {selected ? selected.firstname + (selected.lastname || "") : "Select user..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Type a name or @username…"
                        value={query}
                        onValueChange={setQuery}
                        autoFocus
                    />
                    <CommandList>
                        {query.length > 0 && query.length < 3 && !fetching && (
                            <div className="py-2 px-3 text-sm text-muted-foreground">Type at least 3 characters…</div>
                        )}
                        {fetching && (
                            <div className="py-2 px-3 text-sm text-muted-foreground">Fetching users…</div>
                        )}
                        {!fetching && query.length >= 3 && users.length === 0 && (
                            <div className="py-2 px-3 text-sm text-muted-foreground">No user found.</div>
                        )}
                        <CommandGroup>
                            {users.map((u) => (
                                <CommandItem
                                    key={u.id}
                                    value={`${u.firstname} ${u.lastname || ""} @${u.username}`}
                                    onSelect={() => {
                                        onSelect(u);
                                        setQuery("");
                                    }}
                                >
                                    <span className="font-medium">{u.firstname}</span>
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        @{u.username}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

type NewMessageModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function NewMessageModal({ open, setOpen }: NewMessageModalProps) {
    const [selectedUser, setSelectedUser] = useState<UserForNewChatType | null>(null);
    const [saving, setSaving] = useState<boolean>(false);
    const { showMessage } = useMyNotice();
    const [notiId, setNotiId] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedUser) return;
        const message = (e.currentTarget.message as HTMLTextAreaElement).value;

        setSaving(true);
        try {
            const response = await newStartChat(selectedUser.id, message);
            showMessage(response.message, NoticeEnum.SUCCESS);
        } catch (e) {
            showMessage("Something went wrong!", NoticeEnum.ERROR);
        } finally {
            setSaving(false);
        }

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogDescription>
                        Search a user and start chatting.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">Recipient</label>
                        <UserCombobox
                            selected={selectedUser}
                            onSelect={setSelectedUser}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="mt-1 block w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                            placeholder="Type your message here…"
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Send Message
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
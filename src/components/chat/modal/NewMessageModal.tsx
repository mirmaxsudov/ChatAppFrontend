"use client";

import {useState, useEffect} from "react";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import {ChevronsUpDown} from "lucide-react";

interface User {
    id: string;
    name: string;
    username: string;
    avatarUrl: string
}

interface UserComboboxProps {
    users: User[];
    selected: User | null;
    onSelect: (u: User) => void;
}

function UserCombobox({users, selected, onSelect}: UserComboboxProps) {
    const [query, setQuery] = useState("");
    const filtered = query
        ? users.filter(
            (u) =>
                u.name.toLowerCase().includes(query.toLowerCase()) ||
                u.username.toLowerCase().includes(query.toLowerCase())
        )
        : users;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded="false"
                    className="w-full justify-between"
                >
                    {selected ? selected.name : "Select user..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50"/>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-full">
                <Command>
                    <CommandInput
                        placeholder="Type a name or @username…"
                        value={query}
                        onValueChange={setQuery}
                        autoFocus
                    />
                    <CommandEmpty>No user found.</CommandEmpty>
                    <CommandGroup>
                        {filtered.map((u) => (
                            <CommandItem
                                key={u.id}
                                onSelect={() => {
                                    onSelect(u);
                                    setQuery("");
                                }}
                            >
                                <span className="font-medium">{u.name}</span>
                                <span className="ml-auto text-xs text-muted-foreground">
                  @{u.username}
                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default function NewMessageModal() {
    const [open, setOpen] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        setUsers([
            {
                id: "1",
                name: "Alice Johnson",
                username: "alicej",
                avatarUrl: "https://i.pravatar.cc/150?img=1",
            },
            {
                id: "2",
                name: "Bob Martinez",
                username: "bobm",
                avatarUrl: "https://i.pravatar.cc/150?img=2",
            },
            {
                id: "3",
                name: "Cara Nguyen",
                username: "carang",
                avatarUrl: "https://i.pravatar.cc/150?img=3",
            },
            {
                id: "4",
                name: "David Kim",
                username: "davidk",
                avatarUrl: "https://i.pravatar.cc/150?img=4",
            },
            {
                id: "5",
                name: "Ella Fitzgerald",
                username: "ella.f",
                avatarUrl: "https://i.pravatar.cc/150?img=5",
            },
            {
                id: "6",
                name: "Frank Liu",
                username: "frankl",
                avatarUrl: "https://i.pravatar.cc/150?img=6",
            },
            {
                id: "7",
                name: "Grace Patel",
                username: "gracep",
                avatarUrl: "https://i.pravatar.cc/150?img=7",
            },
            {
                id: "8",
                name: "Hector Ruiz",
                username: "hectorr",
                avatarUrl: "https://i.pravatar.cc/150?img=8",
            },
            {
                id: "9",
                name: "Ivy Chen",
                username: "ivy.c",
                avatarUrl: "https://i.pravatar.cc/150?img=9",
            },
            {
                id: "10",
                name: "Jack Thompson",
                username: "jackt",
                avatarUrl: "https://i.pravatar.cc/150?img=10",
            },
            {
                id: "11",
                name: "Kate Kim",
                username: "katek",
                avatarUrl: "https://i.pravatar.cc/150?img=11",
            },
            {
                id: "12",
                name: "Leo Zhang",
                username: "leoz",
                avatarUrl: "https://i.pravatar.cc/150?img=12",
            },
            {
                id: "13",
                name: "Mia Nguyen",
                username: "mian",
                avatarUrl: "https://i.pravatar.cc/150?img=13",
            }
        ]);
    }, []);

    // useEffect(() => {
    //     // Replace this with your real API call:
    //     fetch("/api/users")
    //         .then((res) => res.json())
    //         .then((data: User[]) => setUsers(data))
    //         .catch(console.error);
    // }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedUser) return;
        const message = (e.currentTarget.message as HTMLTextAreaElement).value;
        console.log("Send to:", selectedUser, "Message:", message);
        // TODO: send via WebSocket / REST API
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <h2 className="text-lg font-semibold">New Message</h2>
                    <p className="text-sm text-muted-foreground">
                        Search a user and start chatting.
                    </p>
                </DialogHeader>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">Recipient</label>
                        <UserCombobox
                            users={users}
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
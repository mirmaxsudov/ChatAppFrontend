"use client";

import {
    AtSign,
    Moon,
    Pen,
    SaveAll,
    Settings,
    Sun,
    User,
    Users,
    UsersRound,
} from "lucide-react";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useTheme } from "next-themes";
import { capitalizeFirstLetter } from "@/helper/ts/Capitalize";
import useUser from "@/store/useUser";
import NewMessageModal from "@/components/chat/modal/NewMessageModal";
import { useState } from "react";
import OwnProfile from "@/components/chat/modal/profile/OwnProfile";
import { useRouter } from "next/navigation";
import NewChannelModal from "./modal/NewChannelModal";
import useMyModals from "@/store/useMyModals";
import UpdateMessageModal from "./modal/UpdateMessageModal";

const ChatNavDropDown = () => {
    const { theme, setTheme } = useTheme();
    const user = useUser((state) => state.user);
    const { newChannelModal, profileModal, newMessageModal, updateVal } = useMyModals();

    const clearUser = useUser(state => state.clearUser);

    const router = useRouter();

    const setNewMessageModal = (val: boolean) =>
        updateVal("newMessageModal", val);

    const setProfileModal = (val: boolean) =>
        updateVal("profileModal", val);

    const setNewChannelModal = (val: boolean) =>
        updateVal("newChannelModal", val);

    const handleSavedMessages = () => {
        // TODO
    }

    return (
        <>
            <DropdownMenuContent className="dark:bg-[#0F172B]">
                <DropdownMenuItem>
                    <Link
                        href="/profile"
                        className="flex items-center justify-between gap-2"
                    >
                        <img
                            className="rounded"
                            width={30}
                            height={30}
                            src="https://wallpapers.com/images/featured/pretty-profile-pictures-6x5bfef0mhb60qyl.jpg"
                            alt="Profile"
                        />
                        <span>
                            {user?.firstName} {user?.lastname}
                        </span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <AtSign /> Mentions
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <SaveAll width={16} className={"text-[#8292A8] mr-[5px]"} /> Messages
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="dark:bg-[#0F172B]">
                        <DropdownMenuItem className={"cursor-pointer"} onClick={() => {
                            setNewMessageModal(true);
                        }}>
                            <Pen /> New Direct Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Users /> New Group
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            setNewChannelModal(true);
                        }}>
                            <UsersRound /> New Channel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSavedMessages()}>
                            <SaveAll /> Saved messages
                        </DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    {theme === "light" ? <Moon /> : <Sun />}
                    {capitalizeFirstLetter(theme as string)} Mode
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setProfileModal(true)}>
                    <Settings /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    clearUser();
                    router.push("/");
                }}>
                    <User /> Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
            {/* Modals */}
            <OwnProfile open={profileModal} setOpen={setProfileModal} />
            <NewMessageModal open={newMessageModal} setOpen={setNewMessageModal} />
            <NewChannelModal open={newChannelModal} setOpen={setNewChannelModal} />
        </>
    );
};

export default ChatNavDropDown;
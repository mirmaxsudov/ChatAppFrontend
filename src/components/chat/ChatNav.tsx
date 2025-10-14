import { Menu } from "lucide-react";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import ChatNavDropDown from "./ChatNavDropDown";

const ChatNav = () => {
    return (
        <div
            className="p-2 flex items-center justify-between gap-5 w-full bg-gray-100 dark:bg-[#23262F] border-r border-gray-200 dark:border-[#23262F]">
            <div className="shrink-0">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Menu />
                    </DropdownMenuTrigger>
                    <ChatNavDropDown />
                </DropdownMenu>
            </div>
            <div className="flex-1">
                <Input placeholder="Search" className="w-full" />
            </div>
        </div>
    );
};

export default ChatNav;
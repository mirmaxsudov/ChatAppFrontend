import { Menu } from "lucide-react";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import ChatNavDropDown from "./ChatNavDropDown";

const ChatNav = () => {
    return <>
        <div className="p-2 flex items-center justify-between gap-[20px]">
            <div className="w-[20px] shrink">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Menu />
                    </DropdownMenuTrigger>
                    <ChatNavDropDown />
                </DropdownMenu>
            </div>
            <div className="w-[100%]">
                <Input placeholder="Search" />
            </div>
        </div>
    </>
}

export default ChatNav;
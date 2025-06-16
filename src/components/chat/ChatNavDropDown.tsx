import { AtSign, Moon, Pen, User, Users } from "lucide-react";
import { DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { ThemeToggle } from "../ThemeToggle";

const ChatNavDropDown = () => {
    return (
        <>
            <DropdownMenuContent className="dark:bg-[#23262F]">
                <DropdownMenuItem>
                    <Link href={"/profile"} className="flex items-center justify-between gap-[10px]">
                        <img className="rounded" width={30} height={30} src={"https://wallpapers.com/images/featured/pretty-profile-pictures-6x5bfef0mhb60qyl.jpg"} alt="Image" />
                        <h4>Abdurahmon Mirmaxsudov</h4>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <AtSign /> <p>Mentions</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Pen />
                    New Direct Message
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Users />
                    New Group
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Moon />
                    Dark Mode
                    <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <User />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </>
    );
};

export default ChatNavDropDown;
import { AtSign, Moon, Pen, Sun, User, Users } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import Link from "next/link";
import { useTheme } from "next-themes";
import { capitalizeFirstLetter } from "@/helper/Capitalize";

const ChatNavDropDown = () => {
    const { theme, setTheme } = useTheme();

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
                <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    {theme === "light" ? <Moon /> : <Sun />}
                    {capitalizeFirstLetter(theme as string)} Mode
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
import { Backpack, CircleArrowLeft, EllipsisVertical, PenOff, Trash, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const ChatHeader = () => {
    return (
        <>
            <div className={`sticky top-0 left-0 w-full dark:bg-[#23262F] z-10 py-[10px] px-[8px] flex justify-between items-center`}>
                <div className="flex items-center gap-[18px]">
                    <div className="size-[40px]">
                        <img className="size-full rounded-full" src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" alt="something" />
                    </div>
                    <div className="flex flex-col">
                        <h1>
                            Abdurahmon Mirmaxsudov
                        </h1>
                        <p className="text-sm text-[#747881]">
                            Online for 10 mins
                        </p>
                    </div>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical width={"18px"} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <User /> Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CircleArrowLeft /> Leave
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <PenOff /> Read all
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500 hover:text-red-500">
                                <Trash className="text-red-500" /> <p className="text-red-500 dark:text-red-500">Delete</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <hr />
        </>
    );
};

export default ChatHeader;
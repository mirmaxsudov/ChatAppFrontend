import ChatNav from "./ChatNav";
import OwnProfile from "@/components/chat/modal/profile/OwnProfile";

const ChatList = ({width}: { width: number }) => {
    return (
        <div style={{width: width}} className="w-full relative h-full flex flex-col">
            <ChatNav/>
            <div className="flex-1 overflow-x-auto h-0 scrollbar-hide">
                <div className="w-full text-center">
                    <>
                        No Chats
                    </>
                </div>
            </div>
            <OwnProfile/>
        </div>
    );
};

export default ChatList;
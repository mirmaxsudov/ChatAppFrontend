import ChatContent from "@/components/chat/ChatContent";
import ChatFooter from "@/components/chat/ChatFooter";
import ChatHeader from "@/components/chat/ChatHeader";

const Chat = () => {
    return (
        <div className="flex flex-col h-screen w-full">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-[8px]">
                <ChatContent />
            </div>
            <ChatFooter />
        </div>
    );
};

export default Chat;
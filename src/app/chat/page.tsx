import ChatHeader from "@/components/chat/ChatHeader";

const Chat = () => {
    return (
        <div className="relative h-full w-full">
            <ChatHeader />
            <div className="p-[8px]"> {/* Adjust pt-12 to match header height */}
                Chat content here
            </div>
        </div>
    );
};

export default Chat;
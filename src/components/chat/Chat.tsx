import ChatContent from "./ChatContent";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";

const Chat = () => {
    return <>
        <div className="relative">
            <ChatHeader/>
            <ChatContent/>
            <ChatFooter/>
        </div>
    </>
}

export default Chat;
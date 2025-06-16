import ChatItem from "./ChatItem";
import ChatNav from "./ChatNav";

const ChatItems = [
    {
        id: 1,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 2,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 3,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 4,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 5,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 6,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 7,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 8,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 9,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 10,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 11,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 12,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 13,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 14,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 15,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    }, {
        id: 16,
        image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
        fullname: "Abdurahmon Mirmaxsudov",
        message: "Something"
    },
]

const ChatList = ({ width }: { width: number }) => {
    return (
        <div style={{ width: width }} className="w-full relative h-full flex flex-col">
            <ChatNav />
            <div className="flex-1 overflow-x-auto h-0 scrollbar-hide">
                <div className="w-full">
                    {ChatItems.map(item => (
                        <ChatItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
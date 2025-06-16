const ChatItem = ({ item }: {
    item: {
        id: number,
        image: string,
        fullname: string,
        message: string
    }
}) => {
    return <>
        <div className="flex justify-between items-end p-[11px] transition-all duration-300 hover:bg-[#DBDDE1] dark:hover:bg-[#272A30]">
            <div className="flex gap-[10px]">
                <div className="size-[50px]">
                    <img className="size-full rounded-full" src={item.image} />
                </div>
                <div>
                    <h5 className="text-[16px]">{item.fullname}</h5>
                    <p className="text-sm dark:text-[#747881]">{item.message}</p>
                </div>
            </div>
            <div>
                9:43 AM
            </div>
        </div>
    </>
}

export default ChatItem;
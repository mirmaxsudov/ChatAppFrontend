import { BOTH_SIDE_READ, DID_NOT_SEND, SINGLE_READ } from "@/helper/MessageReadTypes";

const JustTextMessageRight = ({ message }) => {
    return <>
        <div className="flex flex-col items-end my-[5px]">
            <div className="bg-[#E0F0FF] rounded-[10px] break-all dark:text-[#fff] text-[#080707] py-[8px] px-[16px] dark:bg-[#001A3D] text-justify w-fit max-w-[426px]">
                <p className="text-[14px]">
                    {message}
                </p>
                <div className="flex mt-[4px] items-center justify-end gap-[5px]">
                    {BOTH_SIDE_READ}
                    <p className="text-[#747881] text-end text-[10px]">
                        2:16 PM
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default JustTextMessageRight;
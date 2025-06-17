import clsx from "clsx";
import ImagesMessage from "./ImagesMessage";
import { BOTH_SIDE_READ } from "@/helper/MessageReadTypes";

const ImageCaptionMessage = ({ message, imageLinks, isLeft }: { message: string, isLeft: boolean, imageLinks: string[] }) => {
    return <>
        <div className={clsx("", [
            { "flex justify-end": !isLeft }
        ])}>
            <div className={clsx("w-[426px] rounded-[20px] my-[4px]", [
                { "bg-[#E9EAED] dark:bg-[#1C1E22]": isLeft },
                { "bg-[#E0F0FF] dark:bg-[#001A3D]": !isLeft }
            ])}>
                <ImagesMessage withCaption imageLinks={imageLinks} isLeft={isLeft} />
                <div className="px-[10px] pt-[4px]">
                    <p>{message}</p>
                </div>
                <div className={clsx("px-[10px] pb-[8px] flex mt-[4px] items-center gap-[5px]", [
                    { "justify-end": !isLeft },
                    { "justify-start": isLeft },
                ])}>
                    {
                        !isLeft ? BOTH_SIDE_READ : ""
                    }
                    <p className={clsx("text-[#747881] text-end text-[10px]", [
                        { "text-end": !isLeft },
                        { "text-start": isLeft },
                    ])}>
                        2:16 PM
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default ImageCaptionMessage;
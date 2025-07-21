import {BOTH_SIDE_READ} from "@/helper/tsx/MessageReadTypes";
import clsx from "clsx";

const ImagesMessage = ({imageLinks, isLeft, withCaption}: {
    withCaption: boolean,
    imageLinks: string[],
    isLeft: boolean
}) => {
    const len = imageLinks.length;

    if (len === 0)
        return;

    return <>
        <div className={clsx("", [
            {"flex justify-end ": !isLeft && !withCaption}
        ])}>
            <div className={clsx("max-w-[426px] max-h-[446px] rounded-[20px]", [
                {"bg-[#E9EAED] dark:bg-[#23262F]": isLeft},
                {"bg-[#E0F0FF] dark:bg-[#001A3D]": !isLeft},
                {"my-[4px]": !withCaption}
            ])}>
                <div className="max-h-[426px]">
                    <div className={clsx("grid gap-[4px] size-full", [
                        {"grid-cols-1 grid-rows-1": len === 1},
                        {"grid-cols-2 grid-rows-1": len === 2},
                        {"grid-cols-2 grid-rows-1": len === 3},
                        {"grid-cols-2 grid-rows-2": len >= 4},
                    ])}>
                        {imageLinks.slice(0, 4).map((link, index) => {
                            return <ImageItem key={link} link={link} index={index + 1} count={len}/>
                        })}
                    </div>
                </div>
                {!withCaption && <>
                    <div className="flex mt-[4px] pr-[10px] pb-[4px] items-center justify-end gap-[5px]">
                        {BOTH_SIDE_READ}
                        <p className="text-[#747881] text-end text-[10px]">
                            2:16 PM
                        </p>
                    </div>
                </>}
            </div>
        </div>
    </>
}

const getBorderRadius = (index: number, count: number) => {
    if (count === 1) {
        return "rounded-[20px]";
    }
    if (count === 2) {
        if (index === 1) return "rounded-tl-[20px] rounded-bl-[20px]";
        if (index === 2) return "rounded-tr-[20px] rounded-br-[20px]";
    }
    if (count === 3) {
        if (index === 1) return "rounded-tl-[20px]";
        if (index === 2) return "rounded-tr-[20px]";
        if (index === 3) return "rounded-bl-[20px] rounded-br-[20px]";
    }
    if (count >= 4) {
        if (index === 1) return "rounded-tl-[20px]";
        if (index === 2) return "rounded-tr-[20px]";
        if (index === 3) return "rounded-bl-[20px]";
        if (index === 4) return "rounded-br-[20px]";
    }
    return "";
};

const ImageItem = ({link, index, count}: { link: string, index: number, count: number }) => {
    return (
        <div
            className={clsx(
                "w-auto " + getBorderRadius(index, count),
                {"col-span-2 row-start-2": index === 3 && count === 3}
            )}
        >
            {(count > 4 && index === 4) ? (
                <div className="border-radius relative w-full h-full flex justify-center items-center overflow-hidden">
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: `url('${link}')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(2px)"
                        }}
                    />
                    <p className="relative z-10 text-white">{count}+</p>
                </div>
            ) : (
                <img className="w-full h-full object-cover border-radius" src={link} alt={link}/>
            )}
        </div>
    );
};

export default ImagesMessage;
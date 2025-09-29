"use client";

const JustTextMessageLeft = ({ message }) => {
    return <>
        <div className="flex flex-row gap-[8px] items-start my-[5px]">
            <div className="size-[36px] self-end">
                <img className="size-full rounded-full object-cover" src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg" alt="image" />
            </div>
            <div className="bg-[#E9EAED] rounded-[10px] break-all dark:text-[#fff] text-[#080707] py-[8px] px-[16px] dark:bg-[#23262F] text-justify w-fit max-w-[426px]">
                <div>
                    <p className="text-[14px]" dangerouslySetInnerHTML={{
                        __html: message
                    }}>
                    </p>
                    <p className="text-[#747881] mt-[4px] text-start text-[10px]">
                        2:16 PM
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default JustTextMessageLeft;
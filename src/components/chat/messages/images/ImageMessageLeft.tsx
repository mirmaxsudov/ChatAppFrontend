import ImagesMessage from "./ImagesMessage";

const ImageMessageLeft = ({ imageLinks }: { imageLinks: string[] }) => {
    return <>
        <div className="flex flex-row gap-[8px] items-start my-[5px]">
            <div className="size-[36px] self-end">
                <img className="size-full rounded-full object-cover" src="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg" alt="image" />
            </div>
            <div>
                <ImagesMessage imageLinks={imageLinks} isLeft={true} withCaption={false} />
            </div>
        </div>
    </>
}

export default ImageMessageLeft;
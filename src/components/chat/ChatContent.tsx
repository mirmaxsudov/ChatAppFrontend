import ImageCaptionMessage from "./messages/images/ImageCaptionMessage";
import ImageMessageLeft from "./messages/images/ImageMessageLeft";
import ImagesMessage from "./messages/images/ImagesMessage";
import JustTextMessageLeft from "./messages/JustTextMessageLeft";
import JustTextMessageRight from "./messages/JustTextMessageRight";

const ChatContent = () => {
    return <>
        <JustTextMessageRight message={"Something"} />
        <JustTextMessageRight message={"✔️"} />
        <JustTextMessageLeft message={"Assalomu aleykum"} />
        <JustTextMessageLeft message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor illo soluta a vero rem esse. Vitae nam optio natus aspernatur error id voluptas incidunt architecto tempora hic cupiditate laudantium quam fugit deleniti impedit dolorem inventore, quasi sunt nemo earum distinctio accusantium enim reiciendis quia. Minima ea asperiores est iste ex esse perspiciatis inventore, voluptatibus, voluptate nesciunt praesentium. Aliquid iure atque id facere expedita minima assumenda maxime? Quae ad error, in numquam velit praesentium. Repellat similique esse cumque itaque sunt iure excepturi sapiente unde, ut quidem dolorem optio dignissimos recusandae cum voluptas enim pariatur fuga. Quas iure enim quidem dolorem veniam."} />
        <ImagesMessage withCaption={false} isLeft={false} imageLinks={[
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
        ]} />

        <ImageCaptionMessage isLeft={false} message="Abdurahmon Mirmaxsudov" imageLinks={[
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
        ]} />
        <ImageMessageLeft imageLinks={[
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
            "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg"
        ]} />
    </>
}

export default ChatContent;
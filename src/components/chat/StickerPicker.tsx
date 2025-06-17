import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function StickerPicker({ onSelect }) {
    return (
        <>
            <Picker
                data={data}
                onEmojiSelect={emoji => {
                    onSelect(emoji.native);
                }}
            />
        </>
    );
}

export default StickerPicker;
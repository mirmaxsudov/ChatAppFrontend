import { CircleUserRound } from "lucide-react"
import { generateRandomHexColor } from "../ts/getRandomColor"

const RandomProfile = ({ title = "", bgColor, textColor }: {
    title: string,
    bgColor: string,
    textColor: string
}) => {
    return <>
        <div
            style={{
                backgroundColor: bgColor,
                color: textColor
            }}
            className={`size-full rounded-full flex justify-center items-center`}>
            <div className="flex justify-center items-center">
                <p>{title?.at(0)}</p>
            </div>
        </div>
    </>
}

export default RandomProfile;
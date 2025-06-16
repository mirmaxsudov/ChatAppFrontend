import { useTheme } from "next-themes";

const NotFound = ({ title }: { title: string }) => {
    const { theme } = useTheme();
    return <>
        <div className="flex items-center justify-center flex-col">
            {theme !== "light" ? <>
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M86 0.5H10C4.775 0.5 0.5 4.775 0.5 10V95.5L19.5 76.5H86C91.225 76.5 95.5 72.225 95.5 67V10C95.5 4.775 91.225 0.5 86 0.5ZM86 67H19.5L10 76.5V10H86V67Z" fill="#4C525C" />
                </svg></> : <>
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M86 0.5H10C4.775 0.5 0.5 4.775 0.5 10V95.5L19.5 76.5H86C91.225 76.5 95.5 72.225 95.5 67V10C95.5 4.775 91.225 0.5 86 0.5ZM86 67H19.5L10 76.5V10H86V67Z" fill="#B4B7BB" />
                </svg>
            </>}
            <p className="mt-[16px] text-[#747881] text-center">
                {title}
            </p>
        </div>
    </>
}

export default NotFound;
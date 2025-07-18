import useUser from "@/store/useUser";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const AuthChecker = ({children}: { children: React.ReactNode }) => {
    const user = useUser(state => state.user);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    if (!user) {
        router.replace("/login");
        return;
    }

    return (
        <>{children}</>
    );
};

export default AuthChecker;
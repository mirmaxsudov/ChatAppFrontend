import {create} from "zustand";
import JwtResponse from "@/type/jwt/JwtResponse";
import Cookies from "js-cookie";

type UserZustandType = {
    user: JwtResponse | null;
    setUser: (user: JwtResponse) => void;
    clearUser: () => void;
}

const useUser = create<UserZustandType>((set, get) => {
    return {
        user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
        setUser: (user) => {
            set({user: {...user}});
            Cookies.set("user", JSON.stringify(user), {secure: true, sameSite: "lax"});
            Cookies.set("token", user.accessToken, {secure: true, sameSite: "lax"});
        },
        clearUser: () => {
            set({user: null});
            Cookies.remove("user");
        }
    };
})

export default useUser;
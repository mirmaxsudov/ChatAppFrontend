import UserRole from "@/enums/UserRole";

interface JwtResponse {
    id: number,
    email: string,
    firstname: string,
    lastname: string,
    bio: string,
    username: string,
    role: UserRole,
    accessToken: string
}

export default JwtResponse;
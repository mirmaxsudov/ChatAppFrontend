import {ApiResponse} from "@/type/response/ApiResponse";
import JwtResponse from "@/type/jwt/JwtResponse";
import $api from "@/api/request";

const BASE_URL: string = "/api/v1/auth";

const login = async (email: string, password: string): Promise<ApiResponse<JwtResponse>> => {
    const response = await $api.post(BASE_URL + "/login", null, {
        params: {
            email, password
        }
    });
    return response.data;
}

export {login};
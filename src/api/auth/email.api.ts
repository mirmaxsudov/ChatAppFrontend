import {ApiResponse} from "@/type/response/ApiResponse";
import $api from "@/api/request";
import JwtResponse from "@/type/jwt/JwtResponse";

const BASE_URL: string = "/api/v1/email";

const sendVerificationCode = async (email: string, password: string): Promise<ApiResponse<string>> => {
    const response = await $api.post<ApiResponse<string>>(BASE_URL + "/send", null, {
        params: {
            email, password
        }
    });
    return response.data;
}

const verifyCode = async (email: string, code: string, password: string): Promise<ApiResponse<string>> => {
    const response = await $api.post<ApiResponse<string>>(BASE_URL + "/verify", null, {
        params: {
            email, code, password
        }
    });
    return response.data;
}

const lastStep = async (email: string, code: string, password: string, firstname: string, lastname: string): Promise<ApiResponse<JwtResponse>> => {
    const response = await $api.post<ApiResponse<JwtResponse>>(BASE_URL + "/last-step", null, {
        params: {
            email, code, password, firstname, lastname
        }
    });
    return response.data;
}

export {sendVerificationCode, verifyCode, lastStep};
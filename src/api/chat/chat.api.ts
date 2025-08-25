import { ApiResponse } from "@/type/response/ApiResponse";
import $api from '@/api/request';

const BASE_URL: string = "/api/v1/chat";

const newStartChat = async (targetUserId: number, message: string): Promise<ApiResponse<string>> => {
    const response = await $api.post<ApiResponse<string>>(BASE_URL + "/new-start-chat", null, {
        params: {
            targetUserId, message
        }
    })
    return response.data;
}

export { newStartChat };
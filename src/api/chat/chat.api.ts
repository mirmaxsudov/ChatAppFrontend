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

const sendMessage = async (chatId: number, message: string): Promise<ApiResponse<string>> => {
    const response = await $api.post<ApiResponse<string>>(BASE_URL + "/send-message", null, {
        params: {
            chatId,
            message
        }
    });
    return response.data;
}

const readMessages = async (chatId: number, lastReadMessageSeq: number): Promise<ApiResponse<string>> => {
    const response = await $api.post<ApiResponse<string>>(BASE_URL + `/read/${chatId}`, undefined, {
        params: {
            lastReadMessageSeq
        }
    });
    return response.data;
}

export { newStartChat, sendMessage, readMessages };

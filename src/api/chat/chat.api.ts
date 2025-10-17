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

const sendMessage = async (chatId: number, message: string, attachmentIds: number[]): Promise<ApiResponse<string>> => {
    const response = await $api.post<ApiResponse<string>>(BASE_URL + "/send-message", attachmentIds, {
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

const updateMessage = async (chatId: number, messageId: number, text: string): Promise<ApiResponse<string>> => {
    const response = await $api.patch(BASE_URL + "/update/" + chatId + "/" + messageId, undefined, {
        params: {
            text
        }
    });
    return response.data;
}

export { newStartChat, sendMessage, readMessages, updateMessage };
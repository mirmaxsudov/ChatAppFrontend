import $api from "@/api/request";
import {ApiResponse} from "@/type/response/ApiResponse";
import {UserForNewChatType} from "@/type/user/UserType";

const BASE_URL: string = "/api/v1/user";

const getUserForNewChat = async (query: string): Promise<ApiResponse<UserForNewChatType[]>> => {
    const response = await $api.get<Promise<ApiResponse<UserForNewChatType[]>>>(BASE_URL + "/users-for-new-chat", {
        params: {
            query
        }
    });
    return response.data;
}

export {getUserForNewChat};
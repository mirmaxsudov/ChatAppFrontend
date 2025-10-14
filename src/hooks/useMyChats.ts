import { useQuery } from "@tanstack/react-query";
import $api from '@/api/request';
import { ApiResponse } from "@/type/response/ApiResponse";
import { MyChatResponse } from "@/type/chat/chat";

async function fetchMyChats(): Promise<ApiResponse<MyChatResponse>> {
    const response = await $api.get<ApiResponse<MyChatResponse>>("/api/v1/chat/get-all-my-chats");
    return response.data;
}

export function useMyChats() {
    return useQuery({
        queryKey: ["my-chats"],
        queryFn: fetchMyChats,
        select: (data) => data.data,
    });
}
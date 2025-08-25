import { useQuery } from "@tanstack/react-query";
import $api from '@/api/request';
import { ChatSummary } from '@/type/chat/chat';
import { ApiResponse } from "@/type/response/ApiResponse";

async function fetchMyChats(): Promise<ApiResponse<ChatSummary[]>> {
    const response = await $api.get<ApiResponse<ChatSummary[]>>("/api/v1/chat/get-all-my-chats");
    return response.data;
}

export function useMyChats() {
    return useQuery({
        queryKey: ["my-chats"],
        queryFn: fetchMyChats,
        select: (data) => data.data
    });
}
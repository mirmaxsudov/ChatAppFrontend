import $api from '@/api/request';
import { MessageResponse } from '@/type/chat/message';
import { PageApiResponse } from '@/type/response/PageApiResponse';
import { useQuery } from '@tanstack/react-query';

const BASE_URL: string = "/api/v1/chat";

async function fetchMyMessages(chatId: number, size: number, page: number): Promise<PageApiResponse<MessageResponse[]>> {
    const response = await $api.get<PageApiResponse<MessageResponse[]>>(BASE_URL + "/get-messages/" + chatId, {
        params: {
            size: 1000,
            page: 0
        }
    });
    return response.data;
}

export function useMyMessages(chatId: number, size: number = 1000, page: number = 0) {
    return useQuery({
        queryKey: ["my-messages-" + chatId],
        queryFn: () => fetchMyMessages(chatId, size, page),
        select: (data) => data
    })
}
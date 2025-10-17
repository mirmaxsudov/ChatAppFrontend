import { ApiResponse } from "@/type/response/ApiResponse";
import $api from '@/api/request';

const BASE_ATTACHMENT_URL: string = "/api/v1/attachments/";

const uploadAttachment = async (file: File | Blob): Promise<ApiResponse<number>> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await $api.post<ApiResponse<number>>(BASE_ATTACHMENT_URL + "upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
}

const uploadAttachments = async (files: File[] | Blob[] | [File | Blob]): Promise<ApiResponse<number[]>> => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append("files", file);
    });

    const response = await $api.post<ApiResponse<number[]>>(
        BASE_ATTACHMENT_URL + "uploads",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

const deleteById = async (attachmentId: number): Promise<void> => {
    await $api.delete(BASE_ATTACHMENT_URL + attachmentId);
}

export { uploadAttachment, uploadAttachments, deleteById };
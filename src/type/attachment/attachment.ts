import { AttachmentTypeEnum } from "@/enums/AttachmentTypeEnum";

export type AttachmentResponse = {
    id: number,
    fileName: string,
    url: string,
    downloadUrl: string,
    fileSize: number,
    type: AttachmentTypeEnum,
}
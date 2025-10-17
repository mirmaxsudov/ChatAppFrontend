import { AttachmentResponse } from "./attachment"

export type MessageAttachmentResponse = {
    id: number,
    position: number,
    attachment: AttachmentResponse
}
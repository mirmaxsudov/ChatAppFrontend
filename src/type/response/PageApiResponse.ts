export interface PageApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    total: number,
    page: number,
    size: number,
}
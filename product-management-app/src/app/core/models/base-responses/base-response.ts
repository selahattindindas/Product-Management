export interface BaseResponse<T> {
    statusCode?: number;
    statusMessage?: string;
    data: T;
    totalCount: number;
}
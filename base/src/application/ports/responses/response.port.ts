export interface ResponseModel<T> {
    data: T;
    status: string;
    statusCode: number;
}

export interface ResponseHandler {
    response<T>(status: string, statusCode: number, body: T): Promise<ResponseModel<T>>;
}

import {AxiosError} from "axios";

export type IHttpOptions = {
    params?: {[param: string]: any};
    headers?: {[header: string]: any};
    withCredentials?: boolean;
    auth?: {username: string, password: string};
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
};

export type HttpResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: {[header: string]: any};
};

export type KnownHttpError = AxiosError;

export interface IHttpAdapter{
    get<T>(url: string, options?: IHttpOptions): Promise<HttpResponse<T>>;
    post<T>(url: string, data: any, options?: IHttpOptions): Promise<HttpResponse<T>>;
    put<T>(url: string, data: any, options?: IHttpOptions): Promise<HttpResponse<T>>;
    patch<T>(url: string, data: any, options?: IHttpOptions): Promise<HttpResponse<T>>;
    delete<T>(url: string, options?: IHttpOptions): Promise<HttpResponse<T>>;
    isKnownFormatError(err: any): boolean
}

import {IHttpAdapter, IHttpOptions, HttpResponse} from "../../../application/ports/adapters/http.adapter.port";
import axios, {AxiosInstance} from "axios";

export class HttpAdapter implements IHttpAdapter{
    private axiosInstance: AxiosInstance;
    constructor(baseURL?: string) {
        this.axiosInstance = axios.create(baseURL ? {baseURL} : undefined);
    }

    async delete<T>(url: string, options?: IHttpOptions): Promise<HttpResponse<T>> {
        try {
            return await this.axiosInstance.delete<T>(url, options);
        }catch(err){
            return err.response;
        }
    }

    async get<T>(url: string, options?: IHttpOptions): Promise<HttpResponse<T>> {
        try {
            return await this.axiosInstance.get<T>(url, options);
        }catch(err){
            return err.response;
        }
    }

    async patch<T>(url: string, data: any, options?: IHttpOptions): Promise<HttpResponse<T>> {
        try {
            return await this.axiosInstance.patch<T>(url, data, options);
        }catch(err){
            return err.response;
        }
    }

    async post<T>(url: string, data: any, options?: IHttpOptions): Promise<HttpResponse<T>> {
        try {
            return await this.axiosInstance.post<T>(url, data, options);
        }catch(err){
            return err.response;
        }
    }

    async put<T>(url: string, data: any, options?: IHttpOptions): Promise<HttpResponse<T>> {
        try {
            return await this.axiosInstance.put<T>(url, data, options);
        }catch(err){
            return err.response;
        }
    }

    isKnownFormatError(err: any): boolean {
        return axios.isAxiosError(err);
    }

}

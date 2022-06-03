export interface RequestModel<Body = any, Params = any, Query = any, Headers = any, File = any, Files = any> {
    body?: Body;
    params?: Params;
    query?: Query;
    headers?: Headers;
    file?: File;
    files?: Files;
}

export interface MiddlewareRequestModel extends RequestModel {
    method?: string;
}





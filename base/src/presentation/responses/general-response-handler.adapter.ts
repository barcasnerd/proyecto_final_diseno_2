import { ResponseHandler, ResponseModel } from '../../application/ports/responses/response.port';

export class GeneralResponseHandler implements ResponseHandler {
    async response<T>(status: string, statusCode: number, body: T): Promise<ResponseModel<T>> {
        return {
            status,
            statusCode,
            data: body
        }
    }
}

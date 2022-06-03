import { RequestModel } from '../requests/request.port';
import { ResponseModel } from '../responses/response.port';

export type ControllerAction = (request: RequestModel) => Promise<ResponseModel<any>>;

export interface Controller {
    [name: string]: ControllerAction | unknown;
}

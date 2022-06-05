import {BankCreateInput, BankUpdateInput} from "../../entities/schemas/types";
import {Controller, ControllerAction} from "../../application/ports/controllers/controller.port";
import {BankUseCase} from "../../application/use-cases/bank.use-case";
import {RequestModel} from "../../application/ports/requests/request.port";
import {ResponseHandler, ResponseModel} from "../../application/ports/responses/response.port";
import {Bank} from "../../entities/models/bank.model.entity";
import {successStatus} from "../../common/helpers/error-description.helper";

export type BankCreateRequestInput = BankCreateInput;
export type BankUpdateRequestInput = BankUpdateInput;
export type BankParamsRequestInput = {
    id: number;
}

export class BankController implements Controller {
    public static instance: BankController;

    [name: string]: ControllerAction | unknown;

    constructor(
        private readonly bankUseCase: BankUseCase,
        private readonly responseHandler: ResponseHandler,
    ) {
        BankController.instance = this;
    }

    async create(request: RequestModel<BankCreateRequestInput>): Promise<ResponseModel<Bank>> {
        try {
            // validate request body
            if (!request.body || Object.keys(request.body).length === 0) {
                throw new Error("body not provided");
            }
            // call use case
            const bank = await BankController.instance.bankUseCase.create(request.body);
            return await BankController.instance.responseHandler.response(successStatus, 201, bank);
        } catch (e) {
            return await BankController.instance.errorHandler(e);
        }
    }

    async delete(request: RequestModel<BankParamsRequestInput>): Promise<ResponseModel<Bank | undefined>> {
        try {
            // validate params
            if (request.params?.id === undefined) {
                throw new Error("id not provided");
            }
            // call use case
            const bank = await BankController.instance.bankUseCase.delete(request.params?.id);
            return await BankController.instance.responseHandler.response(successStatus, 200, bank);
        } catch (e) {
            return await BankController.instance.errorHandler(e);
        }
    }

    async update(request: RequestModel<BankUpdateRequestInput, BankParamsRequestInput>): Promise<ResponseModel<Bank | undefined>> {
        try {
            // validate params
            if (request.params?.id === undefined) {
                throw new Error("id not provided");
            }
            // validate request body
            if (!request.body || Object.keys(request.body).length === 0) {
                throw new Error("body not provided");
            }
            // call use case
            const bank = await BankController.instance.bankUseCase.update(request.params?.id, request.body);
            return await BankController.instance.responseHandler.response(successStatus, 200, bank);
        } catch (e) {
            return await BankController.instance.errorHandler(e);
        }
    }

    async getById(request: RequestModel<BankParamsRequestInput>): Promise<ResponseModel<Bank | undefined>> {
        try {
            // validate params
            if (request.params?.id === undefined) {
                throw new Error("id not provided");
            }
            // call use case
            const bank = await BankController.instance.bankUseCase.getById(request.params?.id);
            return await BankController.instance.responseHandler.response(successStatus, 200, bank);
        } catch (e) {
            return await BankController.instance.errorHandler(e);
        }
    }

    async getAll(): Promise<ResponseModel<Bank[]>> {
        try {
            // call use case
            const banks = await BankController.instance.bankUseCase.getAll();
            return await BankController.instance.responseHandler.response(successStatus, 200, banks);
        } catch (e) {
            return await BankController.instance.errorHandler(e);
        }
    }

    /**
     * manages multiple error responses
     * @param error
     * @private
     */
    private async errorHandler(error: any): Promise<ResponseModel<any>> {
        let code: number = 400;
        let errorMessage = error.message
        if (errorMessage.toLowerCase().includes("not found") || errorMessage.toLowerCase().includes("does not exist") || errorMessage.toLowerCase().includes("doesn't exist")) {
            code = 404;
        } else if (errorMessage.includes("la sintaxis de entrada no es válida para tipo")) {
            code = 400;
            errorMessage = "some param or params does not have correct type"
        } else if (errorMessage.includes("duplicate key value violates")) {
            code = 400;
            errorMessage = "bank with same name already exist"
        } else if (error._status === 401) {
            code = 401;
            errorMessage = error._rawErrorMessage
        } else if (errorMessage.toLowerCase().includes("cannot read properties of undefined") || errorMessage.toLowerCase().includes("cannot read") || errorMessage.toLowerCase().includes("cannot read properties")) {
            code = 500;
        }
        return await BankController.instance.responseHandler.response("error", code, errorMessage)
    }


}

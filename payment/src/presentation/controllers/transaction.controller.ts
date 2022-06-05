import {TransactionCreateInput} from "../../entities/schemas/types";
import {Controller, ControllerAction} from "../../application/ports/controllers/controller.port";
import {TransactionUseCase} from "../../application/use-cases/transaction.use-case";
import {ResponseHandler, ResponseModel} from "../../application/ports/responses/response.port";
import {RequestModel} from "../../application/ports/requests/request.port";
import {Card} from "../../entities/models/card.model.entity";
import {successStatus} from "../../common/helpers/error-description.helper";
import {CardCreateRequestInput} from "./card.controller";
import {Transaction} from "../../entities/models/transaction.entity";
import {Bank} from "../../entities/models/bank.model.entity";

export type TransactionCreateRequestInput = TransactionCreateInput;
export type TransactionParamsRequestInput = { id: number };

export class TransactionController implements Controller {
    public static instance: TransactionController;

    [name: string]: ControllerAction | unknown;

    constructor(
        private readonly transactionUseCase: TransactionUseCase,
        private readonly responseHandler: ResponseHandler,
    ) {
        TransactionController.instance = this;
    }

    async create(request: RequestModel<TransactionCreateRequestInput>): Promise<ResponseModel<Transaction>> {
        try {
            // validate request body
            if (!request.body || Object.keys(request.body).length === 0) {
                throw new Error("body not provided");
            }
            // call use case
            const transaction = await TransactionController.instance.transactionUseCase.create(request.body);
            return await TransactionController.instance.responseHandler.response(successStatus, 201, transaction);
        } catch (e) {
            return await TransactionController.instance.errorHandler(e);
        }
    }

    async getAll(): Promise<ResponseModel<Transaction[]>> {
        try {
            // call use case
            const transactions = await TransactionController.instance.transactionUseCase.getAll();
            return await TransactionController.instance.responseHandler.response(successStatus, 200, transactions);
        } catch (e) {
            return await TransactionController.instance.errorHandler(e);
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
        } else if (errorMessage.includes("balance service not available")) {
            code = 503;
            errorMessage = "balance service not available"
        } else if (error._status === 401) {
            code = 401;
            errorMessage = error._rawErrorMessage
        } else if (errorMessage.toLowerCase().includes("cannot read properties of undefined") || errorMessage.toLowerCase().includes("cannot read") || errorMessage.toLowerCase().includes("cannot read properties")) {
            code = 500;
        }
        return await TransactionController.instance.responseHandler.response("error", code, errorMessage)
    }

}

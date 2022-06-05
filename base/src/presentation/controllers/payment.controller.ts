import {PaymentCreateInput, PaymentUpdateInput} from "../../entities/schemas/types";
import {Controller, ControllerAction} from "../../application/ports/controllers/controller.port";
import {PaymentUseCase} from "../../application/use-cases/payment.use-case";
import {ResponseHandler, ResponseModel} from "../../application/ports/responses/response.port";
import {RequestModel} from "../../application/ports/requests/request.port";
import {Bank} from "../../entities/models/bank.model.entity";
import {successStatus} from "../../common/helpers/error-description.helper";
import {BankCreateRequestInput, BankParamsRequestInput, BankUpdateRequestInput} from "./bank.controller";
import {Payment} from "../../entities/models/payment.model.entity";

export type PaymentCreateRequestInput = PaymentCreateInput;
export type PaymentUpdateRequestInput = PaymentUpdateInput;
export type PaymentParamsRequestInput = {
    id: number;
}

export class PaymentController implements Controller {
    private static instance: PaymentController;

    [name: string]: ControllerAction | unknown;

    constructor(
        private readonly paymentUseCase: PaymentUseCase,
        private readonly responseHandler: ResponseHandler,
    ) {
        PaymentController.instance = this;
    }

    async create(request: RequestModel<PaymentCreateRequestInput>): Promise<ResponseModel<Payment>> {
        try {
            // validate request body
            if (!request.body || Object.keys(request.body).length === 0) {
                throw new Error("body not provided");
            }
            // call use case
            const payment = await PaymentController.instance.paymentUseCase.create(request.body);
            return await PaymentController.instance.responseHandler.response(successStatus, 201, payment);
        } catch (e) {
            return await PaymentController.instance.errorHandler(e);
        }
    }

    async update(request: RequestModel<PaymentUpdateRequestInput, PaymentParamsRequestInput>): Promise<ResponseModel<Payment | undefined>> {
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
            const payment = await PaymentController.instance.paymentUseCase.update(request.params?.id, request.body);
            return await PaymentController.instance.responseHandler.response(successStatus, 200, payment);
        } catch (e) {
            return await PaymentController.instance.errorHandler(e);
        }
    }

    async getById(request: RequestModel<PaymentParamsRequestInput>): Promise<ResponseModel<Payment | undefined>> {
        try {
            // validate params
            if (request.params?.id === undefined) {
                throw new Error("id not provided");
            }
            // call use case
            const payment = await PaymentController.instance.paymentUseCase.getById(request.params?.id);
            return await PaymentController.instance.responseHandler.response(successStatus, 200, payment);
        } catch (e) {
            return await PaymentController.instance.errorHandler(e);
        }
    }

    async getAll(): Promise<ResponseModel<Payment[]>> {
        try {
            // call use case
            const payments = await PaymentController.instance.paymentUseCase.getAll();
            return await PaymentController.instance.responseHandler.response(successStatus, 200, payments);
        } catch (e) {
            return await PaymentController.instance.errorHandler(e);
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
        return await PaymentController.instance.responseHandler.response("error", code, errorMessage)
    }

}

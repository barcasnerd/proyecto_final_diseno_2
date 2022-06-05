import {CardCreateInput, CardUpdateInput} from "../../entities/schemas/types";
import {Controller, ControllerAction} from "../../application/ports/controllers/controller.port";
import {CardUseCase} from "../../application/use-cases/card.use-case";
import {ResponseHandler, ResponseModel} from "../../application/ports/responses/response.port";
import {RequestModel} from "../../application/ports/requests/request.port";
import {Bank} from "../../entities/models/bank.model.entity";
import {successStatus} from "../../common/helpers/error-description.helper";
import {BankCreateRequestInput, BankParamsRequestInput, BankUpdateRequestInput} from "./bank.controller";
import {Card} from "../../entities/models/card.model.entity";

export type CardCreateRequestInput = CardCreateInput;
export type CardUpdateRequestInput = CardUpdateInput;
export type CardParamsRequestInput = {
    id: number;
}

export class CardController implements Controller {
    public static instance: CardController;

    [name: string]: ControllerAction | unknown;

    constructor(
        private readonly cardUseCase: CardUseCase,
        private readonly responseHandler: ResponseHandler,
    ) {
        CardController.instance = this;
    }

    async create(request: RequestModel<CardCreateRequestInput>): Promise<ResponseModel<Card>> {
        try {
            // validate request body
            if (!request.body || Object.keys(request.body).length === 0) {
                throw new Error("body not provided");
            }
            // call use case
            const card = await CardController.instance.cardUseCase.create(request.body);
            return await CardController.instance.responseHandler.response(successStatus, 201, card);
        } catch (e) {
            return await CardController.instance.errorHandler(e);
        }
    }

    async getById(request: RequestModel<CardParamsRequestInput>): Promise<ResponseModel<Card | undefined>> {
        try {
            // validate params
            if (request.params?.id === undefined) {
                throw new Error("id not provided");
            }
            // call use case
            const card = await CardController.instance.cardUseCase.getById(request.params?.id);
            return await CardController.instance.responseHandler.response(successStatus, 200, card);
        } catch (e) {
            return await CardController.instance.errorHandler(e);
        }
    }

    async getBalance(request: RequestModel<CardParamsRequestInput>): Promise<ResponseModel<number>> {
        try {
            // validate params
            if (request.params?.id === undefined) {
                throw new Error("id not provided");
            }
            // call use case
            const balance = await CardController.instance.cardUseCase.getBalance(request.params?.id);
            return await CardController.instance.responseHandler.response(successStatus, 200, balance);
        } catch (e) {
            return await CardController.instance.errorHandler(e);
        }
    }

    async update(request: RequestModel<CardUpdateRequestInput, CardParamsRequestInput>): Promise<ResponseModel<Card | undefined>> {
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
            const card = await CardController.instance.cardUseCase.update(request.params?.id, request.body);
            return await CardController.instance.responseHandler.response(successStatus, 200, card);
        } catch (e) {
            return await CardController.instance.errorHandler(e);
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
        }else if (errorMessage.includes("balance service not available")) {
            code = 503;
            errorMessage = "balance service not available"
        } else if (error._status === 401) {
            code = 401;
            errorMessage = error._rawErrorMessage
        } else if (errorMessage.toLowerCase().includes("cannot read properties of undefined") || errorMessage.toLowerCase().includes("cannot read") || errorMessage.toLowerCase().includes("cannot read properties")) {
            code = 500;
        }
        return await CardController.instance.responseHandler.response("error", code, errorMessage)
    }


}

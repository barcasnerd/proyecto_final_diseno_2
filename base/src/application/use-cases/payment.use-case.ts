import {IPaymentUseCase} from "../../entities/use-cases/payment.use-case.entity";
import {IPaymentRepository} from "../ports/repositories/payment.repository";
import {PaymentCreateInput, PaymentUpdateInput, TransactionCreateInput} from "../../entities/schemas/types";
import {Payment} from "../../entities/models/payment.model.entity";
import {InputType} from "../../common/input/common";
import {ValidationResult} from "joi";
import {
    PaymentCreateInputSchema,
    PaymentUpdateInputSchema
} from "../../entities/schemas/definitions/bank.schema.entity";
import axios from "axios";
import {APP_VARIABLES} from "../../common/helpers/initial.config";
import {CardTypeEnum} from "../../entities/models/card.model.entity";
import {TransactionStatusEnum} from "../../entities/models/transaction.entity";

export class PaymentUseCase implements IPaymentUseCase {

    constructor(
        private readonly paymentRepository: IPaymentRepository
    ) {
    }

    create(input: PaymentCreateInput): Promise<Payment>;
    create<T>(input: PaymentCreateInput, transactionManager: T): Promise<Payment>;
    async create(input: PaymentCreateInput, transactionManager?: any): Promise<Payment> {
        // input validation
        this.validateInput(input, InputType.CREATE);
        // save payment
        let payment: Payment | undefined;
        const operationTransaction = async (manager: any) => {
            payment = await this.paymentRepository.create(input, manager);
            // TODO: call payment service to create transaction
            try {
                const url = `${APP_VARIABLES.PING}`
                let data: TransactionCreateInput = {
                    bankId: payment.bankId,
                    cardId: payment.cardId,
                    creditLapses: (payment.creditLapses !== undefined && payment.type === CardTypeEnum.CREDIT) ? payment.creditLapses : undefined,
                    franchise: payment.franchise,
                    ownerId: payment.ownerId,
                    reference: payment.id,
                    total: payment.total,
                    type: payment.type
                }
                let paymentGatewayRequest = await axios.post(url, data);
                if (paymentGatewayRequest.data.data.status === TransactionStatusEnum.APPROVED) {
                    payment = await this.paymentRepository.update(payment.id, {transactionStatus: TransactionStatusEnum.APPROVED}, transactionManager);
                }
            } catch (error: any) {
                console.log(error.message);
            }
        }
        if (transactionManager) {
            await operationTransaction(transactionManager);
        } else {
            await this.paymentRepository.transaction(operationTransaction);
        }
        return payment!;
    }

    async getAll(): Promise<Payment[]> {
        return await this.paymentRepository.getAll();
    }

    async getById(id: number): Promise<Payment | undefined> {
        let payment = await this.paymentRepository.getById(id);
        if (payment === undefined) throw new Error("payment not found");
        return payment;
    }

    update(id: number, input: PaymentUpdateInput): Promise<Payment | undefined>;
    update<T>(id: number, input: PaymentUpdateInput, transactionManager: T): Promise<Payment | undefined>;
    async update(id: number, input: PaymentUpdateInput, transactionManager?: any): Promise<Payment | undefined> {
        // validate input
        this.validateInput(input, InputType.UPDATE);
        // validate payment existence
        let payment = await this.paymentRepository.getById(id);
        if (payment === undefined) throw new Error("payment not found");
        // save changes
        if (transactionManager) {
            payment = await this.paymentRepository.update(id, input, transactionManager);
        } else {
            payment = await this.paymentRepository.update(id, input);
        }
        return payment;
    }

    validateInput(input: any, type: InputType): void {
        let result: ValidationResult<any> | undefined;
        if (type === InputType.CREATE) {
            result = PaymentCreateInputSchema.validate(input);
        } else if (type === InputType.UPDATE) {
            result = PaymentUpdateInputSchema.validate(input);
        } else {
            throw new Error("invalid validation type");
        }
        if (result.error) {
            throw new Error(result.error.message);
        }
    }

}

import {ITransactionUseCase} from "../../entities/use-cases/transaction.use-case.entity";
import {TransactionCreateInput} from "../../entities/schemas/types";
import {Transaction, TransactionStatusEnum} from "../../entities/models/transaction.entity";
import {ICardRepository} from "../ports/repositories/card.repository";
import {IBankRepository} from "../ports/repositories/bank.repository";
import {ITransactionRepository} from "../ports/repositories/transaction.repository";
import {InputType} from "../../common/input/common";
import {ValidationResult} from "joi";
import {TransactionCreateInputSchema} from "../../entities/schemas/definitions/bank.schema.entity";
import {CardTypeEnum} from "../../entities/models/card.model.entity";

export class TransactionUseCase implements ITransactionUseCase {

    constructor(
        private readonly cardRepository: ICardRepository,
        private readonly bankRepository: IBankRepository,
        private readonly transactionRepository: ITransactionRepository,
    ) {
    }

    create(input: TransactionCreateInput): Promise<Transaction>;
    create<T>(input: TransactionCreateInput, transactionManager: T): Promise<Transaction>;
    async create(input: TransactionCreateInput, transactionManager?: any): Promise<Transaction> {
        let transaction: Transaction;
        try {
            // validate input
            this.validateInput(input, InputType.CREATE)
            // validate if bank exist
            const bank = await this.bankRepository.getById(input.bankId);
            if (bank === undefined) throw new Error("bank not found");
            // validate bank payment service
            if (bank.isPaymentServiceActive !== true) throw new Error("payment service not available")
            // validate card existence
            const card = await this.cardRepository.getById(input.cardId);
            if (card == undefined) throw new Error("card not found")
            //validate card status
            if (card.active !== true) throw new Error("selected payment method is not active")
            // validate bank, owner, franchise and type reference
            if (card.bank.id !== input.bankId || card.ownerId !== input.ownerId || card.franchise !== input.franchise || card.type !== input.type) throw new Error("payment method not found")
            //validate balance
            if (card.balance - input.total < 0) throw new Error("insufficient balance")
            // validate credit card lapses
            if (input.type === CardTypeEnum.CREDIT && input.creditLapses === undefined) {
                throw new Error("payment lapses not selected for credit card")
            } else if (input.type === CardTypeEnum.DEBIT && input.creditLapses !== undefined) {
                input.creditLapses = undefined;
            }
            // validate payment reference duplicated
            const duplicatedPayment = await this.transactionRepository.getAll()
                .then(transactions => transactions.find(el => (el.reference === input.reference && el.status === TransactionStatusEnum.APPROVED)));
            if (duplicatedPayment !== undefined) throw  new Error("payment was already approved")
            //execute transaction
            const operationTransaction = async (manager: any) => {
                transaction = await this.transactionRepository.create(input, manager);
                await this.cardRepository.update(card.id, {balance: card.balance - input.total})
            }
            if (transactionManager) {
                await operationTransaction(transactionManager);
            } else {
                await this.transactionRepository.transaction(operationTransaction);
            }
        } catch (error) {
            if (transactionManager) {
                transaction = await this.transactionRepository.createFailed({
                    reason: `${error.message !== undefined ? error.message : "unknown error"}`,
                    status: TransactionStatusEnum.REJECTED,
                    reference: input.reference !== undefined ? input.reference : undefined
                }, transactionManager)
            } else {
                transaction = await this.transactionRepository.createFailed({
                    reason: `${error.message !== undefined ? error.message : "unknown error"}`,
                    status: TransactionStatusEnum.REJECTED,
                    reference: input.reference !== undefined ? input.reference : undefined
                })
            }
        }
        // TODO: Send transaction status for the payment base application connector
        console.log("sending transaction via HTTP connector...")
        return transaction!;
    }

    async getAll(): Promise<Transaction[]> {
        return await this.transactionRepository.getAll();
    }

    validateInput(input: any, type: InputType): void {
        let result: ValidationResult<any> | undefined;
        if (type === InputType.CREATE) {
            result = TransactionCreateInputSchema.validate(input);
        } else if (type === InputType.UPDATE) {
            result = TransactionCreateInputSchema.validate(input);
        } else {
            throw new Error("invalid validation type");
        }
        if (result.error) {
            throw new Error(result.error.message);
        }
    }

}

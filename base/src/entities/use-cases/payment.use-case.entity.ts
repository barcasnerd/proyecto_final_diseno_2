import {PaymentCreateInput, PaymentUpdateInput, TransactionCreateInput} from "../schemas/types";
import {Transaction} from "../models/transaction.entity";
import {Payment} from "../models/payment.model.entity";

export interface IPaymentUseCase {
    create(input: PaymentCreateInput): Promise<Payment>;
    create<T>(input: PaymentCreateInput, transactionManager: T): Promise<Payment>;

    update(id: number, input: PaymentUpdateInput): Promise<Payment | undefined>;
    update<T>(id: number, input: PaymentUpdateInput, transactionManager: T): Promise<Payment | undefined>;

    getAll(): Promise<Payment[]>;

    getById(id: number): Promise<Payment | undefined>;
}

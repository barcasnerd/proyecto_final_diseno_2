import {IRepository} from "./repository.port";
import {PaymentCreateInput, PaymentUpdateInput} from "../../../entities/schemas/types";
import {Payment} from "../../../entities/models/payment.model.entity";

export interface IPaymentRepository extends IRepository {
    create(input: PaymentCreateInput): Promise<Payment>;
    create<T>(input: PaymentCreateInput, transactionManager: T): Promise<Payment>;

    update(id: number, input: PaymentUpdateInput): Promise<Payment | undefined>;
    update<T>(id: number, input: PaymentUpdateInput, transactionManager: T): Promise<Payment | undefined>;

    getAll(): Promise<Payment[]>;

    getById(id: number): Promise<Payment | undefined>;
}

import {IRepository} from "./repository.port";
import {
    TransactionCreateInput,
    TransactionFailedCreateInput,
    TransactionUpdateInput
} from "../../../entities/schemas/types";
import {Transaction} from "../../../entities/models/transaction.entity";

export interface ITransactionRepository extends IRepository{
    create(input: TransactionCreateInput): Promise<Transaction>;
    create<T>(input: TransactionCreateInput, transactionManager: T): Promise<Transaction>;

    createFailed(input: TransactionFailedCreateInput): Promise<Transaction>;
    createFailed<T>(input: TransactionFailedCreateInput, transactionManager: T): Promise<Transaction>;

    update(id: number, input: TransactionUpdateInput): Promise<Transaction | undefined>;
    update<T>(id: number, input: TransactionUpdateInput, transactionManager: T): Promise<Transaction | undefined>;

    getAll(): Promise<Transaction[]>;
}

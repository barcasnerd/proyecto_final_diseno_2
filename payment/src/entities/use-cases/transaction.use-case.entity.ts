import {TransactionCreateInput} from "../schemas/types";
import {Transaction} from "../models/transaction.entity";

export interface ITransactionUseCase {
    create(input: TransactionCreateInput): Promise<Transaction>;
    create<T>(input: TransactionCreateInput, transactionManager: T): Promise<Transaction>;

    getAll(): Promise<Transaction[]>;
}

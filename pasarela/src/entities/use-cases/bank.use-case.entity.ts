import {BankCreateInput, BankUpdateInput} from "../schemas/types";
import {Bank} from "../models/bank.model.entity";

export interface IBankUseCase {
    create(input: BankCreateInput): Promise<Bank>;
    create<T>(input: BankCreateInput, transactionManager: T): Promise<Bank>;

    update(id: number, input: BankUpdateInput): Promise<Bank | undefined>;
    update<T>(id: number, input: BankUpdateInput, transactionManager: T): Promise<Bank | undefined>;

    delete(id: number): Promise<Bank | undefined>;
    delete<T>(id: number, transactionManager: T): Promise<Bank | undefined>;

    getAll(): Promise<Array<Bank>>;

    getById(id:number): Promise<Bank | undefined>
}

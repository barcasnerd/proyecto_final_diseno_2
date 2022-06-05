import {IRepository} from "./repository.port";
import {BankCreateInput, BankUpdateInput} from "../../../entities/schemas/types";
import {Bank} from "../../../entities/models/bank.model.entity";

export interface IBankRepository extends IRepository{
    create(input: BankCreateInput): Promise<Bank>;
    create<T>(input: BankCreateInput, transactionManager: T): Promise<Bank>;

    update(id: number, input: BankUpdateInput): Promise<Bank | undefined>;
    update<T>(id: number, input: BankUpdateInput, transactionManager: T): Promise<Bank | undefined>;

    delete(id: number): Promise<Bank | undefined>;
    delete<T>(id: number, transactionManager: T): Promise<Bank | undefined>;

    getAll(): Promise<Array<Bank>>;

    getById(id:number): Promise<Bank | undefined>
}

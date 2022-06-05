import {IBankUseCase} from "../../entities/use-cases/bank.use-case.entity";
import {IBankRepository} from "../ports/repositories/bank.repository";
import {Bank} from "../../entities/models/bank.model.entity";
import {BankCreateInput, BankUpdateInput} from "../../entities/schemas/types";
import {InputType} from "../../common/input/common";
import {ValidationResult} from "joi";
import {BankCreateInputSchema, BankUpdateInputSchema} from "../../entities/schemas/definitions/bank.schema.entity";

export class BankUseCase implements IBankUseCase {

    constructor(
        private readonly bankRepository: IBankRepository
    ) {
    }

    create(input: BankCreateInput): Promise<Bank>;
    create<T>(input: BankCreateInput, transactionManager: T): Promise<Bank>;
    async create(input: BankCreateInput, transactionManager?: any): Promise<Bank> {
        // input validation
        this.validateInput(input, InputType.CREATE);
        // save bank
        let bank: Bank;
        if (transactionManager) {
            bank = await this.bankRepository.create(input, transactionManager);
        } else {
            bank = await this.bankRepository.create(input);
        }
        return bank;
    }

    delete(id: number): Promise<Bank | undefined>;
    delete<T>(id: number, transactionManager: T): Promise<Bank | undefined>;
    async delete(id: number, transactionManager?: any): Promise<Bank | undefined> {
        let bank = await this.bankRepository.getById(id);
        if (bank === undefined) {
            throw new Error("bank not found");
        }
        if (transactionManager) {
            bank = await this.bankRepository.delete(bank.id, transactionManager);
        } else {
            bank = await this.bankRepository.delete(bank.id)
        }
        return bank;
    }

    async getAll(): Promise<Array<Bank>> {
        return await this.bankRepository.getAll();
    }

    async getById(id: number): Promise<Bank | undefined> {
        let bank = await this.bankRepository.getById(id);
        if (bank === undefined) {
            throw new Error("bank not found");
        }
        return bank;
    }

    update(id: number, input: BankUpdateInput): Promise<Bank | undefined>;
    update<T>(id: number, input: BankUpdateInput, transactionManager: T): Promise<Bank | undefined>;
    async update(id: number, input: BankUpdateInput, transactionManager?: any): Promise<Bank | undefined> {
        // validate input
        this.validateInput(input, InputType.UPDATE);
        // validate bank existence
        let bank = await this.bankRepository.getById(id);
        if (bank === undefined) {
            throw new Error("bank not found");
        }
        if (transactionManager) {
            bank = await this.bankRepository.update(id, input, transactionManager);
        } else {
            bank = await this.bankRepository.update(id, input);
        }
        return bank;
    }

    validateInput(input: any, type: InputType): void {
        let result: ValidationResult<any> | undefined;
        if (type === InputType.CREATE) {
            result = BankCreateInputSchema.validate(input);
        } else if (type === InputType.UPDATE) {
            result = BankUpdateInputSchema.validate(input);
        } else {
            throw new Error("invalid validation type");
        }
        if (result.error) {
            throw new Error(result.error.message);
        }
    }

}

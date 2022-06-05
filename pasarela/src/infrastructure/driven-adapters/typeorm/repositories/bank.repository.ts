import {GeneralRepository} from "./general.repository";
import {IBankRepository} from "../../../../application/ports/repositories/bank.repository";
import {BankCreateInput, BankUpdateInput} from "../../../../entities/schemas/types";
import {Bank} from "../../../../entities/models/bank.model.entity";
import {Connection, EntityManager, Repository} from "typeorm";
import {BankEntity} from "../entities/bank.entity";
import {bankEntityToDomainBank} from "./common/helpers/transform-data-to-domain";

export class BankRepository extends GeneralRepository implements IBankRepository {

    private bankRepository: Repository<BankEntity>;

    constructor(connection: Connection) {
        super(connection);
        this.bankRepository = connection.getRepository(BankEntity);
    }

    create(input: BankCreateInput): Promise<Bank>;
    create<T>(input: BankCreateInput, transactionManager: T): Promise<Bank>;
    async create(input: BankCreateInput, transactionManager?: EntityManager): Promise<Bank> {
        let bank = new BankEntity(input.name);
        if (transactionManager) {
            await transactionManager.save(bank);
        } else {
            await this.bankRepository.save(bank);
        }
        return bankEntityToDomainBank(bank);
    }

    delete(id: number): Promise<Bank | undefined>;
    delete<T>(id: number, transactionManager: T): Promise<Bank | undefined>;
    async delete(id: number, transactionManager?: EntityManager): Promise<Bank | undefined> {
        const bank = await this.bankRepository.findOne(id);
        if (bank === undefined) {
            return undefined;
        }
        if (transactionManager) {
            await transactionManager.softRemove(bank);
        } else {
            await this.bankRepository.softRemove(bank);
        }
        return bankEntityToDomainBank(bank);
    }

    async getAll(): Promise<Array<Bank>> {
        const banks = await this.bankRepository.find();
        return banks.map(bank => bankEntityToDomainBank(bank));
    }

    async getById(id: number): Promise<Bank | undefined> {
        const bank = await this.bankRepository.findOne(id);
        if (bank === undefined) {
            return undefined;
        }
        return bankEntityToDomainBank(bank);
    }

    update(id: number, input: BankUpdateInput): Promise<Bank | undefined>;
    update<T>(id: number, input: BankUpdateInput, transactionManager: T): Promise<Bank | undefined>;
    async update(id: number, input: BankUpdateInput, transactionManager?: EntityManager): Promise<Bank | undefined> {
        const bank = await this.bankRepository.findOne(id);
        if (bank === undefined) {
            return undefined;
        }
        if (input.name !== undefined) {
            bank.name = input.name;
        }
        if (transactionManager) {
            await transactionManager.save(bank);
        } else {
            await this.bankRepository.save(bank);
        }
        return bankEntityToDomainBank(bank);
    }

}

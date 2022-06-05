import {GeneralRepository} from "./general.repository";
import {ITransactionRepository} from "../../../../application/ports/repositories/transaction.repository";
import {Connection, EntityManager, Repository} from "typeorm";
import {CardEntity} from "../entities/card.entity";
import {BankEntity} from "../entities/bank.entity";
import {TransactionEntity} from "../entities/transaction.entity";
import {
    TransactionCreateInput,
    TransactionFailedCreateInput,
    TransactionUpdateInput
} from "../../../../entities/schemas/types";
import {Transaction, TransactionStatusEnum} from "../../../../entities/models/transaction.entity";
import {transactionEntityToDomainTransaction} from "./common/helpers/transform-data-to-domain";

export class TransactionRepository extends GeneralRepository implements ITransactionRepository {

    private cardRepository: Repository<CardEntity>;
    private bankRepository: Repository<BankEntity>;
    private transactionRepository: Repository<TransactionEntity>;

    constructor(connection: Connection) {
        super(connection);
        this.cardRepository = connection.getRepository(CardEntity);
        this.bankRepository = connection.getRepository(BankEntity);
        this.transactionRepository = connection.getRepository(TransactionEntity);
    }

    create(input: TransactionCreateInput): Promise<Transaction>;
    create<T>(input: TransactionCreateInput, transactionManager: T): Promise<Transaction>;
    async create(input: TransactionCreateInput, transactionManager?: EntityManager): Promise<Transaction> {
        const bank = await this.bankRepository.findOne(input.bankId);
        const card = await this.cardRepository.findOne(input.cardId);
        let transaction = new TransactionEntity(
            TransactionStatusEnum.APPROVED,
            <BankEntity>bank,
            <CardEntity>card,
            input.reference,
            input.total,
            input.creditLapses
        )
        if (transactionManager) {
            await transactionManager.save(transaction);
        } else {
            await this.transactionRepository.save(transaction);
        }
        return transactionEntityToDomainTransaction(transaction);
    }

    createFailed(input: TransactionFailedCreateInput): Promise<Transaction>;
    createFailed<T>(input: TransactionFailedCreateInput, transactionManager: T): Promise<Transaction>;
    async createFailed(input: TransactionFailedCreateInput, transactionManager?: EntityManager): Promise<Transaction> {
        let transaction = new TransactionEntity(input.status, undefined, undefined, input.reference, undefined, undefined, undefined, input.reason);
        if (transactionManager) {
            await transactionManager.save(transaction);
        } else {
            await this.transactionRepository.save(transaction);
        }
        return transactionEntityToDomainTransaction(transaction);
    }

    async getAll(): Promise<Transaction[]> {
        return await this.transactionRepository.find({relations: ["bank", "card"]})
            .then(transactions => transactions.map(el => transactionEntityToDomainTransaction(el)));
    }

    update(id: number, input: TransactionUpdateInput): Promise<Transaction | undefined>;
    update<T>(id: number, input: TransactionUpdateInput, transactionManager: T): Promise<Transaction | undefined>;
    async update(id: number, input: TransactionUpdateInput, transactionManager?: EntityManager): Promise<Transaction | undefined> {
        let transaction = await this.transactionRepository.findOne(id, {relations: ["bank", "card"]});
        if (transaction === undefined) return undefined;
        if (input.pendingToSend !== undefined) transaction.pendingToSend = input.pendingToSend;
        if (transactionManager) {
            await transactionManager.save(transaction);
        } else {
            await this.transactionRepository.save(transaction);
        }
        return transactionEntityToDomainTransaction(transaction);

    }


}

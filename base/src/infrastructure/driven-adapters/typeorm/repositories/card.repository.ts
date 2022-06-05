import {GeneralRepository} from "./general.repository";
import {ICardRepository} from "../../../../application/ports/repositories/card.repository";
import {Connection, EntityManager, Repository} from "typeorm";
import {CardEntity} from "../entities/card.entity";
import {CardCreateInput, CardUpdateInput} from "../../../../entities/schemas/types";
import {Card} from "../../../../entities/models/card.model.entity";
import {BankEntity} from "../entities/bank.entity";
import {cardEntityToDomainCard} from "./common/helpers/transform-data-to-domain";

export class CardRepository extends GeneralRepository implements ICardRepository {

    private cardRepository: Repository<CardEntity>;
    private bankRepository: Repository<BankEntity>;

    constructor(connection: Connection) {
        super(connection);
        this.cardRepository = connection.getRepository(CardEntity);
        this.bankRepository = connection.getRepository(BankEntity);
    }

    create(input: CardCreateInput): Promise<Card>;
    create<T>(input: CardCreateInput, transactionManager: T): Promise<Card>;
    async create(input: CardCreateInput, transactionManager?: EntityManager): Promise<Card> {
        const bank = await this.bankRepository.findOne(input.bankId);
        let card = new CardEntity(input.ownerId, input.balance, input.franchise, input.type, <BankEntity>bank);
        if (transactionManager) {
            await transactionManager.save(card);
        } else {
            await this.cardRepository.save(card)
        }
        return cardEntityToDomainCard(card);
    }

    async getBalance(id: number): Promise<number> {
        return await this.cardRepository.findOne(id, {relations: ["bank"]}).then(card => card?.balance!);
    }

    async getById(id: number): Promise<Card | undefined> {
        const card = await this.cardRepository.findOne(id, {relations: ["bank"]});
        if (card === undefined) return undefined;
        return cardEntityToDomainCard(card);
    }

    update(id: number, input: CardUpdateInput): Promise<Card | undefined>;
    update<T>(id: number, input: CardUpdateInput, transactionManager: T): Promise<Card | undefined>;
    async update(id: number, input: CardUpdateInput, transactionManager?: EntityManager): Promise<Card | undefined> {
        let card = await this.cardRepository.findOne(id, {relations: ["bank"]});
        if (card === undefined) return undefined;
        if (input.balance !== undefined) card.balance = input.balance;
        if (input.active !== undefined) card.active = input.active;
        if (transactionManager) {
            await transactionManager.save(card)
        } else {
            await this.cardRepository.save(card)
        }
        return cardEntityToDomainCard(card);
    }

}

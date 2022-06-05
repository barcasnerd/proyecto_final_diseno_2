import {IRepository} from "./repository.port";
import {CardCreateInput, CardUpdateInput} from "../../../entities/schemas/types";
import {Card} from "../../../entities/models/card.model.entity";

export interface ICardRepository extends IRepository {
    create(input: CardCreateInput): Promise<Card>;
    create<T>(input: CardCreateInput, transactionManager: T): Promise<Card>;

    update(id: number, input: CardUpdateInput): Promise<Card | undefined>;
    update<T>(id: number, input: CardUpdateInput, transactionManager: T): Promise<Card | undefined>;

    getById(id: number): Promise<Card | undefined>

    getBalance(id: number): Promise<number>
}

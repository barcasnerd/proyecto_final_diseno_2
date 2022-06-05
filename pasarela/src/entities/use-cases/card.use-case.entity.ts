import {CardCreateInput, CardUpdateInput} from "../schemas/types";
import {Card} from "../models/card.model.entity";

export interface ICardUseCase {
    create(input: CardCreateInput): Promise<Card>;
    create<T>(input: CardCreateInput, transactionManager: T): Promise<Card>;

    update(id: number, input: CardUpdateInput): Promise<Card | undefined>;
    update<T>(id: number, input: CardUpdateInput, transactionManager: T): Promise<Card | undefined>;

    getById(id:number): Promise<Card | undefined>

    getBalance(id:number): Promise<number>
}

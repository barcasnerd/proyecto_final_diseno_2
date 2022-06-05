import {ICardUseCase} from "../../entities/use-cases/card.use-case.entity";
import {CardCreateInput, CardUpdateInput} from "../../entities/schemas/types";
import {IBankRepository} from "../ports/repositories/bank.repository";
import {ICardRepository} from "../ports/repositories/card.repository";
import {Card} from "../../entities/models/card.model.entity";
import {InputType} from "../../common/input/common";
import {ValidationResult} from "joi";
import {CardCreateInputSchema, CardUpdateInputSchema} from "../../entities/schemas/definitions/bank.schema.entity";

export class CardUseCase implements ICardUseCase {

    constructor(
        private readonly cardRepository: ICardRepository,
        private readonly bankRepository: IBankRepository
    ) {
    }

    create(input: CardCreateInput): Promise<Card>;
    create<T>(input: CardCreateInput, transactionManager: T): Promise<Card>;
    async create(input: CardCreateInput, transactionManager?: any): Promise<Card> {
        // input validation
        this.validateInput(input, InputType.CREATE);
        // validate if bank exist
        const bank = await this.bankRepository.getById(input.bankId);
        if (bank === undefined) throw new Error("bank not found");
        // save card
        let card: Card;
        if (transactionManager) {
            card = await this.cardRepository.create(input, transactionManager);
        } else {
            card = await this.cardRepository.create(input)
        }
        return card;
    }

    async getBalance(id: number): Promise<number> {
        const card = await this.cardRepository.getById(id);
        if (card == undefined) {
            throw new Error("card not found")
        }
        if (card.bank.isBalanceServiceActive !== true) {
            throw new Error("balance service not available")
        }
        return await this.cardRepository.getBalance(id);
    }

    async getById(id: number): Promise<Card | undefined> {
        const card = await this.cardRepository.getById(id);
        if (card == undefined) {
            throw new Error("card not found")
        }
        return card;
    }

    update(id: number, input: CardUpdateInput): Promise<Card | undefined>;
    update<T>(id: number, input: CardUpdateInput, transactionManager: T): Promise<Card | undefined>;
    async update(id: number, input: CardUpdateInput, transactionManager?: any): Promise<Card | undefined> {
        // input validation
        this.validateInput(input, InputType.UPDATE);
        // find the card
        let card = await this.cardRepository.getById(id);
        if (card == undefined) {
            throw new Error("card not found")
        }
        if (transactionManager) {
            card = await this.cardRepository.update(id, input, transactionManager);
        } else {
            card = await this.cardRepository.update(id, input);
        }
        return card;
    }

    validateInput(input: any, type: InputType): void {
        let result: ValidationResult<any> | undefined;
        if (type === InputType.CREATE) {
            result = CardCreateInputSchema.validate(input);
        } else if (type === InputType.UPDATE) {
            result = CardUpdateInputSchema.validate(input);
        } else {
            throw new Error("invalid validation type");
        }
        if (result.error) {
            throw new Error(result.error.message);
        }
    }

}

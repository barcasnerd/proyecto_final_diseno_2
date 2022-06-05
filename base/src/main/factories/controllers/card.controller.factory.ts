import {CardUseCase} from "../../../application/use-cases/card.use-case";
import {CardController} from "../../../presentation/controllers/card.controller";
import {getDbConnection} from "../../../infrastructure/driven-adapters/typeorm/config/db.config";
import {BankRepository} from "../../../infrastructure/driven-adapters/typeorm/repositories/bank.repository";
import {CardRepository} from "../../../infrastructure/driven-adapters/typeorm/repositories/card.repository";
import {GeneralResponseHandler} from "../../../presentation/responses/general-response-handler.adapter";

let cardUseCase: CardUseCase;
let cardController: CardController;

export function createCardControllerFactory() {
    if (!cardUseCase) {
        const dbConnection = getDbConnection();
        const cardRepository = new CardRepository(dbConnection);
        const bankRepository = new BankRepository(dbConnection);
        cardUseCase = new CardUseCase(cardRepository, bankRepository);
    }
    if (!cardController) {
        cardController = new CardController(cardUseCase, new GeneralResponseHandler())
    }

    return {
        cardUseCase,
        cardController
    }
}

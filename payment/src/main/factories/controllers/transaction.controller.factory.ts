import {TransactionUseCase} from "../../../application/use-cases/transaction.use-case";
import {TransactionController} from "../../../presentation/controllers/transaction.controller";
import {getDbConnection} from "../../../infrastructure/driven-adapters/typeorm/config/db.config";
import {CardRepository} from "../../../infrastructure/driven-adapters/typeorm/repositories/card.repository";
import {BankRepository} from "../../../infrastructure/driven-adapters/typeorm/repositories/bank.repository";
import {
    TransactionRepository
} from "../../../infrastructure/driven-adapters/typeorm/repositories/transaction.repository";
import {GeneralResponseHandler} from "../../../presentation/responses/general-response-handler.adapter";

let transactionUseCase: TransactionUseCase;
let transactionController: TransactionController;

export function createTransactionControllerFactory() {
    if (!transactionUseCase) {
        const dbConnection = getDbConnection();
        const cardRepository = new CardRepository(dbConnection);
        const bankRepository = new BankRepository(dbConnection);
        const transactionRepository = new TransactionRepository(dbConnection);
        transactionUseCase = new TransactionUseCase(cardRepository, bankRepository, transactionRepository);
    }
    if (!transactionController) {
        transactionController = new TransactionController(transactionUseCase, new GeneralResponseHandler());
    }
    return {
        transactionUseCase,
        transactionController
    }
}

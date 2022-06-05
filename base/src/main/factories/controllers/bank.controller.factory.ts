import {BankUseCase} from "../../../application/use-cases/bank.use-case";
import {BankController} from "../../../presentation/controllers/bank.controller";
import {getDbConnection} from "../../../infrastructure/driven-adapters/typeorm/config/db.config";
import {BankRepository} from "../../../infrastructure/driven-adapters/typeorm/repositories/bank.repository";
import {GeneralResponseHandler} from "../../../presentation/responses/general-response-handler.adapter";

let bankUseCase: BankUseCase;
let bankController: BankController;

export function createBankControllerFactory() {
    if (!bankUseCase) {
        const dbConnection = getDbConnection();
        const bankRepository = new BankRepository(dbConnection);
        bankUseCase = new BankUseCase(bankRepository);
    }
    if (!bankController) {
        bankController = new BankController(bankUseCase, new GeneralResponseHandler());
    }
    return {
        bankUseCase,
        bankController
    }
}

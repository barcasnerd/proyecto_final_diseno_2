import {BankUseCase} from "../../../application/use-cases/bank.use-case";
import {BankController} from "../../../presentation/controllers/bank.controller";
import {getDbConnection} from "../../../infrastructure/driven-adapters/typeorm/config/db.config";
import {BankRepository} from "../../../infrastructure/driven-adapters/typeorm/repositories/bank.repository";
import {GeneralResponseHandler} from "../../../presentation/responses/general-response-handler.adapter";
import {PaymentUseCase} from "../../../application/use-cases/payment.use-case";
import {PaymentController} from "../../../presentation/controllers/payment.controller";
import {PaymentRepository} from "../../../infrastructure/driven-adapters/typeorm/repositories/payment.repository";

let paymentUseCase: PaymentUseCase;
let paymentController: PaymentController;

export function createPaymentControllerFactory() {
    if (!paymentUseCase) {
        const dbConnection = getDbConnection();
        const bankRepository = new PaymentRepository(dbConnection);
        paymentUseCase = new PaymentUseCase(bankRepository);
    }
    if (!paymentController) {
        paymentController = new PaymentController(paymentUseCase, new GeneralResponseHandler());
    }
    return {
        paymentUseCase,
        paymentController
    }
}

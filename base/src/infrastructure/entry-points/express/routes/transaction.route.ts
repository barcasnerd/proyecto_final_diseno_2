import {Router} from "express";
import {createCardControllerFactory} from "../../../../main/factories/controllers/card.controller.factory";
import {routeAdapter} from "../adapters/router-adapter";
import {
    createTransactionControllerFactory
} from "../../../../main/factories/controllers/transaction.controller.factory";

const transactionRouter = () => {
    const router = Router();
    const {transactionController} = createTransactionControllerFactory();

    router.route("/")
        .get(routeAdapter(transactionController.getAll))
        .post(routeAdapter(transactionController.create));

    return router;
}

export {
    transactionRouter
}

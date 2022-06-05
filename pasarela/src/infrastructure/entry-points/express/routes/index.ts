import {Router} from "express";
import {APP_VARIABLES} from "../../../../common/helpers/initial.config";
import axios from "axios";
import {bankRouter} from "./bank.route";
import {cardRouter} from "./card.route";
import {transactionRouter} from "./transaction.route";


const routes = () => {
    const router = Router();

    router.use("/banks", bankRouter());
    router.use("/cards", cardRouter());
    router.use("/transactions", transactionRouter());

    return router;
};

export {
    routes
};

import {Router} from "express";
import {APP_VARIABLES} from "../../../../common/helpers/initial.config";
import axios from "axios";
import {bankRouter} from "./bank.route";
import {cardRouter} from "./card.route";
import {transactionRouter} from "./transaction.route";
import {paymentRouter} from "./payment.route";


const routes = () => {
    const router = Router();

    router.use("/payments", paymentRouter());

    return router;
};

export {
    routes
};

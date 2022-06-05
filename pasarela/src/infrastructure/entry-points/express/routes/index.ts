import {Router} from "express";
import {APP_VARIABLES} from "../../../../common/helpers/initial.config";
import axios from "axios";
import {bankRouter} from "./bank.route";
import {cardRouter} from "./card.route";


const routes = () => {
    const router = Router();

    router.use("/banks", bankRouter());
    router.use("/cards", cardRouter());

    return router;
};

export {
    routes
};

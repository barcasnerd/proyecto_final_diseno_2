import {Router} from "express";
import {APP_VARIABLES} from "../../../../common/helpers/initial.config";
import axios from "axios";
import {bankRouter} from "./bank.route";


const routes = () => {
    const router = Router();

    router.use("/banks", bankRouter());

    return router;
};

export {
    routes
};

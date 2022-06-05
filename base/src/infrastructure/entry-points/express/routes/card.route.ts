import {Router} from "express";
import {createBankControllerFactory} from "../../../../main/factories/controllers/bank.controller.factory";
import {routeAdapter} from "../adapters/router-adapter";
import {createCardControllerFactory} from "../../../../main/factories/controllers/card.controller.factory";

const cardRouter = () => {
    const router = Router();
    const {cardController} = createCardControllerFactory();

    router.route("/")
        .post(routeAdapter(cardController.create));

    router.route("/:id")
        .get(routeAdapter(cardController.getById))
        .patch(routeAdapter(cardController.update));

    router.route("/:id/balance")
        .get(routeAdapter(cardController.getBalance))


    return router;
}

export {
    cardRouter
}

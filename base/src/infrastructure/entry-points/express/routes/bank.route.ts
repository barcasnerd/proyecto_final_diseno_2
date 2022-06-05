import {createBankControllerFactory} from "../../../../main/factories/controllers/bank.controller.factory";
import {Router} from "express";
import {routeAdapter} from "../adapters/router-adapter";

const bankRouter = () => {
    const router = Router();
    const {bankController} = createBankControllerFactory();

    router.route("/")
        .get(routeAdapter(bankController.getAll))
        .post(routeAdapter(bankController.create));

    router.route("/:id")
        .get(routeAdapter(bankController.getById))
        .delete(routeAdapter(bankController.delete))
        .patch(routeAdapter(bankController.update));

    return router;
}

export {
    bankRouter
}

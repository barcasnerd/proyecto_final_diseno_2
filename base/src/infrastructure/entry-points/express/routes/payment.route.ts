import {Router} from "express";
import {createBankControllerFactory} from "../../../../main/factories/controllers/bank.controller.factory";
import {routeAdapter} from "../adapters/router-adapter";
import {createPaymentControllerFactory} from "../../../../main/factories/controllers/payment.controller.factory";

const paymentRouter = () => {
    const router = Router();
    const {paymentController} = createPaymentControllerFactory();

    router.route("/")
        .get(routeAdapter(paymentController.getAll))
        .post(routeAdapter(paymentController.create));

    router.route("/:id")
        .get(routeAdapter(paymentController.getById))
        .patch(routeAdapter(paymentController.update));

    return router;
}

export {
    paymentRouter
}

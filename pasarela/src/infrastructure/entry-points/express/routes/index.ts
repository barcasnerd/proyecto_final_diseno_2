import {Router} from "express";
import {APP_VARIABLES} from "../../../../common/helpers/initial.config";
import axios from "axios";


const routes = () => {
    const router = Router();

    router.use("/new", async (request, response) => {
        let ping = APP_VARIABLES.PING
        let a = await axios({
            url: `http://google.com`,
            method: 'GET'
        });
        response.json({
            data: `${a.status}`,
            other: `${a.data}`
        });
    });

    return router;
};

export {
    routes
};

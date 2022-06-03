import { App } from './app';
import {APP_VARIABLES} from "../../../../common/helpers/initial.config";

const port = APP_VARIABLES.APP_PORT;

export function startApp(){
    const app = App();
    app.listen(port, ()=>{
        console.log('App started on port '+ port);
    });
    return app;
}

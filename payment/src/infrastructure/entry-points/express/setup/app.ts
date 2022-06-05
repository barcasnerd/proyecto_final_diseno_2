import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { routes } from '../routes';

const App = ()=>{
    const expressApp = express();

    expressApp.use(helmet());
    expressApp.use(cors());
    expressApp.use(json());
    expressApp.use('/api/v1/payment', routes());
    return expressApp;
}

export {
    App
};

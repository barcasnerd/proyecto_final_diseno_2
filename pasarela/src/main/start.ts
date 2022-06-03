import {connectToDb} from '../infrastructure/driven-adapters/typeorm/config/db.config';
import {startApp} from '../infrastructure/entry-points/express/setup/server';

console.log('Environment:', process.env.NODE_ENV);

export async function start() {
    await connectToDb();
    const expressApp = startApp();
    return {
        express: expressApp
    }
}

start().then();

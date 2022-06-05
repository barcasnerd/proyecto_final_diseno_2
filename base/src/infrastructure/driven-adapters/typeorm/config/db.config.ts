import { Connection, createConnection, getConnection } from 'typeorm';
import connectionOptions from './database';

let connection: Connection;

export async function connectToDb() {
    try {
        connection = await createConnection(connectionOptions);
        console.log('DB Connection established');
    } catch (err) {
        console.log('DB Connection failed', err);
        throw err;
    }
}

export async function closeDbConnection() {
    try {
        if (connection) {
            await connection.close();
            console.log('DB connection closed');
        }
    } catch (err) {
        console.log('DB connection could not be closed', err);
        throw err;
    }
}


export function getDbConnection(forceGet: boolean = false) {
    if (forceGet) {
        connection = getConnection();
    }
    return connection;
}

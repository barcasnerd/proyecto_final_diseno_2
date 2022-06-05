import {IRepository} from "../../../../application/ports/repositories/repository.port";
import {Connection, EntityManager} from "typeorm";

export class GeneralRepository implements IRepository{

    private dbConnection: Connection;

    constructor(connection: Connection) {
        this.dbConnection = connection;
    }

    async transaction(transaction: (manager: EntityManager) => Promise<void>): Promise<void> {
        await this.dbConnection.transaction(async (entityManager)=>{
            await transaction(entityManager);
        });
    }

}

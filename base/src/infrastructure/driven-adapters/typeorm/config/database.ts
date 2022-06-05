import {APP_VARIABLES} from "../../../../common/helpers/initial.config";

import { ConnectionOptions } from "typeorm";


const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: APP_VARIABLES.DB_HOST,
    port: parseInt(APP_VARIABLES.DB_PORT + ''),
    username: APP_VARIABLES.DB_USERNAME,
    password: APP_VARIABLES.DB_PASSWORD,
    database: APP_VARIABLES.DB_NAME,
    logging: ["error"],
    synchronize: true,
    entities: [
        __dirname + "/../entities/**",
    ],
    migrations: [
        __dirname + "/../migrations/**"
    ],
    cli: {
        entitiesDir: "src/models",
        migrationsDir: "src/migrations"
    },
    name: "default"
};

export = connectionOptions;

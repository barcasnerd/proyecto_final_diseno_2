const validateEnvironmentVariable = (variable: string): string => {
    if (!process.env?.[variable]) {
        console.error(`Environment variable ${variable} is required`);
        process.exit(1);
    }
    return process.env?.[variable]!;
}
export const APP_VARIABLES = {
    //DATABASE CONFIG
    DB_HOST: validateEnvironmentVariable('DB_HOST'),
    DB_USERNAME: validateEnvironmentVariable('DB_USERNAME'),
    DB_PASSWORD: validateEnvironmentVariable('DB_PASSWORD'),
    DB_NAME: validateEnvironmentVariable('DB_NAME'),
    DB_PORT: validateEnvironmentVariable('DB_PORT'),
    //OTHERS
    APP_PORT: validateEnvironmentVariable('APP_PORT'),
    NODE_ENV: validateEnvironmentVariable('NODE_ENV'),
    PING: validateEnvironmentVariable('PING'),
}

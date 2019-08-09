import { config } from 'dotenv';
import { IConfig } from './IConfig';
config();
const envVars = process.env;
const configuration: IConfig = Object.freeze( {
    mongoUri: envVars.MONGO_URL,
    password: envVars.PASSWORD,
    port: envVars.PORT,
    secretKey: envVars.SECRET_KEY,
    });
//console.log('config is::::', configuration);
export default configuration;

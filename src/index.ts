import { config } from './config';
import Server from './Server';
console.log('configuration is', config);
const server = new Server(config);
server.bootstrap();

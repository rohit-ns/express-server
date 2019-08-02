import { config } from './config';
import Server from './Server';
export { default as errorHandlerMiddleware } from './libs';
export { default as notFoundRouteMiddleware } from './libs';
export { default as validationHandler } from './libs';
console.log('configuration is', config);
const server = new Server(config);
server.bootstrap();

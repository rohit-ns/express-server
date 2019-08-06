import * as bodyParser from 'body-parser';
import * as  express from 'express';
import { Database } from './libs';
import { errorHandlerMiddleware } from './libs/routes/errorHandler';
import { notFoundRouteMiddleware } from './libs/routes/notFoundRoute';
import router from './router';
const app = express();
export default class Server {
    constructor(private config) {
        this.run();
    }
    public setupRoutes() {
        app.use( '/health-check' , (req , res ) => {
            res.send('I am ok');
        });
        app.use('/api', router);
        app.use(notFoundRouteMiddleware);
        app.use(errorHandlerMiddleware);
    }
    public bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
    }
    public initBodyParser() {
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({extended: true}));
    }
    public run() {
        const{
        config: { port, mongoUri} } = this;
        Database.open(mongoUri);
        app.listen(port);
    }
}

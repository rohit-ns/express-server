import * as bodyParser from 'body-parser';
import * as  express from 'express';
import { errorHandlerMiddleware } from './libs/routes/errorHandler';
import { notFoundRouteMiddleware } from './libs/routes/notFoundRoute';
const app = express();
export default class Server {
    constructor(private config) {
        this.setupRoutes();
        this.run();
        this.bootstrap();
        this.initBodyParser();

    }
    public setupRoutes() {
       app.use( '/health-check' , (req , res ) => {
            res.send('I am ok');
        });
       app.use(errorHandlerMiddleware);
       app.use('/api', notFoundRouteMiddleware);
    }
    public bootstrap() {
        this.setupRoutes();
        this.initBodyParser();
    }
    public initBodyParser() {
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({extended: true}));
    }
    public run() {
        const{
            config: { port },
        } = this;
        app.listen(port);
    }
}

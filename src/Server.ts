import * as bodyParser from 'body-parser';
import * as  express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import { errorHandlerMiddleware } from './libs/routes/errorHandler';
import { notFoundRouteMiddleware } from './libs/routes/notFoundRoute';
import { Database } from './libs/Database';
import router from './router';
const app = express();
class Server {
    constructor(private config) {
       // this.run();
    }
    public setupRoutes() {
        app.use( '/health-check' , (req , res ) => {
            res.send('I am ok');
        });
        app.use('/api', router);
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(notFoundRouteMiddleware);
        app.use(errorHandlerMiddleware);
    }
    public bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }
    public application() {
        return app;
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

export { Server, app };

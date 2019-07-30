import * as bodyParser from 'body-parser';
import * as  express from 'express';
import { errorHandlermiddleware } from './libs/routes/errorHandler';
import { notFoundRoutemiddleware } from './libs/routes/notFoundRoute';
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
       app.use(notFoundRoutemiddleware);
       app.use('/api', errorHandlermiddleware);
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

import * as express from 'express';
import authMiddleware from './../../libs/routes/authMiddleware';
// tslint:disable-next-line:ordered-imports
import validationHandler from '../../libs/validationHandler';
import { traineeController } from './Controller';
import validation from './validation';

const traineeRouter = express.Router();
traineeRouter.route('/')
    .get(authMiddleware('getUsers', 'all'),validationHandler(validation.get), traineeController.get)
    .post(authMiddleware('getUsers', 'all'),validationHandler(validation.create), traineeController.create)
    .put(authMiddleware('getUsers', 'all'),validationHandler(validation.update), traineeController.update);
traineeRouter.route('/del/:id')
    .delete(authMiddleware('getUsers', 'all'),validationHandler(validation.delete), traineeController.delete);
export default traineeRouter;

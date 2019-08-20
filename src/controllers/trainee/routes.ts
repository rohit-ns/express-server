import * as express from 'express';
import authMiddleware from './../../libs/routes/authMiddleware';
// tslint:disable-next-line:ordered-imports
import validationHandler from '../../libs/validationHandler';
import { traineeController } from './Controller';
import validation from './validation';

const traineeRouter = express.Router();
traineeRouter.route('/')
    .get(authMiddleware('getUsers', 'all'), traineeController.get)
 // .get(validationHandler(validation.get), authMiddleware('getUsers', 'all'), traineeController.get )
    .post(validationHandler(validation.create), traineeController.create)
    .put(validationHandler(validation.update), traineeController.update);
traineeRouter.route('/:id')
    .delete(validationHandler(validation.delete), authMiddleware('getUsers', 'delete'), traineeController.delete );
export default traineeRouter;

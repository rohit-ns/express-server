import { Router } from 'express';
import { traineeController } from './Controller';
import validation from './validation';
import validationHandler from '../../libs/validationHandler';
import authMiddleware from './../../libs/routes/authMiddleware';
const traineeRouter = new Router();
traineeRouter.route('/')
// .get(validationHandler(validation.get), traineeController.get)
.get(authMiddleware('getUsers', 'read') , traineeController.get)
.post(validationHandler(validation.create), traineeController.create)
.put(validationHandler(validation.update), traineeController.update)
.delete(validationHandler(validation.delete), traineeController.delete);
export default traineeRouter;

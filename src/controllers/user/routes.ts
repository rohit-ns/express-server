import * as express from 'express';
import authMiddleware from './../../libs/routes/authMiddleware';
import validationHandler from '../../libs/validationHandler';
import userController from './Controller';
import validation from './validation';

const userRouter = express.Router();
userRouter.route('/login')
    .post(validationHandler(validation.create),userController.login);
userRouter.route('/me')
    .get(authMiddleware('getUsers', 'all') , userController.getUser);
  export default userRouter;

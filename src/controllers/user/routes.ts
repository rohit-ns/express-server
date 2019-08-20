import * as express from 'express';
import authMiddleware from './../../libs/routes/authMiddleware';
import UserController from './Controller';

// import { UserController } from './controllers';
const userRouter = express.Router();
userRouter.route('/login')
.post(UserController.login);
userRouter.route('/me')
    // .get(userRoutes.get)
    .get(authMiddleware('getUsers', 'all') , UserController.getUser);
   // .get(UserController.getUser)
userRouter.route('/update')
    .put(UserController.updateUser);
userRouter.route('/del/:id')
    .delete(UserController.deleteUser);
    // .post(UserController.login)
    // .put(userRoutes.update)
    // .delete(userRoutes.delete);
export default userRouter;

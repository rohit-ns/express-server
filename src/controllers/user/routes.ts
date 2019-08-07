import { Router } from 'express';
//import { UserController } from './controllers';
const userRoutes = new Router();
userRoutes.route('/')
    .get(userRoutes.get)
    .post(userRoutes.create)
    .put(userRoutes.update)
    .delete(userRoutes.delete);
export default userRoutes;
import * as jwt from 'jsonwebtoken';
import hasPermission from '../../../extraTs/utils/permissions';
import { config } from '../../config';
import UserRepository from '../../Repositories/user/UserRepository';
const userRepository = new UserRepository();

export default (moduleName, permissionType) => async (req, res, next) => {
    console.log('>>>>>>>>>>>', moduleName, permissionType)
    try {
        const token = req.headers.authorization;
        const userinfo = jwt.verify(token, config.secretKey);  // verify the token
        console.log('>>>',userinfo.role)
        const user = await userRepository.get({ originalId: userinfo._id, deleatedAt: { $exists: false } }, undefined)
        if (!user) {
            next('User does not exist');
        }
        req.user = user;
        console.log('user role',moduleName, userinfo.role, typeof userinfo.role);
        if (hasPermission(moduleName, userinfo.role, permissionType)) {    //checking the permissions 
            console.log('user role', userinfo.role, typeof userinfo.role);
            next();
        }
        else {
            next({
                error: 'Unauthorized',
                message: 'Unauthorized Access',
                status: 401,
            });
        }
    } catch (error) {
        next({
            error: error,
            message: 'Invalid Token',
            status: 403,
        });
    }
};

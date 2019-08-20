import * as jwt from 'jsonwebtoken';
import hasPermission from '../../../extraTs/utils/permissions';
import { config } from '../../config';
import UserRepository from '../../Repositories/user/UserRepository';
const userRepository = new UserRepository();

export default ( moduleName, permissionType ) => (req, res, next) => {
    console.log('config is ::::', moduleName, permissionType);
    const token = req.headers.authorization;
    const userinfo = jwt.verify(token, config.secretKey );  // verify the token
    console.log('user information', userinfo);
    if (hasPermission( moduleName, 'head-trainer', permissionType )) {
        console.log('user role', userinfo.role, typeof userinfo.role);
        userRepository.get({originalId: userinfo._id , deleatedAt: {$exists: false}}, undefined)
    .then((user) => {
        if (!user) {
            next('user does not exist');
        }
        console.log('user from db', user);
        req.user = user;
        next();
    })
    .catch((error) => {
        res.log('errror is ', error);
    });
        }
        else {
            next('Unauthorised Access');
        }

// console.log('User info decoded', userInfo);
// jwt.verify(token, config.secretKey, ( error, result ) => {
//     if (error) {
//             next('Unauthorised Access');
//         }
//         else if (hasPermission(moduleName, result.role, permissionType)) {
//             next();
//             }
//             else {
//                 next('Unauthorised Access');
//             }

//         });
// const userInfo = jwt.verify(token, config.secretKey);
//     // DB check
// userRepository.findOne({ id: userInfo.id })
//     .then((user) => {
//         if (!user) {
//             next('User does not exist');
//         }
//         console.log('User from DB', user);
//         // permission check
//         req.user = user ;
//         next();
//     });
// console.log('User info decoded', userInfo);
// jwt.verify(token, config.secretKey, ( error, result ) => {
//     if (error) {
//             next('Unauthorised Access');
//         }
//         else if (hasPermission(moduleName, result.role, permissionType)) {
//             next();
//             }
//             else {
//                 next('Unauthorised Access');
//             }

//         });

};

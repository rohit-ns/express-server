import * as jwt from 'jsonwebtoken';
import hasPermission from '../../../extraTs/utils/permissions';
import { config } from '../../config';
import UserRepository from '../../Repositories/user/UserRepository';
export default (moduleName, permissionType) => (req , res , next) => {
const userRepository = new UserRepository;
// console.log('config is ::::',moduleName,permissionType);
// console.log('Header is ::::',req.headers('authorization'));
// try {
console.log('authorization', req.headers);
const token = req.headers['authorization'];
console.log('Token::::', token);
const userInfo = jwt.verify(token, config.secretKey);
    // DB check
userRepository.findOne({ _id: userInfo._id })
    .then((user) => {
        if (!user) {
            next('User does not exist');
        }
        // permission check
        console.log('User from DB', user);
        req.user = user ;
        next();
    });
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
    console.log('User info decoded', userInfo);
        // });
    };

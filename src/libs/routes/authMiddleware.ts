import * as jwt from 'jsonwebtoken';
import hasPermission from '../../../extraTs/utils/permissions';
import { config } from '../../config';
import UserRepository from '../../Repositories/user/UserRepository';
const userRepository = new UserRepository;
export default (moduleName, permissionType) => (req , res , next) => {

// console.log('config is ::::',moduleName,permissionType);
// console.log('Header is ::::',req.headers('authorization'));
// try {
console.log('authorization', req.headers);
const token = req.headers['authorization'];
console.log('Token::::', token);
const userInfo = jwt.verify(token, config.secretKey);
    // DB check      
userRepository.findOne({ id: userInfo.id })
    .then((user) => {
        if (!user) {
            next('User does not exist');
        }
     
        console.log('User from DB', user);
        // permission check 
        req.user = user ;
        next();
    });
console.log('User info decoded', userInfo);
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

        // });
};

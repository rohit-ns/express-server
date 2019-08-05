import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import hasPermission from '../../../extraTs/utils/permissions'
export default (moduleName,permissionType) => (req,res,next) => {
//console.log('config is ::::',moduleName,permissionType);
//console.log('Header is ::::',req.headers('authorization'));
// try {
    console.log('authorization', req.headers);
    const token = req.headers['authorization'];
    console.log('Token::::',token);
    const userInfo = jwt.verify(token,config.secretKey)
    
    const role = userInfo.role;
//     hasPermission(moduleName,permissionType,role);
//     console.log('User info decoded',userInfo);
//     next();
    
// } catch(err) {
//     console.log('Error is::::',err);
//     next('Unauthorised Access');
// }
if(hasPermission(moduleName,role,permissionType)){
    next();
    }
    else {
    console.log('Error is::::');    
    next('Unauthorised Access');
    }
    
    }

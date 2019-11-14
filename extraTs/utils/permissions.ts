// import { permissions } from '.././constants';
// export default function hasPermission(moduleName, role, permissionType) {
// const isAllowed = permissions[moduleName]['all'].includes(role)
//                 || permissions[moduleName][permissionType].includes(role);
// return isAllowed ? console.log('True') : console.log('False');
// }
import { permissions  } from '../constants' ;
export default function  hasPermission( moduleName: string, role: string, permissionType: string): boolean {
    if (!permissions.hasOwnProperty(moduleName)) {
        return false;
    }
    else if (!permissions[moduleName].hasOwnProperty(permissionType)) {
        return false;
    }
    else if (!permissions[moduleName][permissionType].includes(role)) {
        return false;
    }
    else {
        return true;
    }}

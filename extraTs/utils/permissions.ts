import { permissions } from '.././constants';
export default function hasPermission(moduleName, role, permissionType) {
const isAllowed = permissions[moduleName]['all'].includes(role)
                || permissions[moduleName][permissionType].includes(role);
return isAllowed ? console.log('True') : console.log('False');
}

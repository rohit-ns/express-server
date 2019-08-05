import { users } from '../constants';
import hasPermission from './permissions';
import validateUser from './validation';
validateUser(users);
//hasPermission('getUsers', 'head-trainer', 'all');

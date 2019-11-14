import hasPermission from './permissions';
import validateUser from './validation';
import {users} from '../constants';
validateUser(users);
hasPermission("getUsers","head-trainer","all");
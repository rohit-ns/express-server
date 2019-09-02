import * as bcrypt from 'bcrypt';
import UserRepository from '../Repositories/user/UserRepository';
import { UserModel } from './../Repositories/user/UserModel';
import Database from './Database';
const userRepository = new UserRepository();
export default () => {
    console.log('Inside Seed Data');
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync('Training@123', salt);

    const user = {
        UserId: 'Rohit',
        email: 'rohit@gmail.com',
        name : 'rohit',
        password: hash,
        role: 'head-trainer',
    };
    console.log('The hash for password is:::', hash);
    UserModel.countDocuments({}, function(err, count) {
  if (count === 0 ) {
          console.log('NO of User:::', count);
          return userRepository.create(user)
     }
   });
};

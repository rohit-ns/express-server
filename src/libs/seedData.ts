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
        email: 'rohit@gmail.com',
        name : 'rohit',
        password: hash,
    };
    console.log('The hash for password is:::', hash);
    UserModel.countDocuments({}, function(err, count) {
        if (count === 0 ) {
            console.log('NO of User:::', count);
            userRepository.create(user)
        .then((res) => {
           console.log('User Created', res);
           userRepository.update({ name: 'rohit'}, {name: 'ROHIT'})
            .then((res) => {
            console.log('Updated Data:::', res);
        });
           userRepository.get({name: 'ROHIT'}, undefined, undefined)
            .then((res) => {
            console.log('All Data Fetches:::', res);
        });
        //    userRepository.delete({name: 'ROHIT'})
            // .then((res) => {
            // console.log('User Delete', res);
        // });
        // .then(() => {
        //    Database.Disconnect();
        // })
        // .catch((err) => {
        //     console.log('Error Occured', err);
        // });
    });
  }
            else {
            console.log('There is no User', err);
        }
    });
};

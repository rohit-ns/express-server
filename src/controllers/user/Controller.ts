import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from './../../config';
import UserRepository from './../../Repositories/user/UserRepository';
const userRepository = new UserRepository();

export default class UserController {
    public static updateUser(req , res, next) {        // function for update user
        userRepository.update (
            { _id: req.body.id }, req.body.dataToUpdate )
            .then((res) => {
            if (res === 'user not found') {
             next ({
               message: res,
                status: 404,
              });
            }
        else {
            next({
            data: req.body.dataToUpdate,
            message: 'User update successfully',
            status: 200,
        });
     }
    })
    .catch((err) => {
            console.log('Error Occured', err);
            });
   }
//    public static User(req , res, next) {
//     userRepository.update (
//         { _id: req.body.id }, req.body.dataToUpdate )
//         .then((ress) => {
//         if (ress === 'user not found') {
//          next ({
//            message: ress,
//             status: 404,
//           });
//         }
//     else {
//         next({
//         data: req.body.dataToUpdate,
//         message: 'User update successfully',
//         status: 200,
//     });
//  }
// })
// .catch((err) => {
//     console.log('Error Occured', err);
//     });
// }
    public static deleteUser(req, res, next) {        // function for delete user
        userRepository.delete({_id: req.params.id})
            .then((result) => {
                if (result === ' user not found in delete ') {
                    next({
                        message: result,
                        status: 404,
                    });
                }
                else {
                    res.send({
                    data: req.params.id,
                    message: 'User delete successfully',
                    status: 200,
                    });
                }
        })
        .catch((err) => {
            console.log('Error Occured', err);
        });
    }
    public static getUser(req, res) {      // details of current user
        console.log('User', req.user);
        res.send({
            data: req.user,
            message: 'User Fetch Successfully',
            status: 'ok',
         });
    }
    public static login(req, res, next) {          // check login and password
        console.log('Inside Login Request', req.body);
        const { email, password } = req.body;
        userRepository.findOne({ email })
        .then((user) => {
            console.log('User is :::::', user);
            if (!user) {
            return next('User not Found');
        }
            const { password: hashpassword } = user;
            if (!(bcrypt.compareSync( password, hashpassword))) {
            return next('Password does not match');
        }
            const token = jwt.sign(user, config.secretKey);
            // console.log('Token is::::', token);
            // console.log('User Response', user.password);
            res.send({
            data: {
                token,
            },
            message: 'Authorization Token',
            status: 'ok',
        });
    })
        .catch((err) => {
        console.log('Error Occured', err);
        });
    }
}

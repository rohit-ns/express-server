import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from './../../config';
import UserRepository from './../../Repositories/user/UserRepository';
const userRepository = new UserRepository();

class UserController {
    public async login(req, res, next) {           // check login and password
        try {
            const { email, password } = req.body;
            const login = await userRepository.findOne({ email });
            if (!login) {
                return next({
                    error: 'Invalid details',
                    message: 'Email does not nmatch',
                    status: 422,
                });
            }
            const { password: hashPassword } = login;
            if (!(bcrypt.compareSync(password, hashPassword))) {
                return next({
                    error: 'Invalid details',
                    message: 'Password does not match',
                    status: 422,
                });
            }
            const token = jwt.sign(login, config.secretKey,{expiresIn: '15m'});   //token expiry
            return res.send({
                message: 'User Login Successfully',
                status: 200,
                data: token,
            });
        }
        catch (error) {
            throw error;
        }
    }
    public getUser(req, res) {         // details of current user
        try {
            res.send({
                message: 'User get Successfully',
                status: 200,
                data: req.user,
            });
        }
        catch (error) {
            throw error;
        }
    }
    // public static updateUser(req, res, next) {        // function for update user
    //     userRepository.update(
    //         { _id: req.body.id }, req.body.dataToUpdate)
    //         .then((res) => {
    //             if (res === 'user not found') {
    //                 next({
    //                     message: res,
    //                     status: 404,
    //                 });
    //             }
    //             else {
    //                 next({
    //                     data: req.body.dataToUpdate,
    //                     message: 'User update successfully',
    //                     status: 200,
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             console.log('Error Occured', err);
    //         });
    // }

    // public async deleteUser(req, res, next) {
    //     try {
    //         const deleteUser = await userRepository.delete({_id: req.params.id});
    //         if (deleteUser === ' not found in delete ') {
    //             next({
    //                 message: deleteUser,
    //                 status: 404,
    //             });
    //         }
    //         else {
    //             res.send({
    //             message: 'User deleted Successfully',
    //             status: 200,
    //             data: req.params.id,
    //             });
    //         }
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // }       
}
const userController = new UserController;
export default userController;

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ok } from 'assert';
import { config } from './../../config';
import UserRepository from './../../Repositories/user/UserRepository';
const userRepository = new UserRepository();

export default class UserController {
    public static getUser(req, res) {
        console.log('User', req.user);
        res.send({
            data: req.user,
            message: 'User Fetch Successfully',
            status: 'ok',
         });
    }
    public static login(req, res, next) {
        console.log('Inside Login Request', req.body);
        const { email, password } = req.body;
        userRepository.findOne({ email })
        .then((user) => {
            console.log('Users Fetched');
            if (!user) {
            return next('User not Found');
        }
            const { password: hashpassword } = user;
            if (!(bcrypt.compareSync( password, hashpassword))) {
            return next('Password does not match');
        }
            const token = jwt.sign(user, config.secretKey);
            console.log('Token is::::', token);
            console.log('User Response', user.password);
            res.send({
            data: {
                token,
            },
            message: 'login Successfully',
            status: ok,
        });
    });
    }
}

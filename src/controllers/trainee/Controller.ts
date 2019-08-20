import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from './../../config';
import UserRepository from './../../Repositories/user/UserRepository';
const userRepository = new UserRepository();
class TraineeController {
    public async get(req: Request, res: Response) {
        // tslint:disable-next-line:radix
     //   const show = parseInt( req.query.show);
        console.log('req.query--', req.query);
        const { skip = 0, limit = 0 } = req.query;
        const query = {
            limit: parseInt(limit, 10),
            skip: parseInt(skip, 10),
        };
        // Object.entries(req.query).forEach(([key, value]) => {
        //     query[key] = parseInt(value, 10);
        // });
        const traineeList = await userRepository.getAll({ deletedAt: { $exists: false } ,
        role: 'trainee'}, undefined, query);
        const count: number = traineeList.length;
        console.log('INSIDE GET TRAINEE');
       // console.log('traineeList', traineeList);
        res.send([
        {
            count,
            data: traineeList,
            message: 'all trainees fetched',
            status: 200,
        },
       ]);
    }
    public async create(req: Request, res: Response) {
        console.log('INSIDE CREATE TRAINEE');
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        const data = {
            role: 'trainee',
            userId: 'rohit',
            ...req.body,
        };
        const createTrainee = await userRepository.create(data);
        res.send({
            data: {
            name: createTrainee,
            },
            message: 'trainee create successful',
            status: 'ok',
        });
    }
//     public create(req: Request  , res: Response , next ) {
//     console.log('INSIDE TRAINEE CREATE');
//     console.log('Inside Login Request', req.body);
//     const { email, password } = req.body;
//     userRepository.findOne({ email })
//     .then((user) => {
//         console.log('User is :::::',user);
//         if (!user) {
//         return next('User not Found');
//     }
//         const { password: hashpassword } = user;
//         if (!(bcrypt.compareSync( password, hashpassword))) {
//         return next('Password does not match');
//     }
//         const token = jwt.sign(user, config.secretKey);
//         // console.log('Token is::::', token);
//         // console.log('User Response', user.password);
//         res.send({
//         data: {
//             token,
//         },
//         message: 'Authorization Token',
//         status: 'ok',
//     });
// })
//     .catch((err) => {
//     console.log('Error Occured', err);
//     });
// }
    public delete(req: Request , res: Response, next ) {
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
    public update(req: Request , res: Response , next) {
        console.log('INSIDE TRAINEE UPDATE');
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
}
export const traineeController = new TraineeController();

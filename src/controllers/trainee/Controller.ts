import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserRepository from './../../Repositories/user/UserRepository';

const userRepository = new UserRepository();
class TraineeController {
    public async get(req: Request, res: Response , next) {
        try{
        const { skip = 0, limit = 0 } = req.query;
        const query = {
            limit: parseInt(limit, 10),
            skip: parseInt(skip, 10),
        };
        const records = await userRepository.getAll({
            deletedAt: { $exists: false },
            role: 'trainee'
        }, undefined, query);
        const count: number = records.length;
        console.log('INSIDE GET TRAINEE');
        res.send(
            {    
                message: 'Successfully fetched Trainees',
                status: 200,
                data:{ count,records },
            },
        );
    }
    catch (error) {
        return next({
            error: 'not found',
            message: 'correction required',
            status: 403,
        });
    }
}
    public async create(req: Request, res: Response) {
        console.log('INSIDE CREATE TRAINEE');
        try {
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
            return res.send({
                status: 200,
                message: 'Trainee Created Successfully',
                data: createTrainee,
            });

        }
        catch (error) {
            console.log('Error Occured', error);
        }
    }
    public async update(req, res, next) {
        console.log('INSIDE UPDATE TRAINEE');
        try {
            const result = await userRepository.update({ _id: req.body.id }, req.body.dataToUpdate);
            if (result) {
                return res.send({
                    status: 200,
                    message: 'Trainee updated  Successfully',
                    data: { id: req.body.id },
                });
            }
            next({
                error:'Unauthorized',
                message: 'id not found',
                status: 404,
            });
        }
        catch (error) {
            console.log('Error Occured', error);
        }
    }
    public async delete(req, res, next) {        // function for delete trainee
        console.log('INSIDE DELETE TRAINEE');
        try {
            const result = await userRepository.delete({ _id: req.params.id })
            if (result) {
                return res.send({
                    status: 200,
                    message: 'Trainee deleted successfully',
                    data: { id: req.params.id },
                });
            }
            next({
                error:'Unauthorized',
                message: 'id not found',
                status: 404,
            });
        }
        catch (error) {
            next({
                error: error,
                message:'not found',
            })
        }
    }
}
export const traineeController = new TraineeController();

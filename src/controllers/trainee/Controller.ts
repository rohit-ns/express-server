import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserRepository from './../../Repositories/user/UserRepository';
import { UserModel } from '../../Repositories/user/UserModel';
const userRepository = new UserRepository();
class TraineeController {
    public async get(req: Request, res: Response, next: (arg0: { error: string; message: string; status: number; }) => void) {
        try {
            const { skip = 0, limit = 0, sort = 0 } = req.query;
            const query = {
                limit: parseInt(limit, 10),
                skip: parseInt(skip, 10),
                sort
            };
            const count = await UserModel.countDocuments({
                deletedAt: { $exists: false },
                deletedBy: { $exists: false },
                role: 'trainee',
            });
            const records = await userRepository.getAll({
                deletedAt: { $exists: false },
                role: 'trainee'
            }, undefined, query);

            console.log('INSIDE GET TRAINEE');
            res.send(
                {
                    message: 'Successfully fetched Trainees',
                    status: 200,
                    data: { count, records },
                },
            );
        }
        catch (error) {
            return next({
                error: 'data not found',
                message: 'correction required',
                status: 403,
            });
        }
    }
    public async create(req: Request, res: Response, next) {
        console.log('INSIDE CREATE TRAINEE');
        try {
            const { email } = req.body;
            UserModel.countDocuments({ email }, async (err, count) => {
                if (count == 0) {
                    const saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hash = bcrypt.hashSync(req.body.password, salt);
                    req.body.password = hash;
                    const userId = req.user.originalId;
                    const data = {
                        role: 'trainee',
                        userId: req.user,
                        ...req.body,
                    };
                    // req.body.findOne({email:req.body.email},function(user: any){
                    //     if(user){
                    //         throw 'Email Already exist';
                    //     }
                    // })                                                                                                                                                                                                                                
                    const createTrainee = await userRepository.create(data, userId);
                    delete createTrainee.password;
                    return res.send({
                        status: 200,
                        message: 'Trainee Created Successfully',
                        data: createTrainee,
                    });

                } else {
                    next({
                        error: 'Invalid email',
                        message: `This ${email} is already exist.Please try another email`,
                        status: 400,
                    });
                }
            });
        }
        catch (error) {
            next({
                error: "Invalid details",
                message: 'Details must be in proper fromat',
                status: 404,
            });
        }
    }
    public async update(req, res, next) {
        try {
            const { dataToUpdate, id } = req.body;
            const { email } = dataToUpdate;

            const updateQuery = { email, originalId: { $ne: id } };

            UserModel.countDocuments(updateQuery, async (err, count) => {
                if (count === 0) {
                    const updateTrainee = await userRepository.update(
                        { _id: id }, dataToUpdate,
                    );
                    if (updateTrainee) {
                        res.send({
                            message: 'Trainee update successfully',
                            status: 200,
                            data: { id },
                        });
                    }
                } else {
                    next({
                        error: 'Invalid email ',
                        message: 'email already exist',
                        status: 404,
                    });
                }
            });
        }
        catch (error) {
            next({
                error: 'Invalid id',
                message: 'id not found for update ',
                status: 404,
            });
        }
    }

    // public async update(req: { body: { id: any; dataToUpdate: any; }; }, res: { send: (arg0: { status: number; message: string; data: { id: any; }; }) => void; }, next: { (arg0: { error: string; message: string; status: number; }): void; (arg0: { error: string; message: string; status: number; }): void; }) {
    //     console.log('INSIDE UPDATE TRAINEE');
    //     try {
    //         const { body: { dataToUpdate: { email } } } = req;
    //         UserModel.countDocuments({ email }, async (err, count) => {
    //             if (count == 0) {
    //                 const result = await userRepository.update({ _id: req.body.id }, req.body.dataToUpdate);
    //                 if (result) {
    //                     return res.send({
    //                         status: 200,
    //                         message: 'Trainee updated  Successfully',
    //                         data: { id: req.body.id },
    //                     });
    //                 }
    //             } else {
    //                 next({
    //                     error: 'Invalid email',
    //                     message: ` ${email} is already exist.Please try another email`,
    //                     status: 422,
    //                 });
    //             }
    //         });
    //     }
    //     catch (error) {
    //         next({
    //             error: 'not found',
    //             message: 'id not found in update',
    //             status: 404,
    //         });
    //     }
    // }
//     public async delete(req: { params: { id: any; }; }, res: { send: (arg0: { status: number; message: string; data: { id: any; }; }) => void; }, next: { (arg0: { message: string; status: number; }): void; (arg0: { error: string; message: string; status: number; }): void; }) {        // function for delete trainee
//         console.log('INSIDE DELETE TRAINEE');
//         try {
//             const result = await userRepository.delete({ _id: req.params.id })
//             if (result) {
//                 return res.send({
//                     status: 200,
//                     message: 'Trainee deleted successfully',
//                     data: { id: req.params.id },
//                 });
//             }
//             next({
//                 message: 'id not found',
//                 status: 404,
//             });
//         }
//         catch (error) {
//             next({
//                 error: 'not found',
//                 message: 'id not found for delete',
//                 status: 404,
//             })
//         }
//     }
// }
public async delete(req, res, next) {
    try {
        const { id } = req.params;
        const result = await userRepository.delete({_id: id});
        if (result) {
            return res.send({
                status: 200,
                message: 'Trainee deleted successfully',
                data: { id: id},
             
            });
        }
    }
    catch (error) {
        next({
            error: 'not found',
            message: 'id not found for delete',
            status: 404,
        });
    }
}
}
export const traineeController = new TraineeController();

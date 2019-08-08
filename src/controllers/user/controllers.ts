import { Request, Response } from 'express';
export default class UserController {
    public get(req: Request , res: Response) {
    console.log('INSIDE GET :::::USER');
    res.send({
        data: {
            id: 1,
            name: 'User1',
            },
        message: 'USER get successfully',
        status: 'OK',
        });
}
    public create(req: Request  , res: Response) {
    console.log('INSIDE USER CREATE');
    res.send({
        data: {
            id: 1,
            name: 'User1',
            },
        message: 'User created successfully',
        status: 'OK',
        });
}
    public delete(req: Request , res: Response) {
        console.log('INSIDE USER DELETE');
        res.send({
            data: {
                id: 1,
                name: 'user1',
               },
            message: 'User delete successfully',
            status: 'OK',
        });
}
    public update(req: Request , res: Response) {
        console.log('INSIDE USER UPDATE');
        res.send({
            data: {
                id: 1,
                name: 'user1',
               },
            message: 'User update successfully',
            status: 'OK',
        });
}}

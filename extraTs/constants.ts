import { IPermissions , IUser } from './interfaces';
export const  permissions: IPermissions = {
    getUsers: {
        all: ['head-trainer'],
        delete: ['head-trainer'],
        read : ['trainee', 'trainer','head-trainer'],
        write :['trainer','head-trainer'],
    },
};
export const users: IUser[] = [
    {
        reviewerEmail: 'reviewer1@successive.tech', traineeEmail: 'trainee@successive.tech'},
    {
        reviewerEmail: 'reviewer21@successive.tech', traineeEmail: '*trainee2@successive.tech'},
    {
        reviewerEmail: '%reviewer1@successive.tech', traineeEmail: 'trainee@successive22.tech'},
] ;

import * as bcrypt from 'bcrypt';
import UserRepository from '../Repositories/user/UserRepository';
import { UserModel } from './../Repositories/user/UserModel';

const userRepository = new UserRepository();
export default async () => {
  console.log('Inside Seed Data');
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync('Training@123', salt);

  const user = {
    email: 'rohit@successive.tech',
    name: 'Rohit',
    password: hash,
    role: 'head-trainer',
    userId: 'rohit',
  };
   
    try {
      const count= await UserModel.countDocuments();
      console.log('count is -----', count);
      if (count === 0) {
       return await userRepository.create(user);
      }
    } catch (error) {
      console.log('error is created', error);
    }
};

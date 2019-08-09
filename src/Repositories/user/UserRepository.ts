import * as mongoose from 'mongoose';
import { IQueryGet } from './Entities';
import { UserModel } from './UserModel';
// import IUserModel  from './IUserModel';
export default class UserRepository {
    public UserModel;
    constructor() {
        this.UserModel = UserModel;
    }
    public get(query, projection,  option) {
        return UserModel.find(query, projection, option);
      //  .then((res) => {
      //       console.log('User Fetches:::',res);
      //  }
    }
    public findOne(query) {
      return UserModel.findOne(query).lean();
    }
    public create(data) {
       return UserModel.create(data);
      // .then((res) => {
        // console.log('User Created:::',res)
  //  })
    }
    public delete(data) {
        return UserModel.deleteOne(data);
      //  .then((res) => {
            // console.log('User Deleted:::',res)
       // })
     }
    public update( query, dataToupdate) {
        return UserModel.updateOne( query, dataToupdate);
       // .then((res) => {
            // console.log('User Updated:::',res)
       // })
    }
}

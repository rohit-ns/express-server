import * as mongoose from 'mongoose';
import { IQueryGet } from './Entities';
import { UserModel } from './UserModel';
// import IUserModel  from './IUserModel';
export default class UserRepository {
    public UserModel;
    constructor() {
        this.UserModel = UserModel;  
        //const User = mongoose.model<IUserModel>("User", UserSchema);
    }
    public get(query, projection,  options) {
        return UserModel.find(query, projection, options)
       // .then((res) => {
            //console.log('User Fetches:::',res)
      //  })
        
    }
    public create(data) {
       return UserModel.create(data)
      // .then((res) => {
        //console.log('User Created:::',res)
  //  })
    }
    public delete(data) {
        return UserModel.deleteOne(data)
      //  .then((res) => {
            //console.log('User Deleted:::',res)
       // })
     }
    public update( query, dataToupdate) {
        return UserModel.updateOne( query, dataToupdate)
       // .then((res) => {
            //console.log('User Updated:::',res)
       // })
    }
}

import * as mongoose from 'mongoose';
import { IQueryGet } from './Entities';
import { UserModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
    public UserModel;
    constructor() {
      super(UserModel);
    }
    public get(query, projection,  option) {
        return UserModel.find(query, projection, option);
    }
    public findOne(query) {
      return UserModel.findOne(query).lean();
    }
    public create(data) {
       return super.create(data);
    }
    public delete(data) {
        return UserModel.deleteOne(data);
    }
    public update( query, dataToupdate) {
        return UserModel.updateOne( query, dataToupdate);
    }
}

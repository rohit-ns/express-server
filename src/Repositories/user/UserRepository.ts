
import * as mongoose from 'mongoose';
import VersionableRepository from '../versionable/VersionableRepository';
import IUserModel from './IUserModel';
import { UserModel } from './UserModel';
export default class UserRepository extends VersionableRepository <IUserModel, mongoose.Model<IUserModel>> {
    private userModel: any;
    public constructor() {
            super( UserModel );
    }
    public get(query, projection)  {
        return super.get(query, projection);
    }
    public async findOne(query) {
         return await UserModel.findOne(query).lean();
    }
    public update(query, dataToUpdate) {
        return super.update(query, dataToUpdate);
    }
    public create(data,userId?) {
        return super.create(data,userId);
    }
    public delete(data) {
        return super.delete(data);
    }
    public getAll( query, projection, options) {
        return super.getAll(query, projection, options).sort([['name',1]]).lean();
    }
    // public count(query,options) {
    //     return super.count(query,options);
    // }
}

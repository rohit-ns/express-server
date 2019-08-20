
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
    public findOne(query) {
        return UserModel.findOne(query).lean();
    }
    public update(query, dataToUpdate) {
        return super.update(query, dataToUpdate);
    }
    public create(data) {
        return super.create(data);
    }
    public delete(data) {
        return super.delete(data);
    }
    public getAll( query, projection, options) {
        return super.getAll(query, projection, options).lean();
    }
}

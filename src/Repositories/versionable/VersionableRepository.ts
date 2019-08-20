import * as mongoose from 'mongoose';
import { DocumentQuery } from 'mongoose';
import UserRepository from './../../Repositories/user/UserRepository';

export default class VersionableRepository< D extends mongoose.Document, M extends mongoose.Model<D> > {
public static generateObjectId() {
    return String (mongoose.Types.ObjectId());
}
private modelType: M;
constructor(modelType) {
    this.modelType = modelType;
}
public async create(options): Promise<D> {   // promise D check,verify and create all schema details
    const id = await VersionableRepository.generateObjectId();
    const model = new this.modelType({
        ...options,
        _id: id,
        createdBy: options.userId,
        originalId: id,
        updatedBy: options.userId,
    });
    return model.save().then((record) => record.toObject());
    }
public async update(id, options) {
        let originalData;
        const userRepository = new UserRepository();
        const updateuser = await userRepository.findOne({ originalId: id, deletedAt: {$exists: false} })
        .then((data) => {
        if (!data) {
           return 'user not found';
        }
        originalData = data;
        })
            .then(() => {
            const id = VersionableRepository.generateObjectId();
            const modelCreate = new this.modelType({
            ...originalData,
            ...options,
            _id: id,
        });
            return this.modelType.create(modelCreate).then((record) => record.toObject());
        })
            .then(() => {
            const modelUpdate = new this.modelType({
               ...originalData,
               deletedAt: Date.now(),
            });
            console.log(modelUpdate);
            return this.modelType.updateOne(id, modelUpdate);
           })
           .catch((err) => {
            return err;
        });
        return updateuser;
   }
public async delete(id) {
    let originalData;
    const findDelete = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean();
    if (!findDelete) {
        throw Error('user not found in delete');
    }
    else {
        originalData = findDelete;
        const newId = originalData._id;
        const modelDelete = new this.modelType({
            ...originalData,
            deletedAt: Date.now(),
        });
        return this.modelType.updateOne({ _id: newId }, modelDelete);
    }
}
public get(query, projection) {
    return this.modelType.findOne(query, projection).lean();
}
public getAll( query, projection, options) {
    return this.modelType.find(query, undefined, options).populate('password').lean();
}

// public async update(options,query): Promise<D> {
//     const id = VersionableRepository
//     const model = new this.modelType({
//         ...options,
//         createdBy: options.userId,
//         updatedBy: options.userId,
//     });
//     return this.modelType.updateMany(query,model);
//     }
// public async delete(id,options): Promise<D> {
//         const id1 = VersionableRepository
//         const model = new this.modelType({
//             ...options,
//             deletedAt: Date.now(),
//            deletedBy: options.userId,
//         });
//         return this.modelType.deleteMany(id,options);
//     }
}

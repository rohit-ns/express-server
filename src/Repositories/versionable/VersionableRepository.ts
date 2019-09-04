import * as mongoose from 'mongoose';
import UserRepository from './../../Repositories/user/UserRepository';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
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
            createdBy: id,
            originalId: id,
        });
        return model.save().then((record) => record.toObject());
    }
    public async update(trid, options) {
        try {
            let originalData;
            const userRepository = new UserRepository();
            const updateUser = await userRepository.findOne({ originalId: trid, deletedAt: { $exists: false } });
            originalData = updateUser;
            const id = VersionableRepository.generateObjectId();
            const modelCreate = new this.modelType({
                ...originalData,
                ...options,
                _id: id,
            });
            const record = await this.modelType.create(modelCreate);
            await record.toObject();
            const newId = originalData.id;
            const modelUpdate = new this.modelType({
                ...originalData,
                deletedAt: Date.now(),
            });
            return this.modelType.updateOne({ _id: newId }, modelUpdate);
        }
        catch (error) {
            throw error;
        }
    }
    
    public async delete(id) {
        try {
            let originalData;
            const findDelete = await this.modelType.findOne({ originalId: id, deletedAt: { $exists: false } }).lean();
            originalData = findDelete;
            const newId = originalData._id;
            const modelDelete = new this.modelType({
                ...originalData,
                deletedAt: Date.now(),
            });
            return this.modelType.updateOne({ _id: newId }, modelDelete);
        } catch (error) {
            throw error
        }
    }

    public get(query, projection) {
        return this.modelType.findOne(query,'-__v -password', projection).lean();
    }

    public getAll(query, projection, options) {
        return this.modelType.find(query, '-__v -password -updatedAt', options).populate('password').lean();
    }
}

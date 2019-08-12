import * as mongoose from 'mongoose';
import { DocumentQuery } from 'mongoose';

export default class VersionableRepository< D extends mongoose.Document, M extends mongoose.Model<D> > {
public static generateObjectId() {
    return String (mongoose.Types.ObjectId());
}
private modelType: M;
constructor(modelType) {
    this.modelType = modelType;
}
public async create(options): Promise< D > {
    const id = VersionableRepository.generateObjectId();
    const model = new this.modelType({
        ...options,
        _id: id,
        createdBy: options.userId,
        originalId: id,
        updatedBy: options.userId,
    });
    return model.save().then((record) => record.toObject());
    }
}

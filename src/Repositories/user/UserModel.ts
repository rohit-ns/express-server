import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import UserSchema from './UserSchema';
const toConvert = {       // Set the id from the retrun object value which will be a string.
    transform: (doc, ret) => {     // transform for sending as json
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
    virtuals: true,
};
export const userSchema = new UserSchema({
    collection: 'User',
    toJSON: toConvert,
    toObject: toConvert,
});
export const UserModel: mongoose.Model< IUserModel > = mongoose.model< IUserModel >
(
    'User',
    userSchema,
    'Users',
    true,
);

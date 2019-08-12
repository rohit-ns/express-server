import * as mongoose from 'mongoose';
import VersionableSchema from '../versionable/VersionableSchema';
export default class UserSchema extends VersionableSchema {
    constructor(options: any) {
        const baseSchema = {
            _id: String,
            email: {
                required: true,
                type: String,
            },
            name: {
                required: true,
                type: String,
            },
            password: {
                required: true,
                type: String,
            },
        };
        super(baseSchema, options);
    }
}

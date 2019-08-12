import * as mongoose from 'mongoose';
import { stringify } from 'querystring';
export default class VersionableSchema extends mongoose.Schema {
    constructor(options: any, collections: any) {
        const versionedOptions = Object.assign({
            createdAt: {
                default: Date.now,
                type: Date,
                },
            createdBy: {
                default: 'HM00032',
                required: true,
                type: String,
            },
            deletedAt: {
                required: false,
                type: Date,
            },
            deletedBy: {
                optional: true,
                type: String,
            },
            originalId: {
                required: true,
                type: String,
            },
            updatedAt: {
                default: Date.now,
                required: true,
                type: String,
            },
            updatedBy: {
                default: 'HM00032',
                required: true,
                type: String,
            },
        }, options);
        super(versionedOptions, collections);

    }
}

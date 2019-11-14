import * as mongoose from 'mongoose';
import seedData from './seedData';
export class Database {
    public static async open(mongoUri) {     // connection of database
        const result= await mongoose.connect(mongoUri, {useNewUrlParser: true} );
            if (!result) {
            console.log('connection error', result);
            }
            console.log('Successfully Connected Mongoose');
            await seedData();

    }
    public static Disconnect() {      // disconnection of database
        mongoose.disconnect();
        console.log('Successfully Disconnect Mongoose');
    }
}

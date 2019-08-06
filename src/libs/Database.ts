import * as mongoose from 'mongoose';
class Database {
    static open(mongoUri){
        mongoose.connect(mongoUri, { useNewUrlParser: true }, (error) => {
            if(error)
            {
                console.log('database connection error');
            }
            console.log('Database Connected Successfully');  
            

        });
    }
    static close(){
        mongoose.disconnect();
        console.log('MONGO DB connection Closed')
    }
}

export default Database;
import * as mongoose from 'mongoose';
import seedData from './seedData';
const UserSchema = new mongoose.Schema( {
     name: String,
   });
const Kitten = mongoose.model('users', UserSchema);
class Database {
    public static open(mongoUri) {     // connection of database
        mongoose.connect(mongoUri, {useNewUrlParser: true} , (error) => {
            if (error) {
            console.log('connection error', error);
            }
            console.log('Successfully Connected Mongoose');
            seedData();
        });
    }
    public static Disconnect() {      // disconnection of database
        mongoose.disconnect();
        console.log('Successfully Disconnect Mongoose');
    }
}
// function playWithMango() {
//     saveKitten({name:'Trainning'})
//         .then(res => {
//             console.log('the response is ',res)
//             return Kitten.find({name:"Trainning"})
//         })
//         .then(res => {
//             console.log('kitten are ',res);
//         })
//         .then(()=>{
//             Database.Disconnect();
//         })
//         .catch(error => {
//             console.log('the response is ',error);
//         })
// }

// function saveKitten (data){
//     return new Promise((resolve,reject) => {
//         const kitty = new Kitten(data);
//         kitty.save((error,res) => {
//             if(error){
//                 return reject(error);
//             }
//             resolve(res);
//         })
//     })
// }
export default Database;

import UserRepository from '../Repositories/user/UserRepository';
import Database from './Database';
const userRepository = new UserRepository();
export default () => {
    console.log('Inside Seed Data');
    const user = {
        email: 'user1@gmail.com',
        name : 'user1',
    };
    userRepository.create(user)
    .then((res) => {
       console.log('User Created',res);
    })
    userRepository.update({ name: 'user1'}, {name: 'Ram'})
    .then((res) =>{
        console.log('Updated Data:::',res); 
    })
    userRepository.get({name:'user1'},null,null)
    .then((res) => {
        console.log('Data Fetches',res);
    })
    userRepository.delete({email: 'user'})
    .then((res) => {
        console.log('User Delete',res);
    })
    // .then(() => {
    //    Database.Disconnect();
    // })
    .catch((err) => {
        console.log('Error Occured', err);
    });

}


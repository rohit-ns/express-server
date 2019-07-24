import validateEmail from  '.././utils/helpers';
export default function validateUser(new_users) {
    let validuser = [];
    let invaliduser = [];

 new_users.forEach(function(user)  {
 const { traineeEmail: a, reviewerEmail:b } = user; //using destructuring assign value to a,b
    if (validateEmail(a))  {
    validuser.push(a);
    } else {
    invaliduser.push(a);
    }
    if (validateEmail(b)) {
    validuser.push(b);
    }
    else {
    invaliduser.push(b);
    }
}   );
    console.log("\nThe names of valid users are :\n " + validuser + " \nThe count of valid user is:\n " + validuser.length);
    console.log("\nThe names of invalid users are :\n " + invaliduser + " \nThe count of invalid user is:\n " + invaliduser.length);
}
    
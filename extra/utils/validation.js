import validateEmail from  '.././utils/helpers';
export default function validateUser(newusers) {
    let validuser = [];
    let invaliduser = [];

 newusers.forEach(function(user)  {
 const { traineeEmail, reviewerEmail } = user; //using destructuring assign value to a,b
    if (validateEmail(traineeEmail))  {
    validuser.push(traineeEmail);
    } else {
    invaliduser.push(traineeEmail);
    }
    if (validateEmail(reviewerEmail)) {
    validuser.push(reviewerEmail);
    }
    else {
    invaliduser.push(reviewerEmail);
    }
}   );
    console.log("\nThe names of valid users are :\n " + validuser + " \nThe count of valid user is:\n " + validuser.length);
    console.log("\nThe names of invalid users are :\n " + invaliduser + " \nThe count of invalid user is:\n " + invaliduser.length);
}
    

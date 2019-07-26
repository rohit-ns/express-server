import validateEmail from '.././utils/helpers';
export default function validateUser(newusers: any) {
  const validuser: string[] = [];
  const invaliduser: string[] = [];
  newusers.forEach( (user: any) => {
    const { traineeEmail, reviewerEmail } = user;
    if (validateEmail(traineeEmail)) {
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
  });
  console.log('names of valid users are :\n ' + validuser +  '\ncount of valid user is:\n ' + validuser.length);
  console.log('names of invalid users are :\n ' + invaliduser + ' \ncount of invalid user is:\n ' + invaliduser.length);
}

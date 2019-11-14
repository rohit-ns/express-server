export default function validateEmail(email) 
{
    let regexEmail=/^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@successive.tech$/
    return regexEmail.test(email)
    
} 
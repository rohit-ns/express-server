// import { isObject } from 'util';
// const validationHandler = (config) => ( req , res , next ) => {
//     console.log('config is', config);
//     const body = 'body';
//     console.log('Request body::::',req[body]);
//  //   console.log('Config keys are:::::', Object.keys[config]);
//     console.log('Inside validationHandler');
// // config.id.custom(req.body.id);
// // config['id'].custom(req['body']['id']);
//     for (const key in config) {
//     if (req.method === 'POST') {
//         console.log('Inside Post');
//         if (key in req['body'] && key === 'id') {
//             if (typeof req['body']['id'] === 'string') {
//                     console.log('Yes ID is string');
//             }
//             else {
//                 console.log('No ID is not string');
//                 next({
//                     error: 'Wrong type',
//                     message: 'ID should be string only',
//                     status: 400,
//                 });
//             }
//         }
//         else if (key in req['body'] && key === 'name') {
//                 const regexs = new RegExp(config['name']['regex']);
//                 if (regexs.test(req['body']['name'])) {
//                     console.log('Name is corrrect');
//                 } else {
//                     next({
//                         error: 'Wrong type',
//                         message: 'name can only be alphanumeric',
//                         status: 400,
//                     });
//                     console.log('Error in name');
//                 }
//         }
//         else {
//                 console.log('Error');
//                 next({
//                     error: 'Wrong Input',
//                     message: 'ID and name both should be given',
//                     status: 404,
//                 });
//             }
//         }
//     }

//     if (req.method === 'DELETE') {
//         console.log('In Delete method');
//         const key = Object.keys(req.query)[0];
//         const keyCheck = new RegExp('^[0-9]*$');
//         if (keyCheck.test(key)) {
//             console.log('Key is deleted');
//         } else {
//             console.log('you need to pass key in parameters');
//             next({
//                 error: config['id']['errorMessage'],
//                 message: 'Key must be number',
//                 status: 404,
//             });
//         }
//     }
//     if (req.method === 'GET') {
//         console.log('In GET method');
//         for (const key in config) {
//         if (req['query'] === null) {
//             console.log('default value 0');
//         }
//          else {
//                 if (key === 'skip') {
//                     const keyName = Object.keys(req.query)[0];
//                     const check = req['query'][keyName];
//                     const keyCheck = new RegExp('^[0-9]*$');
//                     if (keyCheck.test(check)) {
//                         console.log('It is number');
//                     } else {
//                         console.log('It is not number');
//                         next({
//                             error: config['skip']['errorMessage'],
//                             message: 'skip value must be number',
//                             status: 400,
//                         });
//                     }
//                 }
//                 if (key === 'limit') {
//                     const keyName = Object.keys(req.query)[0];
//                     const check = req['query'][keyName];
//                     const keyCheck = new RegExp('^[0-9]*$');
//                     if (keyCheck.test(check)) {
//                         console.log('It is number');
//                     } else {
//                         console.log('It is not number');
//                         next({
//                             error: config['limit']['errorMessage'],
//                             message: 'limit value must be number',
//                             status: 400,
//                         });
//                     }
//                 }
//             }
//         }
//     }

//     if (req.method === 'PUT') {
//         console.log('In PUT method');
//         for (const key in config) {
//             if (key in req['body'] && key === 'id') {
//                 if (typeof req['body']['id'] === 'string') {
//                     console.log('Yes ID is string');
//                 } else {
//                     console.log('No ID is not string');
//                     next({
//                         error: 'Wrong type',
//                         message: 'ID should be string only',
//                         status: 400,
//                     });
//                 }
//             } else if (key in req['body'] && key === 'dataToUpdate') {
//                 console.log('key is dataToupdate');
//                 // req['body']['dataToUpdate'];
//                 if (isObject(req['body']['dataToUpdate'])) {
//                     console.log('yes dataToUpdate is Object');
//                 } else {
//                     next({
//                         error: 'Wrong type',
//                         message: 'dataToUpdate should be object only',
//                         status: 400,
//                     });
//                 }
//             } else {
//                 next({
//                     error: 'Wrong Input',
//                     message: 'ID and dataToUpdate both should be given',
//                     status: 404,
//                 });
//             }
//         }
//     }
//     next();
// };
// export default validationHandler;
import { isObject } from 'util';
const validationHandler = (config) => (req, res, next) => {
    for (const key in config) {
        if (true) {
            const dataPlace = config[key].in[0];
            for (const keyProperty in config[key]) {
                if (true) {
                    switch (keyProperty) {
                        case 'required':
                        console.log('in required', req.body);
                        if ((key in req[dataPlace]) && req[dataPlace][key] !== undefined) {
                            break;
                        }
                        else if (config[key][keyProperty] === false) {
                            dataPlace.forEach((inKey) => {
                                console.log('inkey', inKey);
                                req[inKey][key] = config[key].default;
                            });
                        } else {
                            next({
                            error: 'Wrong type gg',
                            message: `${key} is required`,
                            status: 400,
                            });
                        }
                        break;
                        case 'string':
                        const value = req[dataPlace][key];
                        if (typeof value === 'string' && value !== '') {
                            console.log('Yes it is String');
                        } else {
                            console.log('No it is not string');
                            next({
                                error: 'Wrong type',
                                message: `${key} should be string only`,
                                status: 400,
                            });
                        }
                        break;
                        case 'regex':
                        const regexs = new RegExp(config[key][keyProperty]);
                        if (regexs.test(req[dataPlace][key])) {
                            console.log(`${key} is correct`);
                        } else {
                            next({
                            error: 'Wrong type',
                            message: `${key} is not correct`,
                            status: 400,
                            });
                            console.log(`Error in ${key}`);
                        }
                        break;
                        case 'number':
                        const check = req[dataPlace][key];
                        if (!isNaN(Number(check))) {
                            console.log('It is number');
                        } else {
                            console.log('It is not number');
                            next({
                            error: config[key].errorMessage,
                            message: `${key} value must be number`,
                            status: 400,
                            });
                        }
                        break;
                        case 'isObject':
                        console.log('in isObject');
                        if (isObject(req[dataPlace][key])) {
                            console.log(`${key} is Object`);
                        } else {
                            console.log(`${key} must be an object`);
                            next({
                            error: 'Wrong Input',
                            message: `${key} should be Object only`,
                            status: 404,
                            });
                        }
                        break;
                        case 'custom':
                        console.log('In custom');
                        config[key].custom(req[dataPlace][key]);
                        break;
                        default:
                        console.log('Some error');
                        break;
                    }
                }
                }
            next();
        }
    }
};
export default validationHandler;

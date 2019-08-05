import { isObject } from "util";
const validationHandler = (config) => ( req , res , next ) => {
    console.log('config is', config);
    const body ='body';
    console.log(req[body]);
    console.log('Config keys are:::::',Object.keys[config]);
//config.id.custom(req.body.id);
//config['id'].custom(req['body']['id']);
    if (req.method === 'POST') {
        for (const key in config) {
            console.log('Inside Post');
            if (key in req['body'] && key === 'id') {
                if (typeof req['body']['id'] === 'string') {
                    console.log('Yes ID is string');
                } else {
                    console.log('No ID is not string');
                    next({
                        status: 400,
                        error: 'Wrong type',
                        message: 'ID should be string only'
                    });
                }
            } else if (key in req['body'] && key === 'name') {
                const regexs = new RegExp(config['name']['regex']);
                if (regexs.test(req['body']['name'])) {
                    console.log('Name is corrrect');
                } else {
                    next({
                        status: 400,
                        error: 'Wrong type',
                        message: 'name can only be alphanumeric'
                    });
                    console.log('Error in name');
                }
            } else {
                console.log('Error');
                next({
                    status: 404,
                    error: 'Wrong Input',
                    message: 'ID and name both should be given'
                });
            }
        }
    }

    if (req.method === 'DELETE') {
        console.log("In Delete method");
        const key = Object.keys(req.query)[0];
        const keyCheck = new RegExp('^[0-9]*$')
        if (keyCheck.test(key)) {
            console.log('Key is deleted');
        } else {
            console.log('you need to pass key in parameters');
            next({
                status: 404,
                error: config['id']['errorMessage'],
                message: 'Key must be number'
            });
        }
    }

    if (req.method === 'GET') {
        console.log("In GET method");
        if (req['query'] === null) {
            
        } else {
            for (const key in config) {
                if (key === 'skip') {
                    const keyName = Object.keys(req.query)[0];
                    const check = req['query'][keyName];
                    const keyCheck = new RegExp('^[0-9]*$')
                    if (keyCheck.test(check)) {
                        console.log('It is number');
                    } else {
                        console.log('It is not number');
                        next({
                            status: 400,
                            error: config['skip']['errorMessage'],
                            message: 'skip value must be number'
                        });
                    }
                }
                if (key === 'limit') {
                    const keyName = Object.keys(req.query)[0];
                    const check = req['query'][keyName];
                    const keyCheck = new RegExp('^[0-9]*$')
                    if (keyCheck.test(check)) {
                        console.log('It is number');
                    } else {
                        console.log('It is not number');
                        next({
                            status: 400,
                            error: config['limit']['errorMessage'],
                            message: 'limit value must be number'
                        });
                    }
                }
            }
        }
    }

    if (req.method === 'PUT') {
        console.log("In PUT method");
        for (const key in config) {
            if (key in req['body'] && key === 'id') {
                if (typeof req['body']['id'] === 'string') {
                    console.log('Yes ID is string');
                } else {
                    console.log('No ID is not string');
                    next({
                        status: 400,
                        error: 'Wrong type',
                        message: 'ID should be string only'
                    });
                }
            } else if (key in req['body'] && key === 'dataToUpdate') {
                console.log('key is dataToupdate');
                req['body']['dataToUpdate']
                if (isObject(req['body']['dataToUpdate'])) {
                    console.log("yes dataToUpdate is Object");
                } else {
                    next({
                        status: 400,
                        error: 'Wrong type',
                        message: 'dataToUpdate should be object only'
                    });
                }
            } else {
                next({
                    status: 404,
                    error: 'Wrong Input',
                    message: 'ID and dataToUpdate both should be given'
                });
            }
        }
    }

    console.log('Inside validationHandler');
    next();
}

//     export default validationHandler;
// switch(req.method) {
// case 'POST':
//     console.log('INSIDE POST');
// for (let key in config) {
//  if( key in req[body] && key== 'id') {
//      console.log('INSIDE ID');
//  if(typeof req['body']['name']== 'string' ){
//     console.log('id ok');
// }
// else{
//     next('id is required');
// }
//  }
//  else if (key in req[body] && key=='name') {
//     console.log('INSIDE NAME');
//     if(typeof req['body']['name']== 'string' ) { 
//         console.log('name ok');
//     }
//     else{
//         next('name in string format');
//     }
//   }
// else {
//     next('');
// } };
// break;

// case 'DELETE':
//         console.log('INSIDE DELETE');
//     for (let key in config) {
//      if( key in req['query'] && key== 'id') {
//          console.log('INSIDE ID');
//     }
//     else{
//         next('id is required');
//     }
//  };
// break;
// case 'GET':
//     if(req['query']==null) {
//         console.log('need required')
//     }else {
//         console.log('INSIDE GET');
//     for (let key in config) {
//       if( key== 'skip') {
//          console.log('INSIDE GET SKIP');
//     //  if(typeof req['body']['skip']== 'number' ){
//     //     console.log('id skip ok');
//     const check = Object.keys(req.query)[0];
//     const keycheck = new RegExp('^[0-9]*$')
//     if(keycheck.test(check)) {
//         console.log('it is number');
//     }

//     }
//     else{
//         next('skip is required');
//     }
// }
//      else if (key in req['query'] && key=='limit') {
//         console.log('INSIDE NAME');
//         if(typeof req['body']['limit']== 'string' ) { 
//             console.log('name ok');
//         }
//         else{
//             next('name in string format');
//         }
//       }
//     else {
//         next('');
//     }} };
//     break;

// case 'UPDATE':
//         console.log('INSIDE UPDATE');
//     for (let key in config) {
//      if( key in req[body] && key== '') {
//          console.log('INSIDE ID');
//      if(typeof req['body']['name']== 'string' ){
//         console.log('id ok');
//     }
//     else{
//         next('id is required');
//     }
//      }
//      else if (key in req[body] && key=='id') {
//         console.log('INSIDE ID');
//         if(typeof req['body']['name']== 'string' ) { 
//             console.log('name ok');
//         }
//         else{
//             next('name in string format');
//         }
//       }
//     else {
//         next('');
// //     } };
//     break;
// }
// next();
// }
export default validationHandler;

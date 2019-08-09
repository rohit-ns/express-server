import { isObject } from 'util';
const validationHandler = (config) => ( req , res , next ) => {
    console.log('config is', config);
    const body = 'body';
    console.log(req[body]);
    console.log('Config keys are:::::', Object.keys[config]);
// config.id.custom(req.body.id);
// config['id'].custom(req['body']['id']);
    for (const key in config) {
    if (req.method === 'POST') {
        console.log('Inside Post');
        if (key in req['body'] && key === 'id') {
            if (typeof req['body']['id'] === 'string') {
                    console.log('Yes ID is string');
            }
            else {
                console.log('No ID is not string');
                next({
                    error: 'Wrong type',
                    message: 'ID should be string only',
                    status: 400,
                });
            }
        }
        else if (key in req['body'] && key === 'name') {
                const regexs = new RegExp(config['name']['regex']);
                if (regexs.test(req['body']['name'])) {
                    console.log('Name is corrrect');
                } else {
                    next({
                        error: 'Wrong type',
                        message: 'name can only be alphanumeric',
                        status: 400,
                    });
                    console.log('Error in name');
                }
        }
        else {
                console.log('Error');
                next({
                    error: 'Wrong Input',
                    message: 'ID and name both should be given',
                    status: 404,
                });
            }
        }
    }

    if (req.method === 'DELETE') {
        console.log('In Delete method');
        const key = Object.keys(req.query)[0];
        const keyCheck = new RegExp('^[0-9]*$');
        if (keyCheck.test(key)) {
            console.log('Key is deleted');
        } else {
            console.log('you need to pass key in parameters');
            next({
                error: config['id']['errorMessage'],
                message: 'Key must be number',
                status: 404,
            });
        }
    }
    if (req.method === 'GET') {
        console.log('In GET method');
        for (const key in config) {
        if (req['query'] === null) {
            console.log('default value 0');
        }
         else {
                if (key === 'skip') {
                    const keyName = Object.keys(req.query)[0];
                    const check = req['query'][keyName];
                    const keyCheck = new RegExp('^[0-9]*$');
                    if (keyCheck.test(check)) {
                        console.log('It is number');
                    } else {
                        console.log('It is not number');
                        next({
                            error: config['skip']['errorMessage'],
                            message: 'skip value must be number',
                            status: 400,
                        });
                    }
                }
                if (key === 'limit') {
                    const keyName = Object.keys(req.query)[0];
                    const check = req['query'][keyName];
                    const keyCheck = new RegExp('^[0-9]*$');
                    if (keyCheck.test(check)) {
                        console.log('It is number');
                    } else {
                        console.log('It is not number');
                        next({
                            error: config['limit']['errorMessage'],
                            message: 'limit value must be number',
                            status: 400,
                        });
                    }
                }
            }
        }
    }

    if (req.method === 'PUT') {
        console.log('In PUT method');
        for (const key in config) {
            if (key in req['body'] && key === 'id') {
                if (typeof req['body']['id'] === 'string') {
                    console.log('Yes ID is string');
                } else {
                    console.log('No ID is not string');
                    next({
                        error: 'Wrong type',
                        message: 'ID should be string only',
                        status: 400,
                    });
                }
            } else if (key in req['body'] && key === 'dataToUpdate') {
                console.log('key is dataToupdate');
                // req['body']['dataToUpdate'];
                if (isObject(req['body']['dataToUpdate'])) {
                    console.log('yes dataToUpdate is Object');
                } else {
                    next({
                        error: 'Wrong type',
                        message: 'dataToUpdate should be object only',
                        status: 400,
                    });
                }
            } else {
                next({
                    error: 'Wrong Input',
                    message: 'ID and dataToUpdate both should be given',
                    status: 404,
                });
            }
        }
    }

    console.log('Inside validationHandler');
    next();
};
export default validationHandler;

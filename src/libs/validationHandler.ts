import { isObject } from 'util';
const validationHandler = (config) => (req, res, next) => {
    for (const key in config) {
        const dataPlace = config[key].in;
        console.log('>>>>>>>>>',dataPlace);
        for (const keyProperty in config[key]) {
            switch (keyProperty) {
                case 'required':
                    if ((key in req[dataPlace]) && req[dataPlace][key] !== null) {
                        break;
                    }
                    else if (config[key][keyProperty] === false) {
                        dataPlace.forEach((inKey) => {
                            req[inKey][key] = config[key].default;
                        });
                    }
                    else {
                        next({
                            error: 'error',
                            message: `${key} is required`,
                            status: 422,
                        });
                    }
                    break;
                case 'string':
                    const value = req[dataPlace][key];
                    if (typeof value !== 'string' && value !== '') {
                        next({
                            error: 'Wrong type',
                            message: `${key} should be string only`,
                            status: 422,
                        });
                    }
                    break;
                case 'regex':
                    const regexs = new RegExp(config[key][keyProperty]);
                    if (!regexs.test(req[dataPlace][key])) {
                        next({
                            error: 'Wrong type',
                            message: `Enter ${key} in correct format`,
                            status: 422,
                        });
                    }
                    break;
                case 'number':
                    const check = req[dataPlace][key];
                    if (isNaN(Number(check))) {
                        next({
                            error: config[key].errorMessage,
                            message: `${key} value must be number`,
                            status: 422,
                        });
                    }
                    break;
                case 'isObject':
                    if (!isObject(req[dataPlace][key])) {
                        next({
                            error: 'Wrong Input',
                            message: `${key} should be Object only`,
                            status: 400,
                        });
                    }
                    break;
                case 'custom':
                    config[key].custom(req[dataPlace][key]);
                    break;
                default:
                    break;
            }
        }
    }
    next();
};
export default validationHandler;
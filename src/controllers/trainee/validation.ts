import validateEmail from '../../../extraTs/utils/helpers';

const validation = {
    create:
    {
        name: {
            required: true,
            custom: (name) => {
                if (!name) {
                    return 'Name cannot be empty'
                }
            },
            in: ['body'],
            regex: '^[a-z A-Z_0-9]+$',
            errorMessage: 'Name is required',
        },
        email: {
            required: true,
            custom: (email) => {
                if (!email) {
                    return 'Email cannot be empty'
                }
            },
            in: ['body'],
            regex: '^[^.+-_][a-zA-Z0-9._]+@successive.tech$',
        },
        password: {
            required: true,
            in: ['body'],
            errorMessage: 'Password is required',
            custom: (password) => {
                if (!password) {
                    return 'Password cannot be empty';
                }
            },
        },
    },
    delete: {
        id: {
            required: true,
            in: ['params'],
            errorMessage: 'Id is required',
        },
    },
    get:
    {
        limit: {
            required: false,
            in: ['query'],
            number: true,
            default: 10,
            errorMessage: 'Limit is invalid',
        },
        skip: {
            required: false,
            in: ['query'],
            number: true,
            default: 0,
            errorMessage: 'Skip is invalid',
        },

    },
    update: {
        id: {
            required: true,
            in: ['body'],
            string: true,
        },
        dataToUpdate: {
            required: true,
            custom: (dataToUpdate) => {
                const regex = /^[a-z A-Z]+$/;
                if (('name' in dataToUpdate && !dataToUpdate.name) && !regex.test(dataToUpdate.name)) {
                    throw ({
                        error: 'Bad Request',
                        message: 'Enter name in correct form',
                        status: 422,
                    });
                }
                if ('email' in dataToUpdate && !dataToUpdate.email && !validateEmail(dataToUpdate.email)) {
                    throw ({
                        error: 'Bad Request',
                        message: 'Email cannot be empty',
                        status: 422,
                    });
                }
                if ('email' in dataToUpdate && !validateEmail(dataToUpdate.email)) {
                    throw ({
                        error: 'Bad Request',
                        message: 'Email is not in correct format',
                        status: 422,
                    });
                }

                if ('password' in dataToUpdate && !dataToUpdate.password) {
                    throw ({
                        error: 'Bad Request',
                        message: 'Password cannot be empty',
                        status: 422,
                    });
                }

            },
            in: ['body'],
            isObject: true,
        },
    },
};
export default validation;


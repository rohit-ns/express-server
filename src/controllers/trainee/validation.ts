import validateEmail from '../../../extraTs/utils/helpers';

const validation = {
    create:
    {
        name: {
            required: true,
            in: ['body'],
            regex: '^[a-z A-Z_0-9]+$',
            errorMessage: 'Name is required',
        },
        email: {
            custom: (email) => {
                if (email === '') {
                    throw new Error('Email cannot be empty ');
                }
            },
            required: true,
            in: ['body'],
            regex: '^[^.+-_][a-zA-Z0-9._]+@successive.tech$',
        },
        password: {
            required: true,
            in: ['body'],
            errorMessage: 'Password is required',
            custom: ( password ) => {
                if ( !password ) {
                    throw ({
                        error: 'Invalid input',
                        message: 'Password cannot be empty',
                        status: 422,
                    });
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
            in: ['body'],
            isObject: true,
            custom: ((dataToUpdate) => {
                const regex = /^[a-z A-Z]+$/;
                if (('name' in dataToUpdate && !dataToUpdate.name) && !regex.test(dataToUpdate.name)) {
                    throw ({
                        error: 'Invalid input',
                        message: 'Enter name in correct form',
                        status: 422,
                    });
                }
                if ('email' in dataToUpdate && !dataToUpdate.email && !validateEmail(dataToUpdate.email)) {
                    throw ({
                        error: 'Invalid input',
                        message: 'Email cannot be empty',
                        status: 422,
                    });
                }
                if ('email' in dataToUpdate && !validateEmail(dataToUpdate.email)) {
                    throw ({
                        error: 'Invalid input',
                        message: 'Email is not in correct format',
                        status: 422,
                    });
                }

                if ('password' in dataToUpdate && !dataToUpdate.password) {
                    throw ({
                        error: 'Invalid input',
                        message: 'Password cannot be empty',
                        status: 422,
                    });
                }

            }),
        },
    },
};
export default validation;


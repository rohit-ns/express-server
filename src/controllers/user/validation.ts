import validateEmail from '../../../extraTs/utils/helpers';
const validation = {
    create: {
        email: {
            required: true,
            custom: (email) => {
                if (!email) {
                    return 'Email cannot be empty'
                }
            },
            errorMessage: 'Email is required',
            in: ['body'],
            regex: '^[^.+-_][a-zA-Z0-9._]+@successive.tech$',

        },
        password: {
            required: true,
            errorMessage: 'Password is required',
            in: ['body'],
            custom: ( password ) => {
                if ( !password ) {
                    return 'Password cannot be empty';
                }
            },

        },
    },
    delete: {
        id: {
            required: true,
            errorMessage: 'Id is required',
            in: ['params'],
        },
    },
    
    get: {
        limit: {
            required: false,
            default: 10,
            errorMessage: 'Limit is invalid',
            in: ['query'],
            number: true,
        },
        skip: {
            required: false,
            default: 0,
            errorMessage: 'Skip is invalid',
            in: ['query'],
            number: true,
        },
    },

    update: {
        dataToUpdate: {
            custom: (dataToUpdate) => {
                console.log('');
            },
            in: ['body'],
            isObject: true,
            required: true,
        },
        id: {
            in: ['body'],
            required: true,
            string: true,
        },
    },
};
export default validation;

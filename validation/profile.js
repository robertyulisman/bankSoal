const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
        let errors = {};

        data.handle = !isEmpty(data.handle) ? data.handle : '';
        // data.name = !isEmpty(data.name) ? data.name : '';
        // data.contact = !isEmpty(data.contact) ? data.contact : '';
        // data.email = !isEmpty(data.email) ? data.email : '';

        if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
                errors.handle = 'handle needs to between 2 and 40 charachters';
        }

        if (Validator.isEmpty(data.handle)) {
                errors.handle = 'profile handle is required';
        }
        // if (Validator.isEmpty(data.name)) {
        //         errors.name = 'name handle is required';
        // }

        // if (Validator.isEmpty(data.contact)) {
        //         errors.contact = 'contact handle is required';
        // }
        // if (Validator.isEmpty(data.email)) {
        //         errors.email = 'email handle is required';
        // }

        return {
                errors,
                isValid: isEmpty(errors),
        };
};

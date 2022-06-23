const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegister(data) {
    let errors = {};
    console.log("data" , data)
    data.email = !isEmpty(data.email) ? data.email : '';
 
    
    if(Validator.isEmpty(data.fullname)) {
        errors.fullname = 'FullName field is required';
    }

    
    if(Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender field is required';
    }

    if(Validator.isEmpty(data.date)) {
        errors.date = 'Date  field is required';
    }

    if(Validator.isEmpty(data.month)){
        errors.month =" Month Field us required "
    }

    
    if(Validator.isEmpty(data.Specilist)) {
        errors.Specilist = 'Specilist field is required';
    }

    if(Validator.isEmpty(data.options)) {
        errors.options = 'Options field is required';
    }

    
    if(Validator.isEmpty(data.pay)) {
        errors.pay = 'Pay field is required';
    }
    if(Validator.isEmpty(data.paysedul)) {
        errors.paysedul = 'Payshedule field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
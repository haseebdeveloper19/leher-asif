const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegister(data) {
    let errors = {};
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    // data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.cnic = !isEmpty(data.cnic) ? data.cnic : "";
    data.mobile =!isEmpty(data.mobile) ? data.mobile: "";
    // data.dateofbirth = isEmpty( data.dateofbirth ) ? data.dateofbirth :"";
    // data.specil =!isEmpty(data.specil) ? data.specil: "";
    // data.joinAs =!isEmpty(data.joinAs) ? data.joinAs: "";
    // data.email =!isEmpty(data.email) ? data.email: "";
    data.address =!isEmpty(data.address) ? data.address: "";



    

    if(!Validator.isLength(data.fname, { min: 2, max: 30 })) {
        errors.fname = 'Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.fname)) {
        errors.fname = 'Name field is required';
    }
    if(!Validator.isLength(data.lname, { min: 2, max: 30 })) {
        errors.lname = 'Last Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.lname)) {
        errors.lname = 'Last Name field is required';
    }

    // if(Validator.isEmpty(data.dateofbirth)) {
    //     errors.dateofbirth = 'Date of Birth field is required';
    // }
    
 
    if(!Validator.isLength(data.cnic, { min: 1, max: 15 })) {
        errors.cnic = 'cnic must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.cnic)) {
        errors.cnic = 'Cnic field is required';
    }

    if(!Validator.isLength(data.mobile, { min: 1, max: 15 })) {
        errors.mobile = 'Mobile must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.mobile)) {
        errors.mobile = 'Mobile field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
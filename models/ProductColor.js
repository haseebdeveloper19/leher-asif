const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StaffSchema = new Schema({

    product_price:{
        type:String,
        required:true
    },
    Catagory: {
        type: String,
        required: true
    },
    Avaliable_Quantity: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Size: {
        type: String,
        required: true
    },
    media: {
        type: Array,
        required: true
    },
    total: {
        type: String,
    },
    User :{
        type : String,
    },
    loading :{
        type : Boolean,
        default : false 
    },
     SuccessMesg : {
       type : Boolean ,
       default : false,
     },
    date: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', StaffSchema);

module.exports = Product;
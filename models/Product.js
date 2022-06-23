const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    ProductId: {
        type: String,
        required: true
    },
    ProductName: {
        type: String,
        required: true
    },
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
    Quantity:{
        type: Number,
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
        type: String,
        required: true
    },
   
    real_price: {
        type: String,
    },

    date: {
        type: Date,
        
    }
});

const Product = mongoose.model('Product', StaffSchema);

module.exports = Product;
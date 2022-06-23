const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SliderSchema = new Schema({
    title1: {
        type: String,
       
    },
    title2:{
        type:String,
        
    },
    title3 : {
        type : String ,
        
    },
    title4 :{
        type : String,
        
    },
    desc1 :{
        type : String ,
        
    },
    desc2:{
        type : String,
        
    },
    desc3:{
        type : String,
        
    },
    desc4:{
        type : String,
        
    },
    picture:{
        type : Array,
        required : true
    },
    
    date: {
        type: Date,
        default: Date.now
    }
});

const Slider = mongoose.model('slider', SliderSchema);

module.exports = Slider;
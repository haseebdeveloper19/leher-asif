const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WebSchema = new Schema({

    visiters : {
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});





const Webcount = mongoose.model('webcounter', WebSchema);


module.exports = Webcount;
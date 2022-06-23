const mongoose = require('mongoose');

const Schema = mongoose.Schema

const StaffSchema = new Schema({

    event_date: {
        type: String,
        // required: true
    },
    eventname: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },

    status :{
        type : String,
        default : "latest"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', StaffSchema);
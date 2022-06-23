const mongoose = require('mongoose');

const Schema = mongoose.Schema

const StaffSchema = new Schema({
    Products: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Cart', StaffSchema);

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let vehicleSchema = new Schema(
{
    type: {
        type: String,
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1900, max: 2018,
        required: true
    },
    gearbox: {
        type: String,
        enum: ['manuell', 'automat']
    },
    license: {
        type: String,
        enum: ['A1', 'A2', 'AM', 'B', 'BE', 'C', 'CE', 'C1', 'C1E', 'D', 'D1E', 'Utökad B']
    },
    price: {
        type: Number,
        min: 0,
        max: 1e4,
        required: true
    },
    image: {
        type: String,
    },
    bookable: {
        type: Boolean,
        default: true
    },
    note: {
        type: String,
        trim: true
    }

});

module.exports = mongoose.model('Vehicle', vehicleSchema);
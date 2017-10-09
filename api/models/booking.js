
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// kom ihåg att lägga till && vehicle.bookable så att vi inte listar fordon som ej är tillgängliga för uthyrning
// check date conflicts!
let bookingSchema = new Schema(
{
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    name: {
        type: 'String'
    },
    dateFrom: {
        type: Date,
        required: true
    },
    dateTill: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
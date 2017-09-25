
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let actorSchema = new Schema(
{
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        },
    }
}).index(
    {"name.first": 1, "name.last": 1},
    { "unique": true }
);

module.exports = mongoose.model('Actor', actorSchema);

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let movieSchema = new Schema(
{
    title: String,
    year: {
        type: Number,
        min: 1800,
        max: 2018
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    genres: [String],
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }]
});

module.exports = mongoose.model('Movie', movieSchema);
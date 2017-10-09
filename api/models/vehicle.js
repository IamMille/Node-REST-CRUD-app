
let fetch = require('node-fetch');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let vehicleSchema = new Schema(
{
    type: {
        type: String,
        required: true
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
    fuel: {
      type: String,
      enum: ['95', 'E85', 'diesel', 'gas', 'jetbränsle']
    },
    gearbox: {
        type: String,
        enum: ['manuell', 'automat']
    },
    license: {
        type: String,
        enum: ['A', 'A1', 'A2', 'AM', 'B', 'BE', 'C', 'CE', 'C1', 'C1E', 'D', 'D1E', 'Utökad B']
    },
    price: {
        type: Number,
        min: 0,
        max: 1e4,
        required: true
    },
    image: {
        type: String,
        validate: isWorkingImageURL,
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

vehicleSchema.pre('validate', (next) =>
{
    console.log("pre validate");

    fetch(url, {method:'HEAD'})
        .then(resp =>
        {
            let contentTypes = resp.headers.getAll('Content-Type');
            let isValidType = (type) => type.indexOf('image') > -1; // image/jpeg

            if (contentTypes.some(isValidType)) {
                console.log("pre save: ok!");
                next();
            }
            else next(new Error('URL returns wrong Content-Type'));
        })
        .catch(error => {
            console.log("isWorkingUrl error:", error);
            next(new Error('URL check returned an error: ' + error))
        });
});
function isWorkingImageURL(url)
{
    return new Promise( (resolve, reject) =>
    {
        // validate url
        let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if (!url || url.length === 0) resolve();
        else if (regex.test(url)) resolve();
        else reject();

        /*
        // validate content-type
        fetch(url, {method:'HEAD'})
            .then(resp =>
            {
                let contentTypes = resp.headers.getAll('Content-Type');
                let isValidType = (type) => type.indexOf('image') > -1; // image/jpeg

                if (contentTypes.some(isValidType)) resolve(true);
                else reject('URL returns wrong Content-Type');
            })
            .catch(error => {
                console.log("isWorkingUrl error:", error);
                reject('URL check returned an error: ' + error)
            });
         */

    });
}
module.exports = mongoose.model('Vehicle', vehicleSchema);
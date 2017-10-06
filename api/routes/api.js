const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// The root here is served on /api
// ===============================

router.get('/', (req, res) => {
    res.end('This is the api root');
});

/*
    THROUGHOUT THE CODE WE ARE USING THE FOLLOWING

    // dynamic model
    let Model = require('../models/' + req.params.model); // http://localhost:5000/api/actor/

    // dynamic model keys - everything from req.query, ie: http://localhost:5000/api/actor/create?first.name=aii&last.name=bee
    Model.METHOD(req.query, (err, docs) => {})
*/

// http://localhost:5000/api/actor/delete/12312
router.get('/:model/delete/:id', (req, res) =>
{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.json({result: 'error', error: 'Invalid ID'});

        let Model = require('../models/' + req.params.model);

        Model.findByIdAndRemove(req.params.id, (err, doc) =>
        {
            if (err) return res.json({result: 'error', error: err.name, message: err.message});
            if (!doc) return res.json({result: 'error', error: 'Not found', message: 'No matching document(s)'});

            res.json({
                result: 'ok',
                message: 'Successfully deleted document(s).',
                data: doc || {} // if empty, nothing really deleted
            });
        })
    } catch(err) {
        res.json({result: 'error', error: err.name, message: err.message});
    }
});

// http://localhost:5000/api/actor/update/59c8e505847b4a5c1bce7d82?name.last=hult
router.get('/:model/update/:id', (req, res) =>
{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.json({result: 'error', error: 'Invalid Id'});

        let Model = require('../models/' + req.params.model);

        Model.findByIdAndUpdate(req.params.id, req.query, {new:true, runValidators:true}, (err, doc) =>
        {
            if (err) return res.json({result: 'error', error: err.name, message: err.message});

            res.json({
                result: 'ok',
                message: `Successfully updated ${req.params.id} with ${req.originalUrl.split('?',2)[1]}`,
                data: doc || {}
            });
        })
    } catch(err) {
        res.json({result: 'error', error: err.name, message: err.message});
    }
});

// http://localhost:5000/api/actor/read?name.first=nisse
router.get('/:model/read', (req, res) =>
{
    try {
        let Model = require('../models/' + req.params.model);

        Model.find(req.query, (err, docs) =>
        {
            if (err) return res.json({result: 'error', error: err.name, message: err.message});

            res.json({
                result: 'ok',
                message: 'Successfully found document(s)',
                data: docs
            });
        });
    } catch(err) {
        res.json({result: 'error', error: err.name, message: err.message});
    }
});

// http://localhost:5000/api/actor/create?name.first=nisse&name.last=hult
// http://localhost:5000/api/vehicle/create?type=personbil&brand=Mazda&model=cool&year=2018&price=999&gearbox=manuell&license=B
// http://localhost:5000/api/booking/create/?vehicleId=59ccf2a16176ce4a59115532&name=Maria&dateFrom=2017-09-01&dateTill=2017-09-06
router.get('/:model/create', (req, res) =>
{
    try {
        let Model = require('../models/' + req.params.model);

        new Model(req.query).save( (err,doc) =>
        {
            if (err) return res.json({result: 'error', error: err.name, message: err.message});

            res.json({
                result: 'ok',
                message: 'Successfully created ' + req.params.model,
                data: doc || {}
            });
        });
    } catch(err) {
        res.json({result: 'error', error: err.name, message: err.message});
    }

});

module.exports = router;
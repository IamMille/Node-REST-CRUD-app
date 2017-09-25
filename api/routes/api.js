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
            return res.json({result: 'error', error: 'Invalid Id'});

        let Model = require('../models/' + req.params.model);

        Model.findByIdAndRemove(req.params.id, (err, doc) =>
        {
            if (err) return res.json({result: 'error', error: err.name, message: err.message});

            res.json({
                result: 'ok',
                message: 'Successfully deleted document.',
                data: doc
            });
        })
    } catch(err) {
        res.json({result: 'error', error: err.name, message: err.message});
    }
});

// http://localhost:5000/api/actor/update/59c8e505847b4a5c1bce7d82?name.last=hultgren4
router.get('/:model/update/:id', (req, res) =>
{
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.json({result: 'error', error: 'Invalid Id'});

        let Model = require('../models/' + req.params.model);

        Model.findByIdAndUpdate(req.params.id, req.query, {new:true}, (err, doc) =>
        {
            if (err) return res.json({result: 'error', error: err.name, message: err.message});

            res.json({
                result: 'ok',
                message: `Successfully updated ${req.params.id} with ${req.originalUrl.split('?',2)[1]}`,
                data: doc
            });
        })
    } catch(err) {
        res.json({result: 'error', error: err.name, message: err.message});
    }
});

router.get('/:model/read', (req, res) => // http://localhost:5000/api/actor/read?name.first=nisse
{
    try {
        let Model = require('../models/' + req.params.model);

        Model.find(req.query, (err, docs) =>
        {
            if (err) return res.json({result: 'error', error: err.name, message: err.message});

            res.json({
                result: 'ok',
                message: `Successfully found document`,
                data: docs
            });
        });
    } catch(err) {
        res.json({result: 'error', error: err.name, message: err.message});
    }
});

router.get('/:model/create', (req, res) => // http://localhost:5000/api/actor/create?name.first=nisse&name.last=hult
{
    try {
        let Model = require('../models/' + req.params.model);

        new Model(req.query).save(err =>
        {
            if (err) return res.json({result: 'error', error: err.name, message: err.message});

            res.json({result: 'ok', message: 'Successfully created ' + req.params.model });
        });
    } catch(err) {
        res.json({result: 'error', error: err.name, message: err.message});
    }

});

module.exports = router;
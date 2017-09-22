let express = require('express');
let router = express.Router();

// The root here represents is served on /api
router.get('/', function (req, res) {
    res.end('This is the api root')
});

// About page route
router.get('/get', function (req, res) {
    res.end('This is a api get')
});

module.exports = router;

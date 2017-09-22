const PORT = process.env.PORT || 5000;

// ---------------------------------------------------------------------

const express = require('express');
const mustacheExpress = require('mustache-express'); // npm uninstall mustache-express

// ---------------------------------------------------------------------

const app = express();
app.engine('html', mustacheExpress());
app.set('view engine', 'mustache'); //app.set('views', __dirname + '/views');
app.use( (req, res, next) => {
    let ignore = ['/favicon.ico', '/banan'];

    if (ignore.indexOf(req.path) === -1)
        console.log('@', new Date().toLocaleString(), req.ip, req.method, req.originalUrl);

    next();
});
app.use('/', express.static('build'));
app.use('/api', require('./routes/api')); // beware! middleware without next()

// ---------------------------------------------------------------------

app.listen(PORT);

console.log('*** Server listening on %d @ %s', PORT, new Date().toLocaleString());
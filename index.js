var bunyan = require('bunyan');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cameraHandler = require('./modules/RequestHandler/cameraHandler');
var path = require("path") //assuming express is installed


// global objects
global.log = bunyan.createLogger({name: "fotobox-app"});

// Defining frontend route
app.use(express.static(path.join(__dirname + '/frontend')));
app.use(express.static(path.join(__dirname + '/pictures')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});

app.get('/pictures/:file', function(req, res) {
    res.sendFile(path.join(__dirname + '/pictures/' + req.param('file')));
});

// app.use(bodyParser.json());
app.use('/api/v1/', cameraHandler.router());

app.listen(3000, function () {
    log.info('Example app listening on port 3000!');

    // initialize the camera handler
    cameraHandler.init();
});

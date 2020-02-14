var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.PORT || 8080;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log('GET="/"');
    res.sendFile(path.join(__dirname + '/principal.html'));
});

app.post('/add', function (req, res) {
    console.log('POST="/add"');
    console.log(req.body)
    res.sendFile(path.join(__dirname + '/principal.html'));
});

app.post('/list', function (req, res) {
  console.log('GET="/list"');
  res.sendFile(path.join(__dirname + '/principal.html'));
});

http.createServer(app).listen(port);
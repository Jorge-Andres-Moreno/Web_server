var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log('GET="/"');
    fs.readFile("./index.html", "UTF-8", function (err, html) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });  
});

app.post('/add', function (req, res) {
    console.log('POST="/add"');
    console.log(req.body)
    fs.readFile("./index.html", "UTF-8", function (err, html) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();
      });
});

app.post('/list', function (req, res) {
  console.log('GET="/list"');
  fs.readFile("./index.html", "UTF-8", function (err, html) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });
});

http.createServer(app).listen(port);
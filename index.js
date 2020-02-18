var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.PORT || 8080;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.56.3",
  user: "root",
  password: "password",
  database: "mydb"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  
  var sql = "DROP TABLE customers";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
  
  var sql = "CREATE TABLE customers (name VARCHAR(255), id VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

app.get('/', function (req, res) {
  console.log('GET="/"');
  res.sendFile(path.join(__dirname + '/principal.html'));
});

app.post('/add', function (req, res) {
  console.log('POST="/add"');
  console.log(req.body)
  var sql = "INSERT INTO customers (name, id) VALUES ('" + req.body.name + "', '" + req.body.id + "')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.sendFile(path.join(__dirname + '/principal.html'));
});

app.get('/list', function (req, res) {
  console.log('GET="/list"');
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    res.status(200).send(result)
  });

});

http.createServer(app).listen(port);

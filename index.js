var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/l-oja');
var db = mongoose.connection;

require(__dirname + '/routes/rotas.js')(app, db);

app.listen(80, function(){
  console.log('Servidor iniciado na porta', 80);
});

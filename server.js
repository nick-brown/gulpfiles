//var express = require('express')
//,   app = express()
//,   port = parseInt(process.env.PORT, 10) || 8080
//,   dir = __dirname + '/app/';
//
//app.get("/", function(req, res) {
//    //res.json({ message: 'stuff' });
//    res.sendFile(dir + '/index.html');
//});
//
//app.use('/static', express.static(__dirname + '/app/static'));
//app.use('/bower', express.static(__dirname + '/app/bower_components'));
//
//console.log('App listening on port: ' + port + '...');
//app.listen(port);


// MODULES
//==============================================================================
var express    = require('express')
  , app        = express()
  , mongoose   = require('mongoose')
  , bodyParser = require('body-parser')
  , port       = process.env.PORT || 8080;


// APP CONFIG
//==============================================================================
app.use(express.static(__dirname + '/dist'));

app.set('views', __dirname);
app.set('view engine', 'jade');

// MIDDLEWARE
//==============================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// DB SETUP
//==============================================================================
var db = require('./config/db');
db.connect();

// MODELS
var models = {
    Product: require('./app/models/product')
};


// ROUTES
//==============================================================================
app
  .get('/', function(req, res) {
      res.sendFile(__dirname + '/dist/index.html');
  })

  .get('/test', function(req, res) {
      res.sendFile(__dirname + '/dist/test.html');
  });

require('./app/routes')(express.Router(), app, models)


// KICK THE TIRES AND LIGHT THE FIRES
//==============================================================================
app.listen(port);
console.log('Node server started.  Listening on port ' + port + '...');

// MODULES
//==============================================================================
var express    = require('express')
  , app        = express()
  , mongoose   = require('mongoose')
  , bodyParser = require('body-parser')
  , port       = process.env.PORT || 8080
  , jade       = require('jade');


// APP CONFIG
//==============================================================================
app.use(express.static(__dirname + '/dist'));
//app.use('/bower', express.static(__dirname + '/app/bower_components'));


// MIDDLEWARE
//==============================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/dist/');
app.set('view engine', 'jade');


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
app.get('/', function(req, res) {
    res.sendFile('./dist/index.html');
});

app.get('/test', function(req, res) {
    res.render('views/tester', { title: 'My Thing'});
});

require('./app/routes')(express.Router(), app, models)


// KICK THE TIRES AND LIGHT THE FIRES
//==============================================================================
app.listen(port);
console.log('Node server started.  Listening on port ' + port + '...');

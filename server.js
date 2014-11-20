var express = require('express')
,   app = express()
,   port = parseInt(process.env.PORT, 10) || 8080
,   dir = __dirname + '/app/';

app.get("/", function(req, res) {
    //res.json({ message: 'stuff' });
    res.sendFile(dir + '/index.html');
});

app.use('/static', express.static(__dirname + '/app/static'));
app.use('/bower', express.static(__dirname + '/app/bower_components'));

console.log('App listening on port: ' + port + '...');
app.listen(port);

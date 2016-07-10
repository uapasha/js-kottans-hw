var App = require('./app.js');
var config = require('config');

var function1 = require("./function1.js");
var function2 = require('./function2.js');

var app = new App();

app.use(function1, function2);

app.use(function(req, res){
    res.end('hello word!');
});

var starter = function(){
    console.log('Listening on port ' + config.port);
};

app.start(config.port, config.host, starter);

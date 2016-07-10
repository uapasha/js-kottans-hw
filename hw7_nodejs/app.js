var http = require('http');

var App = function () {
    this.functions = []
};

App.prototype.use = function(){
    if (arguments.length === 0){
        throw new Error("You should provide arguments to 'use' method")
    }

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (typeof arg !== 'function') {
            throw new Error('Argument should be a function');
        }
        this.functions.push(arg);
    }
};

App.prototype.start = function (port,host, callback) {
    var server = http.createServer();

    this.functions.forEach((func) => {
        server.on('request', func);
    });

    server.listen(port, host, callback);
};

module.exports = App;
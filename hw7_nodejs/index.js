var App = require('./app.js');

var app = new App();

var some = function (req, res) {
    console.log(req.url);

};

anotherOne = function(req, res){
    console.log(req.method);
};

app.use(some, anotherOne);

app.use(function(req, res){
    res.end('hello word!')
});

app.start(8000, 'localhost', () => console.log('Listening on port 8000'));

// var http = require('http');
// var url = require('url');
//
// var server = new http.Server( function (req, res) {
//     console.log(req.method, req.url);
//     var urlParsed = url.parse(req.url, true);
//     console.log(urlParsed);
//
//     if(urlParsed.pathname == '/echo' && urlParsed.query.message) {
//         res.setHeader('Cache-control', 'no-cache, no-store, must-revalidate')
//         res.end(urlParsed.query.message);
//     } else{
//         res.statusCode = 404;
//         res.end('Page not found');
//     }
//     res.end('hi!');
// }); // event emitter
//
// server.listen(1337, '127.0.0.1');


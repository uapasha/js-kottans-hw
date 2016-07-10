module.exports = function(req, res){
    console.log(req.headers);
    res.end("Hello World");
}
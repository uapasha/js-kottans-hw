module.exports = function(req, res){
    console.log(req.headers);
    res.write("Hello World\n");
}
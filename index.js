var static = require('node-static');
 
// 
// Create a node-static server instance to serve the './public' folder 
// 
var file = new static.Server('./');
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {        
        file.serve(request, response);
    }).resume();
}).listen(8080);

console.log(' server is running port : 8080');
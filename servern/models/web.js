
var http = require('http');

exports.googleImage = function(query, callback) {
    var options = {
        host: 'ajax.googleapis.com',
        port: 80,
        path: '/ajax/services/search/images?v=1.0&imgType=face&q=' + encodeURIComponent(query),
        method: 'GET'
    };
    http.get(options, function(resp) {

        var data = '';
        resp.on("data", function(chunk) {
            data += chunk;
        });

        resp.on("end", function(err) {
            var obj = JSON.parse(data);
            var image = null;
            try {
              image = obj.responseData.results[0];
            }
            catch(e) {
              console.log(e);
              console.log(obj);
            }

            callback(image);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

exports.ip = function(req) {
    var ip_address = null;
    try {
        ip_address = req.headers['x-forwarded-for'];
    }
    catch ( error ) {
        ip_address = req.connection.remoteAddress;
    }
    return ip_address;
}
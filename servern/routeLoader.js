
var fs = require('fs');

module.exports = function(app) {
  var routes = fs.readdirSync('routes');
  routes.forEach(function(file) {
    require('./routes/' + file).addRoutes(app);
  });
}






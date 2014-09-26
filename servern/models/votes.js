
var db = require('./db');

var maxAllowedVotesPerTimeUnit = 5;
var minutes = 60;

exports.limitExeeded = function(ip, article, callback) {

  var time = new Date();
  time.setMinutes(time.getMinutes() - minutes);

  db.votes.count({ ip_address: ip, article: article, datetime: { $gt: time } }, function(err, count) {
    callback(count > maxAllowedVotesPerTimeUnit);
  });

}
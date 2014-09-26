var mongojs = require('mongojs');

var db = mongojs('mongodb://nodejitsu_duveborg:er7k91ho4hg6q7mf4ahqo5j16i@ds043947.mongolab.com:43947/nodejitsu_duveborg_nodejitsudb1867928004', ['votes']);

module.exports = db;

db.votes.ensureIndex({author: 1, article: 1, rating: 1, datetime: 1});

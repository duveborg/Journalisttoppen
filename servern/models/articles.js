
var db = require('./db');

exports.topRated = function(callback, req) {

  var pipeline = [];

  var match = {$match: {}};
  if(req.params.site) {
    match.$match.site = req.params.site;
  }
  if(req.filters.time) {
    match.$match.datetime = { $gte: req.filters.time };
  }
  if(req.filters.text) {
    match.$match.article = new RegExp(req.filters.text, "i");
  }
  if(req.params.author) {
    match.$match.author = req.params.author;
  }
  pipeline.push(match);

  pipeline = pipeline.concat([
    {
      $group: {
        _id: "$article",
        avg: { $avg: "$rating"},
        count: { $sum: 1},
        site: {$first: "$site"},
        author: {$first: "$author"}
      }
    }]);

  pipeline.push({$sort: { avg: req.filters.sort }});
  pipeline = pipeline.concat(req.filters.pagingFilter);

  db.votes.aggregate(pipeline, callback);
}
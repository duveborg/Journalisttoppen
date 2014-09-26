
var db = require('./db');

exports.topRated = function(callback, req) {
  var pipeline = [];

  var match = {$match: {}};
  if(req.filters.time) {
    match.$match.datetime = { $gte: req.filters.time };
  }
  if(req.filters.text) {
    match.$match.site = new RegExp(req.filters.text, "i");
  }
  if(req.params.author) {
    match.$match.author = req.params.author;
  }
  pipeline.push(match);

  pipeline = pipeline.concat([
    {
      $group: {
      _id: "$site",
      avg: { $avg: "$rating"},
      count: {$sum : 1}
    }
  }
  ]);

  pipeline.push({$sort: { avg: req.filters.sort }});

  db.votes.aggregate(pipeline, callback);
}
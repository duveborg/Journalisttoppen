
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
    match.$match.author = {$regex: new RegExp(req.filters.text, "i") };
  }
  pipeline.push(match);

  pipeline = pipeline.concat([
    {
      $group: {
        _id: "$author",
        avg: { $avg: "$rating"},
        count: {$sum : 1},
        site: {$first: "$site"},
        authorImage: {$first: "$authorImage"},
        datetime: {$first: "$datetime"}
      }
    }
  ]);

  pipeline.push({$sort: { avg: req.filters.sort }});
  pipeline = pipeline.concat(req.filters.pagingFilter);

  db.votes.aggregate(pipeline, callback);
}

exports.details = function(callback, req) {

  db.votes.aggregate(
        {
            $match: {
                author: req.params.author,
                site: req.params.site
            }
        },
        {
            $group: {
                _id: "$author",
                avg: { $avg: "$rating"},
                count: {$sum : 1},
                site: {$first: "$site"},
                author: {$first: "$author"},
                authorImage: {$first: "$authorImage"}
            }
        },
        callback
    );
}

var web = require('../models/web')
  , db = require('../models/db')
  , votes = require('../models/votes');

exports.addRoutes = function(app) {
  app.get('/vote', vote);
  app.get('/rosta', howto);
  // app.get('/clear', clear);
  // app.get('/reset', resetAllImages);
}

function howto(req, res) {
  db.votes.distinct("site", function(err, sites){
    db.votes.find().sort({datetime: -1}).limit(100, function(err, items) {
      res.render('vote/howto', { title: 'Hur du röstar', items: items, sites: sites });
    });
  });
}

function resetAllImages(req, res) {

  var pipeline = [];

  pipeline = pipeline.concat([
    {
      $match : {authorImage : {}}
    },
    {
      $group: {
        _id: "$author",
        site: {$first: "$site"},
        authorImage: {$first: "$authorImage"}
      }
    },
    {$skip: 0}, {$limit: 20}
  ]);

  // totalt 151
  // 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130

  db.votes.aggregate(pipeline, function(err, authors) {

    var index = 0;

    console.log(authors);

    function doNext() {
      var author = authors[index++];
      if(author) {

        console.log(author._id + " " + author.site);
        web.googleImage(author._id + " " + author.site, function(image) {
          var authorImage = image || {};
          console.log(authorImage);
          console.log(index);
          if(authorImage) {
            db.votes.update({author: author._id, site: author.site}, {$set: {authorImage: authorImage}}, {multi: true}, function(err) {
              if(err)
                console.log(err);
            });
          }

        });

        setTimeout(doNext, 1000 * Math.random() + 1000);
      }
    }

    doNext();

  });


}

function clear(req, res) {

  db.votes.update({site: 'SvDa'}, {$set: {site: 'SvD'}}, {multi: true}, function(err){
    res.send('apa' + err);
  })

  /*
  db.votes.remove({authorImage: null}, function(err) {
    res.send('Du har tagit bort röster');
  });

  */
}

function vote(req, res) {

  var ip_address = web.ip(req);

  // rating, ip, author, article, site, datetime
  var q = req.query;

  var vote = {
    site: q.site.trim(),
    author: q.author.trim(),
    article: q.article.trim(),
    rating: parseInt(q.rating),
    ip: ip_address,
    datetime : new Date()
  }


  if(
    (vote.rating > 0 && vote.rating <= 5)
    && vote.article
    && vote.author
    && vote.site
    )

  {
    votes.limitExeeded(vote.ip, vote.article, function(exeeded) {

      if(exeeded) {
        console.log("Limit exeeded for " + vote.ip);
        res.send('För många röster...');

      } else {

        web.googleImage(vote.author + " " + vote.site, function(image) {
          vote.authorImage = image || {};

          db.votes.save(vote, function(err) {
            res.header('Content-Type', 'application/json');
            res.header('Charset', 'utf-8')
            res.send(req.query.callback + '({"success": "1"});');
          });
        });
      }
    })
  } else {
    console.log("invalid vote:");
    console.log(vote);
    res.send(req.query.callback + '({"success": "2"});');
  }
}


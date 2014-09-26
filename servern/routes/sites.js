var sites = require('../models/sites'),
  authors = require('../models/authors'),
  articles = require('../models/articles');

exports.addRoutes = function(app) {
  app.get('/sajter', list);
  app.get('/sajter/:site', details);
  app.get('/sajter/:site/artiklar/:page?', moreArticles);
  app.get('/sajter/:site/journalister/:page?', moreAuthors);
}

function list(req, res) {
  sites.topRated(function(err, items) {
    res.render('sites/list', { title: 'Topplista - sajter', items: items });
  }, req);
}

function details(req, res, next) {
  articles.topRated(function(err, articleItems) {
    authors.topRated(function(err, authorItems) {
      if(!articleItems.length || !authorItems.length) {
        next(404);
      } else {
        res.render('sites/details', { title: req.params.site, articleItems: articleItems, authorItems: authorItems, req: req, baseUrl: '/sajter', currentPage: 1 });
      }
    }, req);
  }, req);
}

function moreArticles(req, res) {
  articles.topRated(function(err, articleItems) {
      res.render('articles/listRows', { articleItems: articleItems });
  }, req);
}

function moreAuthors(req, res) {
  authors.topRated(function(err, authorItems) {
    res.render('authors/listRows', { authorItems: authorItems });
  }, req);
}
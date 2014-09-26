
var authors = require('../models/authors'),
  articles = require('../models/articles');

exports.addRoutes = function(app) {
  app.get('/', list);
  app.get('/journalister/:page?', list);
  app.get('/journalister/:site/:author/:page?', details);
  app.get('/bilder', listImages);
}

function list(req, res) {
  authors.topRated(function(err, items) {
    res.render(req.filters.ajax ? 'authors/listDetailedRows' : 'authors/list', { title: 'Journalisttoppen - Topplista - Journalister', items: items, req: req, baseUrl: '/journalister' });
  }, req);
}

function listImages(req, res) {
  authors.topRated(function(err, items) {
    res.render(req.filters.ajax ? 'authors/listImages' : 'authors/listImages', { title: 'Journalisttoppen - Topplista - Journalister', items: items, req: req, baseUrl: '/journalister' });
  }, req);
}


function details(req, res, next) {
  authors.details(function(err, details) {
    articles.topRated(function(err, items) {

      if(!details.length || !items.length) {
        next(404);
      } else {
        res.render(req.filters.ajax ? 'authors/detailsRows' : 'authors/details',
          {
            title: req.params.author,
            req: req,
            baseUrl: '/journalister/' + req.params.site + "/" + req.params.author,
            items: items,
            details: details[0]
          });
      }
    }, req);
  }, req);
}
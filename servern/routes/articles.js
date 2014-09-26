
var articles = require('../models/articles');

exports.addRoutes = function(app) {
  app.get('/artiklar', list);
  app.get('/artiklar/:site/:page', list);
  app.get('/artiklar/:page', list);

}

function list(req, res) {
  articles.topRated(function(err, items) {
    res.render(req.filters.ajax ? 'articles/listRows' : 'articles/list', { title: 'Topplista - Artiklar', articleItems: items, req: req, baseUrl: '/artiklar' });
  }, req);
}

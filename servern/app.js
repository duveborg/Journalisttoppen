#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express')
  , routeloader = require('./routeLoader')
  , http = require('http')
  , path = require('path')
  , queryParser = require('./middleware/queryParser');

var app = express();

app.configure(function(){
  app.set('port', 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(queryParser);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(app.router);

  app.use(express.static(path.join(__dirname, 'public')));

  require('./lib/prototypes')

  routeloader(app);

  app.use(function(req, res, next) {
    res.status(404);
    res.render('404', {title: '404 - Sidan finns inte' });
  })

  app.use(function(err, req, res, next){
    console.log("I fel-middleware: " + err);
    if(err === 404) {
      res.status(404);
      res.render('404', {title: '404 - Sidan finns inte' });
    } else {
      res.status(500);
      res.render('500', {title: '500 - Trasig sida' });
    }
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});


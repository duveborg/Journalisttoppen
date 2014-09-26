#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')

var app = express();

app.configure(function(){
  app.set('port', 8080);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(app.router);

  app.use(function(req, res) {
    res.writeHead(301, {'Location':'http://journalisttoppen.se' + req.url});
    res.end();
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


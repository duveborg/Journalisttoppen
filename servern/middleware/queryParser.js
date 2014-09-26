
var pageSize = 50;

module.exports = function(req, res, next) {
  var filters = {};

  filters.text = req.query.text;

  filters.sort = parseInt(req.query.sortering || -1);

  // params finns inte när denna körs
  filters.__defineGetter__("page", function(){
    return parseInt(req.params.page || 1);
  });

  filters.ajax = req.query.ajax;

  // paging filter
  // Save for later use
  req.pageSize = pageSize;

  filters.__defineGetter__("pagingFilter", function(){
    var pagingFilter = [{$limit: pageSize * req.filters.page}];
    if(filters.ajax) {
      pagingFilter = [{$skip: pageSize * (req.filters.page - 1)}, {$limit: pageSize}];
    }
    return pagingFilter;
  });

  // kalkylera fram ett datum som inlägg måste vara efter för att filtreras med
  var tid = req.query.tid;
  if(tid > 0) {
    var date = new Date();
    date.setDate(date.getDate() - tid);
    filters.time = date;
  }

  req.filters = filters;
  next();
}

module.exports = {
  pagingFilter: pagingFilter
}

var pageSize = 50;

function pagingFilter(req) {

  // Save for later use
  req.pageSize = pageSize;

  var filter = [{$limit: pageSize * req.filters.page}];
  if(req.filters.ajax) {
    filter = [{$skip: pageSize * (req.filters.page - 1)}, {$limit: pageSize}];
  }
  return filter;
}


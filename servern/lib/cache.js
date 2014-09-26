

var cache = [];
// minutes
var cleanCacheTime = 5;

exports.put = function(key, item, minutes) {
  item.cacheTimeout = minutes;
  item.addedToCacheTime = new Date();
  cache[key] = item;
}

exports.get = function(key) {
  var item = cache[key];
  if(item) {
    var now = new Date();


    var isOld = true;
  }

  return item;
}
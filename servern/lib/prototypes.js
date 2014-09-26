

Date.prototype.nice = function() {
  return this.getFullYear() + '-' + format(this.getMonth() + 1) + '-' + format(this.getDate()) + ' ' + format(this.getHours()) + ':' + format(this.getMinutes());
}

Date.prototype.since = function() {
  var now = new Date();
  var diff = Math.abs(now - this);

  var seconds = Math.floor(diff / 1000);

  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var years = Math.floor(days / 365);

  var result = "Okänt";

  if(years > 0 ){
    result = years + " år"
  }
  else if(days > 0) {
    result = days + (days == 1 ? " dag" : " dagar");
  }
  else if(hours > 0) {
    result = hours + (hours == 1 ? " timme" : " timmar");
  }
  else if(minutes > 0) {
    result = minutes + (minutes == 1 ? " minut" : "  minuter");
  }
  else if(seconds > 0) {
    result = seconds + (seconds == 1 ? " sekund" : " sekunder");
  }

  return result + " sedan";
}

function format(date) {
  return date < 10 ? "0" + date : date;
}
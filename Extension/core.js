
var prefix = "JOURNALISTTOPPEN_";
var sandbox = $("<iframe style='width: 100%; height: 250px;' id='journalisttoppen'></iframe>");

var html = "<div class='toppen'><a target='_blank' class='toppen-site-link' href='http://journalisttoppen.se'>Journalisttoppen.se</a>";

var siteData = load();

var savedCookieValue = $.cookie(prefix + siteData.votedata.article);

if(savedCookieValue){
  html += "Du har röstat <strong>" + savedCookieValue + "</strong>/5";
} else {
  html += "<div class='replace'><p>Hur läsvärd är <strong>" + siteData.authors.join(" & ") + "'s</strong> artikel?</p>" +
    '<div class="toppen-rating">' +
      '<span data-rating="5">☆</span>' +
      '<span data-rating="4">☆</span>' +
      '<span data-rating="3">☆</span>' +
      '<span data-rating="2">☆</span>' +
      '<span data-rating="1">☆</span>' +
    '</div>' +
    '</div>';
}

html += "</div>";

sandbox.load(function() {
  var contents = $(this).contents();
  contents.find("body").append(html);
  contents.find('head').append('<link rel="stylesheet" href="' + chrome.extension.getURL("journalisttoppen.css") + '" type="text/css" />');
  contents.find(".toppen-rating span").click(function() {

    siteData.votedata.rating = $(this).attr("data-rating");
    $.cookie(prefix + location.href, siteData.votedata.rating, {expires: 1000});

    // Räkna ut höjd innan/efter för att animera höjden..
    var container = contents.find(".toppen");
    var replaceMe = contents.find(".replace");
    var contentAfter = "Du har röstat <strong>" + siteData.votedata.rating + "</strong>/5";
    var contentBefore = replaceMe.html();
    var heightBefore = container.height();
    replaceMe.text(contentAfter);
    var heightAfter = container.height();

    replaceMe.html(contentBefore);
    container.height(heightBefore);

    replaceMe.fadeOut(function(){
      container.animate({height: heightAfter}, 1000);
      replaceMe.html(contentAfter);
      replaceMe.fadeIn();
    });



    siteData.authors.forEach(function(author){
      siteData.votedata.author = author;
      vote(siteData.votedata, function(error) {

      });
    });
  });
});

siteData.outputTarget.append(sandbox);


function vote(vote, callback) {
  $.ajax({
    type: "GET",
    dataType: 'json',
    data: vote,
    url: 'http://journalisttoppen.se/vote?callback=?',
    success: callback,
    error: callback
  });
}


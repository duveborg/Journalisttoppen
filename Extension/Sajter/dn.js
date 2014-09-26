
function load(){
  var byline = $(".byline");
  var authors = [];
  var votedata = {};

  if(byline.length) {
    byline.each(function(i, line){
      var author = $(this).find("p:first").text();
      if(author)
        authors.push(author);
    });

    votedata = {
      site : "DN",
      article : $("[rel=canonical]").attr("href")
    }
  }

  return { votedata: votedata, authors: authors, outputTarget: $("#contentBody")};
}
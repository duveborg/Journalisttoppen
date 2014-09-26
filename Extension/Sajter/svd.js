
function load(){

  var byline = $(".author");
  var authors = [];
  var votedata = {};

  if(byline.length) {

    byline.each(function(i, line){
      var author = $(line).clone().children().remove().end().text();
      if(author)
        authors.push(author);
    });

    votedata = {
      site : "SvD",
      article : $("[rel=canonical]").attr("href")
    }
  }

  return { votedata: votedata, authors: authors, outputTarget: $("#article-content")};
}
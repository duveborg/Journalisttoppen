
function load(){
  var byline = $(".boxAuthor h3");
  var authors = [];
  var votedata = {};

  if(byline.length) {

    byline.each(function(i, item) {
      authors.push($(item).text().trim());
    });

    votedata = {
      site : "Resumé",
      article : $("[rel=canonical]").attr("href")
    }
  }

  return { votedata: votedata, authors: authors, outputTarget: $(".articleBody")};
}


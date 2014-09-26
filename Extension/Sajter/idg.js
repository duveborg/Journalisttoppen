
function load(){
  var byline = $(".articleAuthor a");
  var authors = [];
  var votedata = {};

  if(byline.length) {

    byline.each(function(i, item) {
      var author = $(item).text().trim();
      if(author)
        authors.push(author);
    });

    votedata = {
      site : "Idg.se",
      article : $("[rel=canonical]").attr("href")
    }
  }

  return { votedata: votedata, authors: authors, outputTarget: $(".articleBody")};
}


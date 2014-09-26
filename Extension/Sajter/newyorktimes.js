
function load(){

  var byline = $("[rel=author]");
  var authors = [];
  var votedata = {};

  if(byline.length) {

    byline.each(function(i, item){
      authors.push($(item).text().trim());
    });

    votedata = {
      site : "New York Times",
      article : $("[rel=canonical]").attr("href")
    }
  }

  return { votedata: votedata, authors: authors, outputTarget: $(".articleBody")};
}
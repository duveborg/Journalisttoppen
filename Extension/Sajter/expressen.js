
function load(){
  var byline = $(".tdName span");
  var authors = [];
  var votedata = {};

  if(byline.length) {
    byline.each(function(i, line) {
      var author = $(line).clone().children().remove().end().text();
      author = author.replace("Av ", "").trim();
      authors.push(author);
    });

    votedata = {
      site : "Expressen",
      article : $("[rel=canonical]").attr("href")
    }
  }

  return { votedata: votedata, authors: authors, outputTarget: $(".b-article__content")};
}
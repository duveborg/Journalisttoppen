
function load(){

  var byline = $(".article_byline");
  var authors = [];
  var votedata = {};

  if(byline.length) {

    byline.each(function(i, line){
      var author = $(line).text();

      /*
       Exempel på hur en byline kan se ut...
       Av helagotland.se Simon Frid.
       Publicerad 2013-01-18
       */

      if(author) {
        author = author.replace("Av", "")
          .replace("helagotland.se", "")
          .replace("Gotlands Allehanda", "")
          .replace("Gotlands Tidningar", "")
          .replace("Text och foto", "");

        var i = author.indexOf("Publicerad");
        if(i > -1) {
          author = author.substring(0, i);
        }

        author = author.replace(".", "").trim();

        if(!author)
          author = "Helagotland.se";

        authors.push(author);
      }
    });

    votedata = {
      site : "Helagotland.se",
      article : location.href
    }
  }

  return { votedata: votedata, authors: authors, outputTarget: $(".article_container")};
}
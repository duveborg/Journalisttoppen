
function load(){
  var byline = $(".abByline");
  var authors = [];
  var votedata = {};

  if(byline.length) {
    if(byline.find("li").length > 0) {
      byline.find("li").each(function(i, item) {
        authors.push($(item).text().trim());
      });
    } else {
      authors.push(byline.text().trim());
    }

    votedata = {
      site : "Aftonbladet",
      article : $("[rel=canonical]").attr("href")
    }
  }

  return { votedata: votedata, authors: authors, outputTarget: $("#abBodyText")};
}



function load(){

    var votedata = {
      site : "Svenska Spel",
      article : $("[rel=canonical]").attr("href")
    }


  return { votedata: votedata, authors: ["Svenska Spel"], outputTarget: $("article")};
}


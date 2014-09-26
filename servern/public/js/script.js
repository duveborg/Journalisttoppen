
$(function() {

  $("img").error(function(){
    $(this).attr("src", "/img/bild_saknas.gif");
  });

  // Lägg till active om man är på sidan
  $(".nav-row .btn").each(function(i, btn) {
    if(location.href.indexOf(btn.href) != -1) {
      $(btn).addClass("active");
    }
  });

  // filtering
  $(".form-filter [name]").each(function(i, input) {
    $(input).val(getParameterByName($(input).attr("name")));
  });

  $(".form-filter select").change(function(){
    $(".form-filter").submit();
  });

  // flerknapp
  $(".btn-more").click(function(){
    var self = $(this);
    var baseTargetUrl = self.attr("data-base-url");
    var page = parseInt(self.attr("data-page"));

    var modifyUrl = self.attr("modify-url");

    var target = baseTargetUrl + "/" + (page + 1);

    var loadNode = self.attr("data-load-target");

    self.addClass("disabled");

    var qs = window.location.search ? window.location.search + "&ajax=1" : "?ajax=1";

    $.get(target + qs, function(response) {
      if(response) {
        $(loadNode).append(response);

        var newUrl = baseTargetUrl + "/" + (page + 2) + window.location.search;

        if(history.pushState && modifyUrl) {
          history.pushState(null, "Vadskastahar", target + window.location.search);
        }

        self.attr("data-page", page + 1);
        self.attr("href", newUrl);
        self.removeClass("disabled");
      }
      else {
        self.text("Slut :(")
      }
    });

    return false;
  });

  function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
      .exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
});
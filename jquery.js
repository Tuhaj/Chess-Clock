//J QUERY
$(document).ready(function() {
  $("#info_button").click(function(){
    $("#info").toggleClass("hide_info");
    $("html, body").animate({ scrollTop: $(document).height() }, 2000);
    blur();
  });
});

$(document).ready(function() {
  $("#tips_button").click(function(){
    $('.tooltip').tooltip('disable');
    blur();
  });
});

$(function() {
    $( ".tooltip").tooltip();
  });
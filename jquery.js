//J QUERY
$(document).ready(function() {
  $("#info_button").click(function(){
    $("#info").toggleClass("hide_info");
    $("html, body").animate({ scrollTop: $(document).height() }, 2000);
    blur();
  });
});

$(function() {
    $( "#bonus_button" ).tooltip();
  });

$(function() {
    $( "#time_button" ).tooltip();
  });
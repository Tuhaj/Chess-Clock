//J QUERY
$(document).ready(function() {
  $("#info_button").click(function(){
    $("#info").toggleClass("hide_info");
    $("html, body").animate({ scrollTop: $(document).height() }, 2000);
    blur();
  });
});

$(function() {
    $( "#stop_button" ).tooltip();
    $( "#click_button" ).tooltip();
    $( "#set_names" ).tooltip();
    $( "#bonus_button" ).tooltip();
    $( "#time_button" ).tooltip();
    $( "#info_button" ).tooltip();
  });
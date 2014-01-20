//J QUERY
var tooltip_is_on = true
$(document).ready(function() {
  $("#info_button").click(function(){
    $("#info").toggleClass("hide_info");
    $("html, body").animate({ scrollTop: $(document).height() }, 2000);
    $("#info_button").blur();
  });
});

$(document).ready(function() {
  $("#tips_button").click(function(){
    if(tooltip_is_on) {
    $('.tooltip').tooltip('disable');
    $("#tips_button").text("turn tooltips on");
    tooltip_is_on = false
    }
    else {
    $('.tooltip').tooltip('enable');
    tooltip_is_on = true
    $("#tips_button").text("turn tooltips off");
    };
    $("#tips_button").blur();
  });
});

$(function() {
    $( ".tooltip").tooltip();
  });

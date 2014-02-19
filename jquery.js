var tooltipIsOn = true
$(document).ready(function() {
  $("#info_button").click(function(){
    $("#info").toggleClass("hide_info");
    $("html, body").animate({ scrollTop: $(document).height() }, 2000);
    $("#info_button").blur();
  });
});

$(document).ready(function() {
  $("#tips_button").click(function(){
    if(tooltipIsOn) {
    $('.tooltip').tooltip('disable');
    $("#tips_button").text("turn tooltips on");
    tooltipIsOn = false
    }
    else {
    $('.tooltip').tooltip('enable');
    tooltipIsOn = true
    $("#tips_button").text("turn tooltips off");
    };
    $("#tips_button").blur();
  });
  $( "#time_button" ).mouseover(function() {
    $( "#counter_1" ).effect( "shake", {times: 2, distance: 5}, 400 );
    $( "#counter_2" ).effect( "shake", {times: 2 ,distance: 5}, 400 );
  });
});

$(function() {
  $( ".tooltip").tooltip();
});


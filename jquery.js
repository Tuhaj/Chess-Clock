//J QUERY
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
});

$(function() {
  $( ".tooltip").tooltip();
});

//easy clicks :-)

$(function() {
  $("#click_button").on('click', changePlayer);
  $("#stop_button").on('click', stopClock);
  $("#time_button").on('click', setTimers);
  $("#set_names").on('click', setNames);
  $("#bonus_button").on('click', setBonusTime);
});
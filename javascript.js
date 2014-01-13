var timers = [0, 0], intertimers = [0,0], time_one, time_two, bonus = 0, timer_on = false,
  player, clock, player_names = ["",""];

//Validations
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
//SETTINGS
function setNames() {
  var name = document.getElementById("set_names");
  player_names[0] = prompt("enter player one name");
  player_names[1] = prompt("enter player two name");
  updatePlayersNames();
  name.blur();
};

function updatePlayersNames() {
  document.getElementById('player_1').innerHTML = player_names[0]; 
  document.getElementById('player_2').innerHTML = player_names[1];
};

function getsTimes() {
    time_one = prompt("enter "+ player_names[0] + " (player 1) time");
  if (isNumber(time_one)) {
    time_two = prompt("enter " + player_names[1] + " (player 2) time");
    if(isNumber(time_two)) {
      return time_one, time_two;
    }
    else {
      alert("Please enter a number");
      getsTimes();
    };
  }
  else {
      alert("Please enter a number");
      getsTimes();
    };
};

function setTimers() {
  var set = document.getElementById("time_button");
  getsTimes();
  timers[0] = parseInt(time_one) * 600;
  timers[1] =parseInt(time_two) * 600;
  updateView();
  set.blur();
};

function setBonusTime() {
  var time_for_move = document.getElementById("bonus_button");
  bonus = prompt("enter bonus time for move (in seconds)");
  if (isNumber(bonus)) {
  return bonus;
  }
  else {
    alert("Please enter a number");
    setBonusTime();
  };
   time_for_move.blur();
};

function displayTime(time, short) {
  var hours, minutes, seconds, decimals;
  decimals = time%10;
  time = Math.floor(time/10);
  seconds = time%60;
  time = Math.floor(time/60);
  minutes = time%60;
  time = Math.floor(time/60);
  hours = time%60;
  if (minutes < 10) {
    minutes = "0"+minutes;
  };
  if (hours <10) {
    hours = "0"+hours;
  };
  if (seconds < 10) {
    seconds = "0"+seconds;
  };
  if (short) {
    return minutes+":"+seconds+"."+decimals;
  }
  else {
  return hours+":"+minutes+":"+seconds+"."+decimals;
  };
};

function updateView() {
  time_1 = timers[0].toString();
  time_2 = timers[1].toString();
  intertime_1 = intertimers[0].toString();
  intertime_2 = intertimers[1].toString();
  document.getElementById('counter1').innerHTML = displayTime(time_1);  
  document.getElementById('counter2').innerHTML = displayTime(time_2);
  document.getElementById('intertimer1').innerHTML = displayTime(intertime_1, true);  
  document.getElementById('intertimer2').innerHTML = displayTime(intertime_2, true);
  blur();
};

//CLOCK
function tick() {
  if (timers[player] == 0) {
    alert(player_names[player] + " reached end of time!");
    stopClock();
  } 
  else {
  timers[player] -= 1;
  intertimers[player] += 1;
  updateView();
  };
};

function stopClock() {
 clearInterval(clock);
 timer_on = false;
 player = (player === 0) ? 1 : 0;
};

function cleanIntertimers() {
  intertimers[player] = 0;
};

function changePlayer() {
    clearInterval(clock);
    if (timer_on) {
    timers[player] += parseInt(bonus) * 10;
    };
    player = (player === 0) ? 1 : 0;
    cleanIntertimers();
    timer_on = true;
    clock = setInterval( tick, 100 );
};

//HOT KEYS
window.onkeyup = function(event) {
  var keycode;
  keycode = event.keyCode;
  

  if (keycode === 32) {

    changePlayer();
    event.stopPropagation();
    event.preventDefault();

  }
  else if (keycode === 16) { 
    stopClock();
  }
  else if (keycode === 83) {
    setTimers();
  }
  else if (keycode === 78) {
    setNames();
  };
};

window.onload = function() {
   var stop = document.getElementById("stop_button");
   stop.onclick = function() { 
        stopClock();
   };
  var set = document.getElementById("time_button");
   set.onclick = function() { 
        setTimers();
   };
  var names = document.getElementById("set_names");
   names.onclick = function() { 
        setNames();
   };
  var click = document.getElementById("click_button");
   click.onclick = function() { 
        changePlayer();
   };
  var time_for_move = document.getElementById("bonus_button");
   time_for_move.onclick = function() { 
        setBonusTime();
    };  
};
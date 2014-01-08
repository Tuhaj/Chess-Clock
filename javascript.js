var timers = [0, 0],
  player, clock, player_names = ["",""];
//SETTINGS add: intervals, minutes
function setNames() {
  player_names[0] = prompt("enter player one name");
  player_names[1] = prompt("enter player two name");
  updatePlayersNames();
};

function updatePlayersNames() {
  document.getElementById('player_1').innerHTML = player_names[0]; 
  document.getElementById('player_2').innerHTML = player_names[1];
};

function setTimers() {
  var set = document.getElementById("set_button");
  timers[0] = parseInt(prompt("enter "+ player_names[0] + " (player 1) time")) * 10;
  timers[1] =parseInt(prompt("enter " + player_names[1] + " (player 2) time")) * 10;
  updateView();
  set.blur();
};

function displayTime(time) {
  time = time.toString();
  return time.slice(0,-1)+"."+time.slice(-1);
};

function updateView() {
  time_1 = timers[0].toString();
  time_2 = timers[1].toString();
  document.getElementById('counter1').innerHTML = displayTime(time_1);  
  document.getElementById('counter2').innerHTML = displayTime(time_2);
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
  updateView();
  };
};

function stopClock() {
 clearInterval(clock);
 player = (player === 0) ? 1 : 0;
};

function changePlayer() {
    clearInterval(clock);
    player = (player === 0) ? 1 : 0;
    clock = setInterval( tick, 100 );
};

//HOT KEYS
window.onkeyup = function(event) {
  var keycode;
  keycode = event.keyCode;
  if (keycode === 32) { 
    changePlayer();
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
  var set = document.getElementById("set_button");
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
};
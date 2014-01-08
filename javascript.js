var timers = [0, 0],
  player, clock, player_names = ["",""];

function set_names() {
  player_names[0] = prompt("enter player one name");
  player_names[1] = prompt("enter player two name");
  updatePlayersNames();
};

function set_timers() {
  var set = document.getElementById("set_button");
  timers[0] = parseInt(prompt("enter "+ player_names[0] + " (player 1) time")) * 10;
  timers[1] =parseInt(prompt("enter " + player_names[1] + " (player 2) time")) * 10;
  updateView();
  set.blur();
};

function updateView() {
  time_1 = timers[0].toString()
  time_2 = timers[1].toString()
  document.getElementById('counter1').innerHTML = time_1.slice(0,-1)+"."+time_1.slice(-1); 
  document.getElementById('counter2').innerHTML = time_2.slice(0,-1)+"."+time_2.slice(-1);
  blur();
};
function updatePlayersNames() {
  document.getElementById('player_1').innerHTML = player_names[0]; 
  document.getElementById('player_2').innerHTML = player_names[1];
};

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

function changePlayer() {
    clearInterval(clock);
    player = (player === 0) ? 1 : 0;
    clock = setInterval( tick, 100 );
};

window.onkeyup = function(event) {
  var keycode;
  keycode = event.charCode;
  if (keycode === 32) { 
    changePlayer();
  }
  else if (keycode === 16) { 
    stopClock();
  }
  else if (keycode === 83) {
    set_timers();
  }
  else if (keycode === 78) {
    set_names();
  };
};

function stopClock() {
 clearInterval(clock);
 player = (player === 0) ? 1 : 0;
};

window.onload = function() {
   var stop = document.getElementById("stop_button");
   // add onclick event 
   stop.onclick = function() { 
        stopClock();
   };
  var set = document.getElementById("set_button");
   set.onclick = function() { 
        set_timers();
   };
  var names = document.getElementById("set_names");
   names.onclick = function() { 
        set_names();
   };
  var click = document.getElementById("click_button");
   click.onclick = function() { 
        changePlayer();
   };
};
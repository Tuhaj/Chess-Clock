var timers = [0, 0],
  player, clock;

function set_timers() {
  timers[0] = parseInt(prompt("player_1_time"));
  timers[1] =parseInt(prompt("player_2_time"));
};

function updateView() {
  time_1 = timers[0].toString()
  time_2 = timers[1].toString()
  document.getElementById('counter1').innerHTML = time_1.slice(0,-1)+"."+time_1.slice(-1); 
  document.getElementById('counter2').innerHTML = time_2.slice(0,-1)+"."+time_2.slice(-1);
};

function tick() {
  if (timers[player] == 0) {
    alert(player + " reached end of time!");
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

window.onkeyup = function(e) {
  var keycode;
  keycode = window.event.keyCode;
  if (keycode === 32) { 
    changePlayer();
  }
  else if (keycode === 13) { 
    stopClock();
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
};
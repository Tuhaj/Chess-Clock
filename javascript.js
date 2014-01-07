var timers = [0, 0],
  player, clock;

function updateView() {
  a = timers[0].toString()
  b = timers[1].toString()
  document.getElementById('counter1').innerHTML = a; 
  document.getElementById('counter2').innerHTML = b;
};

function tick() {
  timers[player] += 1;
  updateView();
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
   var button = document.getElementById("stop_button");
   // add onclick event 
   button.onclick = function() { 
        stopClock();
   };
};




// document.onkeypress = function(e) {
//     e = e || window.event;
//     var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
//     if (charCode) {
//         alert("Character typed: " + String.fromCharCode(charCode));
//     }
// };

// document.onkeypress = function verifyKey(e) {
//     var keycode;
//     keycode = window.event.keyCode;
//     alert(keycode);
//   };

var timers = [0, 0],
  player, clock;

function updateView() {
  document.getElementById('counter1').innerHTML = timers[0]; 
  document.getElementById('counter2').innerHTML = timers[1];
};

function tick() {
  timers[player] += 1;
  updateView();
};

function changePlayer() {
    clearInterval(clock);
    player = (player === 0) ? 1 : 0;
    clock = setInterval( tick, 1000 );
};

document.onkeyup = function(e) {
  var keycode;
  keycode = window.event.keyCode;
  if (keycode === 32) { 
    changePlayer();
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

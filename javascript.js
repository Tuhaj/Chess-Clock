

(function () {
  "use strict";
  var timers = [6000, 6000], intertimers = [0, 0], timeOne, timeTwo, bonus = 0, timerOn = false, timeForMove, stop,
    player, clock, cursorInterval, cursorIntervalOn = false, element, playerNames = ["", ""], soundOn = true, timersMemory = [6000, 6000], name, n1, n2, set;
  
  //Setters
//alien code!
/*
** Returns the caret (cursor) position of the specified text field.
** Return value range is 0-oField.value.length.
*/
// function doGetCaretPosition (oField) {

//   // Initialize
//   var iCaretPos = 0;

//   // IE Support
//   if (document.selection) {

//     // Set focus on the element
//     oField.focus ();

//     // To get cursor position, get empty selection range
//     var oSel = document.selection.createRange ();

//     // Move selection start to 0 position
//     oSel.moveStart ('character', -oField.value.length);

//     // The caret position is selection length
//     iCaretPos = oSel.text.length;
//   }

//   // Firefox support
//   else if (oField.selectionStart || oField.selectionStart == '0')
//     iCaretPos = oField.selectionStart;

//   // Return results
//   return (iCaretPos);
// }
// alien code, end http://stackoverflow.com/questions/2897155/get-cursor-position-within-a-text-input-field
  //setter2 = document.getElementById('setter2').innerHTML;

function Cursor(id, counter) { 
  var el = document.getElementById(id); 
  var counter = document.getElementById(counter);
  function cursor() {
    var text = counter.innerHTML;
    
    if (text.indexOf("|") === -1) {
    text += "|";
    }
    else {
      text = text.replace("|", "");
    }
    counter.innerHTML = text;
  }

  el.onkeyup = function () {
    counter.innerHTML = this.value + "|";
  }

  el.onclick = function () {
    if (!cursorIntervalOn) {
      cursorInterval = setInterval(cursor, 500);
      cursorIntervalOn = true;
    }
  };

  el.onblur = function () {  
    var text = counter.innerHTML;
    clearInterval(cursorInterval);
    cursorIntervalOn = false;
    if (text.indexOf("|") > -1) {
      text = text.replace("|", "");
    }
    counter.innerHTML = text;
    cursorIntervalOn = false;
  };

  function setTimers() {

  }

}

new Cursor("set_hours_1", "hours_1");
new Cursor("set_hours_2", "hours_2");

new Cursor("set_min_1", "minutes_1");
new Cursor("set_min_2", "minutes_2");

new Cursor("set_sec_1", "seconds_1");
new Cursor("set_sec_2", "seconds_2");


  //Validations
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function validatesNumForFunction(input, operation) {
    if (isNumber(input)) {
      return input;
    }
    alert("Please enter only numbers");
    operation();
  }
  function validatesLength(input, operation) {
    if (0 < input.length && input.length < 16) {
      return input;
    }
    alert("Please enter length between 1-15 characters");
    operation();
  }
  //SETTINGS
  function updatePlayersNames() {
    document.getElementById('player_1').innerHTML = playerNames[0];
    document.getElementById('player_2').innerHTML = playerNames[1];
  }

  function setSound() {
    soundOn = soundOn ? false : true;
  }
  function setNames() {
    name = document.getElementById("set_names");
    n1 = prompt("enter player one name");
    n2 = prompt("enter player two name");
    validatesLength(n1, setNames);
    validatesLength(n2, setNames);
    playerNames[0] = n1;
    playerNames[1] = n2;
    updatePlayersNames();
    name.blur();
  }

  function getsTimes() {
    timeOne = prompt("enter " + playerNames[0] + " (player 1) time in minutes");
    timeTwo = prompt("enter " + playerNames[1] + " (player 2) time in minutes");
    validatesNumForFunction(timeOne, getsTimes);
    validatesNumForFunction(timeTwo, getsTimes);
  }

  function setTimers() {
    set = document.getElementById("time_button");
    getsTimes();
    timers[0] = parseInt(timeOne, null) * 600;
    timers[1] = parseInt(timeTwo, null) * 600;
    timersMemory = timers.slice(0);
    intertimers = [0, 0];
    updateView();
    set.blur();
  }

  function resetTimers() {
    timers = timersMemory.slice(0);
    intertimers = [0, 0];
    updateView();
  }

  function setBonusTime() {
    timeForMove = document.getElementById("bonus_button");
    bonus = prompt("enter bonus time for move (in seconds)");
    validatesNumForFunction(bonus, setBonusTime);
    timeForMove.blur();
  }

  function displayTime(time, long) {
    var hours, minutes, seconds, decimals, display;
    time = time.toString();
    decimals = time % 10;
    time = Math.floor(time / 10);
    seconds = time % 60;
    time = Math.floor(time / 60);
    minutes = time % 60;
    time = Math.floor(time / 60);
    hours = time % 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    display = minutes + ":" + seconds + "." + decimals;
    if (long) {display = hours + ":" + display; }
    return display;
  }

  function updateView() {
    document.getElementById('counter_1').innerHTML = displayTime(timers[0], true);
    document.getElementById('counter_2').innerHTML = displayTime(timers[1], true);
    document.getElementById('intertimer1').innerHTML = displayTime(intertimers[0]);
    document.getElementById('intertimer2').innerHTML = displayTime(intertimers[1]);
    blur();
  }

  //CLOCK
  function tick() {
    var end = document.getElementById("end");
    if (!timers[player]) {
      if (soundOn) {
        end.play();
      }
      alert(playerNames[player] + " reached end of time!");
      clearInterval(clock);
      if (timerOn) {
        player = (player === 0) ? 1 : 0;
      }
      timerOn = false;
    } else {
      timers[player] -= 1;
      intertimers[player] += 1;
      updateView();
    }
  }

  function stopClock() {
    stop = document.getElementById("stop");
    clearInterval(clock);
    //take it out from the code
    if (timerOn) {
      player = (player === 0) ? 1 : 0;
      if (soundOn) {
        stop.play();
      }
    }
    timerOn = false;
    //take it out from code
  }

  function cleanIntertimers() {
    intertimers[player] = 0;
  }

  function changePlayer() {
    var click = document.getElementById("click");
    clearInterval(clock);
    if (timerOn) {
      timers[player] += parseInt(bonus, null) * 10;
    }
    player = (player === 0) ? 1 : 0;
    if (soundOn) {
      click.play();
    }
    cleanIntertimers();
    timerOn = true;
    clock = setInterval(tick, 100);
  }

  //HOT KEYS
  window.onkeyup = function (event) {
    var keycode = event.keyCode;

    if (keycode === 32) {
      changePlayer(); //if it is now possilbe to disable scroll, tell me!
    } else if (keycode === 16) {
      stopClock();
    } else if (keycode === 83) {
      setTimers();
    } else if (keycode === 66) {
      setBonusTime();
    } else if (keycode === 78) {
      setNames();
    } else if (keycode === 82) {
      resetTimers();
    }
  };

  document.onkeyup = function (event) {
    var keycode = event.keyCode;

    if (keycode === 13) {
      window.focus();
    }
  };

  window.onload = function () {
    var soundButton = document.getElementById("sound_button"), click_button = document.getElementById("click_button"), stop_button = document.getElementById("stop_button"), time_button = document.getElementById("time_button"), set_names = document.getElementById("set_names"), bonus_button = document.getElementById("bonus_button"), reset_button = document.getElementById("reset_button");
    click_button.onclick = changePlayer;
    stop_button.onclick = stopClock;
    time_button.onclick = setTimers;
    set_names.onclick = setNames;
    bonus_button.onclick = setBonusTime;
    reset_button.onclick = resetTimers;

    sound_button.onclick = function () {
      setSound();
      soundOn ? sound_button.innerHTML = "SOUND OFF" : sound_button.innerHTML = "SOUND ON";
      soundButton.blur();
    };
  };
})();

(function () {
  var hours = [0, 0], minutes = [0, 0], seconds = [0, 0], timers = [3000, 3000], intertimers = [0, 0], timeOne, timeTwo, bonus = 0, timerOn = false, timeForMove, stop,
    player, clock, cursorInterval, cursorIntervalOn = false, element, playerNames = ["Magnus", "Levon"], soundOn = true, timersMemory = [3000, 3000], name, n1, n2, set, allowedHotkeys = true;
  //Setters
var about = document.getElementById("info");
about.blur();

function Filler(id, counter, type, player) { 
  var el = document.getElementById(id); 
  var counter = document.getElementById(counter);
  var self = this;
  var numerical = false;
  if (type === "hour" || type === "minute" || type === "second") {
    numerical = true;
  }

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

  function setCursor(el) {
    cursorInterval = setInterval(cursor, 500);
    cursorIntervalOn = true;
    counter.innerHTML = el.value + "|";
    allowedHotkeys = false;  
  }

  el.onkeyup = function (e) {
    counter.innerHTML = this.value + "|";
    if (e.keyCode === 13) {
      el.blur();
      return true
    }
    if (e.keyCode === 9) {
     setCursor(this);
    }
    if (numerical && counter.innerHTML.length > 3 || numerical &&!isNumber(String.fromCharCode(e.keyCode)) || counter.innerHTML.length > 9) {
      el.value = "";
      counter.innerHTML = el.value;
    }
  }

  el.onclick = function () {
    if (!cursorIntervalOn) {
      setCursor(this);
    }
  };

  el.onblur = function () {
    var text = counter.innerHTML;
    allowedHotkeys = true;
    if (numerical && text.length === 0 || numerical && text === "|") {
      text = "0";
    }
    if (text.indexOf("|") > -1) {
      text = text.replace("|", "");
    }
    counter.innerHTML = text;
    if (type === "hour") {
      hours[player] = parseInt(text, null);
    }
    if (type === "minute") {
      minutes[player] = parseInt(text, null);
    }
    if (type === "second") {
      seconds[player] = parseInt(text, null);
    }
    if (numerical) {
    timers[player] = (hours[player] * 36000) + (minutes[player] * 600) + (seconds[player] * 10);
    timersMemory = timers.slice(0);
    updateTimer();
    } else {
      setNames();
    }
    clearInterval(cursorInterval);
    cursorIntervalOn = false;
    el.value = ""
  };
}

new Filler("set_hours_1", "hours_1", "hour", 0);
new Filler("set_hours_2", "hours_2", "hour", 1);

new Filler("set_min_1", "minutes_1", "minute", 0);
new Filler("set_min_2", "minutes_2", "minute", 1);

new Filler("set_sec_1", "seconds_1", "second", 0);
new Filler("set_sec_2", "seconds_2", "second", 1);

new Filler("set_name_1", "name_1");
new Filler("set_name_2", "name_2");

  function updateTimer() {
    document.getElementById('hours_1').innerHTML = displayTime(timers[0], true).slice(0,2)
    document.getElementById('hours_2').innerHTML = displayTime(timers[1], true).slice(0,2)
    document.getElementById('minutes_1').innerHTML = displayTime(timers[0], true).slice(3,5)
    document.getElementById('minutes_2').innerHTML = displayTime(timers[1], true).slice(3,5)
    document.getElementById('seconds_1').innerHTML = displayTime(timers[0], true).slice(6,10)
    document.getElementById('seconds_2').innerHTML = displayTime(timers[1], true).slice(6,10)

    document.getElementById('intertimer1').innerHTML = displayTime(intertimers[0])
    document.getElementById('intertimer2').innerHTML = displayTime(intertimers[1])
  }

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

  //SETTINGS
  function switchNames() {
    document.getElementById('name_1').innerHTML = playerNames[1];
    document.getElementById('name_2').innerHTML = playerNames[0];
    setNames();
    switchTimers();
  }

  function switchTimers() {
    timersMemory = timersMemory.reverse();
    resetTimers();
  }

  function setSound() {
    soundOn = soundOn ? false : true;
  }
  function setNames() {
    playerNames[0] = document.getElementById('name_1').innerHTML
    playerNames[1] = document.getElementById('name_2').innerHTML
  }

  function resetTimers() {
    timers = timersMemory.slice(0);
    intertimers = [0, 0];
    updateTimer();
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
    hours = time;
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
  //CLOCK
    function switchPlayer() {
    if (timerOn) {
      player = (player === 0) ? 1 : 0;
    }
    timerOn = false;
  }

  function tick() {
    var end = document.getElementById("end");
    if (!timers[player]) {
      if (soundOn) {
        end.play();
      }
      alert(playerNames[player] + " reached end of time!");
      clearInterval(clock);
      switchPlayer();
      disableInputs(false);
    } else {
      timers[player] -= 1;
      intertimers[player] += 1;
      updateTimer();
    }
  }

  function stopClock() {
    var stop = document.getElementById("stop");
    if (soundOn && timerOn) {
      stop.play();
    }
    clearInterval(clock);
    switchPlayer();
    disableInputs(false);
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
    disableInputs(true);
    clock = setInterval(tick, 100);
  }

  //HOT KEYS
  window.onkeyup = function (event) {
    var keycode = event.keyCode;
    var about = document.getElementById("info_button");
    about.blur();
    if (allowedHotkeys) {
      if (keycode === 32) {
        changePlayer(); //if it is now possilbe to disable scroll, tell me!
      } else if (keycode === 16) {
        stopClock();
      } else if (keycode === 66) {
        setBonusTime();
      } else if (keycode === 78) {
        setNames();
      } else if (keycode === 82) {
        resetTimers();
      }
    }
  };

  window.onload = function () {
    var soundButton = document.getElementById("sound_button"), click_button = document.getElementById("click_button"), stop_button = document.getElementById("stop_button"), time_button = document.getElementById("time_button"), set_names = document.getElementById("set_names"), bonus_button = document.getElementById("bonus_button"), reset_button = document.getElementById("reset_button");
    click_button.onclick = changePlayer;
    stop_button.onclick = stopClock;
    set_names.onclick = switchNames;
    bonus_button.onclick = setBonusTime;
    reset_button.onclick = resetTimers;

    sound_button.onclick = function () {
      setSound();
      soundOn ? sound_button.innerHTML = "SOUND OFF" : sound_button.innerHTML = "SOUND ON";
      soundButton.blur();
    };
  };

  function disableInputs(boolean) {
    var inputs=document.getElementsByTagName('input');
    for(i=0;i<inputs.length;i++){
      inputs[i].disabled=boolean;
    }  
  };

})();
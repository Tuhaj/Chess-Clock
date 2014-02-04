(function () {
  "use strict";
  var timers = [6000, 6000], intertimers = [0, 0], timeOne, timeTwo, bonus = 0, timerOn = false,
    player, clock, playerNames = ["", ""], name1, name2, soundOn = true, timersMemory = [6000, 6000];
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
  function setSound() {
    soundOn = soundOn ? false : true;
  }
  function setNames() {
    var name = document.getElementById("set_names");
    name1 = prompt("enter player one name");
    name2 = prompt("enter player two name");
    validatesLength(name1, setNames);
    validatesLength(name2, setNames);
    playerNames[0] = name1;
    playerNames[1] = name2;
    updatePlayersNames();
    name.blur();
  }

  function updatePlayersNames() {
    document.getElementById('player_1').innerHTML = playerNames[0];
    document.getElementById('player_2').innerHTML = playerNames[1];
  }

  function getsTimes() {
    timeOne = prompt("enter " + playerNames[0] + " (player 1) time in minutes");
    timeTwo = prompt("enter " + playerNames[1] + " (player 2) time in minutes");
    validatesNumForFunction(timeOne, getsTimes);
    validatesNumForFunction(timeTwo, getsTimes);
  }



  function setTimers() {
    var set = document.getElementById("time_button");
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
    var timeForMove = document.getElementById("bonus_button");
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
    if(minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    display = minutes + ":" + seconds + "." + decimals;
    if (long) {display = hours + ":" + display};
    return display;
    // these two options are different in only one point, change!
  }

  function updateView() {
    document.getElementById('counter1').innerHTML = displayTime(timers[0], true);  
    document.getElementById('counter2').innerHTML = displayTime(timers[1], true);
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
      if(timerOn) {
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
    var stop = document.getElementById("stop");
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
      timers[player] += parseInt(bonus) * 10;
    }
    player = (player === 0) ? 1 : 0;
    if (soundOn) {
      click.play();
    }
    cleanIntertimers();
    timerOn = true;
    clock = setInterval( tick, 100 );
  }

  //HOT KEYS
  window.onkeyup = function(event) {
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
  }


  window.onload = function() {
    var soundButton = document.getElementById("sound_button");
    var click_button = document.getElementById("click_button");
    var stop_button = document.getElementById("stop_button");
    var time_button = document.getElementById("time_button");
    var set_names = document.getElementById("set_names");
    var bonus_button = document.getElementById("bonus_button");
    var reset_button = document.getElementById("reset_button");


    click_button.onclick = changePlayer;
    stop_button.onclick = stopClock;
    time_button.onclick = setTimers;
    set_names.onclick = setNames;
    bonus_button.onclick = setBonusTime;
    reset_button.onclick = resetTimers;

    sound_button.onclick = function() {
      setSound();
      soundOn ? sound_button.innerHTML = "SOUND OFF" : sound_button.innerHTML = "SOUND ON";
      soundButton.blur();
    }

  }

})();

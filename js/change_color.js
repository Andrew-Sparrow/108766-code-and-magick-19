'use strict';
(function changeColor() {

  var setupPlayer = document.querySelector('.setup-player');
  var wizardEyeColor = setupPlayer.querySelector('.wizard-eyes');
  var wizardCoatColor = setupPlayer.querySelector('.wizard-coat ');
  var wizardFireBallColor = setupPlayer.querySelector('.setup-fireball-wrap');

  var coatColorForServer = setupPlayer.querySelector('#coat-color');
  var eyesColorForServer = setupPlayer.querySelector('#eyes-color');
  var fireballColorForServer = setupPlayer.querySelector('#fireball-color');

  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var fireBallColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  makeCounter.arrlength = eyesColors.length;

  // endless counter
  function makeCounter() {

    counter.count = 1;

    function counter() {
      if (counter.count === makeCounter.arrlength) {
        counter.count = 0;
      }
      return counter.count++;
    }

    return counter;
  }

  var makeCounterForEyes = makeCounter();

  function changeEyesColor() {
    wizardEyeColor.style.fill = eyesColors[makeCounterForEyes()];
    eyesColorForServer.value = wizardEyeColor.style.fill;
  }

  wizardEyeColor.addEventListener('click', changeEyesColor);

  makeCounter.arrlength = coatColors.length;
  var makeCounterForCoat = makeCounter();

  function changeCoatColor() {
    wizardCoatColor.style.fill = coatColors[makeCounterForCoat()];
    coatColorForServer.value = wizardCoatColor.style.fill;
  }

  wizardCoatColor.addEventListener('click', changeCoatColor);

  makeCounter.arrLength = fireBallColors.length;
  var makeCounterForFireBalls = makeCounter();

  function changeFireBallColor() {
    wizardFireBallColor.style.backgroundColor = fireBallColors[makeCounterForFireBalls()];
    var bgColor = wizardFireBallColor.style.backgroundColor;
    fireballColorForServer.value = rgb2hex(bgColor);
  }

  wizardFireBallColor.addEventListener('click', changeFireBallColor);

  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.*\d+)?\)$/);
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  function hex(x) {
    return ('0' + parseInt(x, 10).toString(16)).slice(-2);
  }
})();

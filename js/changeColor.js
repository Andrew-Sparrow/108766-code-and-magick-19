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

  var coatColor;
  var eyesColor;

  makeCounter.arrlength = eyesColors.length;

  var wizards = [];
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');


  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style =
      'z-index: 100;' +
      ' margin: 0 auto;' +
      ' text-align: center;' +
      ' background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  function successHandler(data) {
    wizards = data;
    console.log('successHandler ', wizards);
    updateWizards();
  }

  window.backend.load(successHandler, errorHandler);

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  var wizardsFromServer = wizards;


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

  function updateWizards() {

    var sameCoatWizards = wizardsFromServer.filter(function (serverWizard) {
      return serverWizard.colorCoat === coatColor;
    });

    var sameEyesWizards = wizardsFromServer.filter(function (serverWizard) {
      return serverWizard.colorEyes === eyesColor;
    });

    fillContainer(sameCoatWizards.concat((sameEyesWizards)));
  }

  function changeEyesColor() {
    wizardEyeColor.style.fill = eyesColors[makeCounterForEyes()];
    eyesColorForServer.value = wizardEyeColor.style.fill;
    eyesColor = eyesColorForServer.value;
    updateWizards();
  }

  wizardEyeColor.addEventListener('click', changeEyesColor);

  makeCounter.arrlength = coatColors.length;
  var makeCounterForCoat = makeCounter();

  function changeCoatColor() {
    wizardCoatColor.style.fill = coatColors[makeCounterForCoat()];
    coatColorForServer.value = wizardCoatColor.style.fill;
    coatColor = coatColorForServer.value;
    updateWizards();
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


  var wizardTemplateContainer = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var containerWizards = document.querySelector('.setup-similar-list');

  var AMOUNT_OF_WIZARDS = 4;

  /*
  * returns new wizard
  *
  * */
  function createWizard(wizard) {
    var newWizard = wizardTemplateContainer.cloneNode(true);

    var wizardFullName = wizard.name;
    var wizardCoat = wizard.colorCoat;
    var wizardEye = wizard.colorEyes;

    newWizard.querySelector('.wizard-coat').style.fill = wizardCoat;
    newWizard.querySelector('.wizard-eyes').style.fill = wizardEye;
    newWizard.querySelector('.setup-similar-label').innerText = wizardFullName;

    return newWizard;
  }

  /*
  * fills in container by given items
  *@param {Object} container - container for filling in.
  *@param {Number} times - how many times put the wizards in container.
  *
  */
  function fillContainer(items) {
    var fragment = new DocumentFragment();

    for (var i = 0; i < AMOUNT_OF_WIZARDS; i++) {
      fragment.appendChild(createWizard(items[i]));
    }
    containerWizards.appendChild(fragment);
  }

  document.querySelector('.setup-similar').classList.remove('hidden');
})();

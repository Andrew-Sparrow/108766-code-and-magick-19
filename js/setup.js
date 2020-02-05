'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupPlayer = document.querySelector('.setup-player');
var wizardEyeColor = setupPlayer.querySelector('.wizard-eyes');
var wizardCoatColor = setupPlayer.querySelector('.wizard-coat ');
var wizardFireBallColor = setupPlayer.querySelector('.setup-fireball-wrap');

var coatColorForServer = setupPlayer.querySelector('#coat-color');
var eyesColorForServer = setupPlayer.querySelector('#eyes-color');
var fireballColorForServer = setupPlayer.querySelector('#fireball-color');

var wizardTemplateContainer = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var containerWizards = document.querySelector('.setup-similar-list');
var AMOUNT_OF_WIZARDS = 4;

var listFirstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var listLastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

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

function onCloseButton(evt) {
  // popup shouldn't be closed if text filed is in focus
  if (evt.key === ESC_KEY && !evt.target.matches('input[type="text"]')) {
    closePopup();
  }
}

// returns random integer
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

/*
* returns new wizard
*
* */
function createWizard() {
  var newWizard = wizardTemplateContainer.cloneNode(true);
  var firstNameWizard = listFirstNames[getRandomIntInclusive(0, listFirstNames.length - 1)];
  var lastNameWizard = listLastNames[getRandomIntInclusive(0, listLastNames.length - 1)];
  var wizardFullName = firstNameWizard + ' ' + lastNameWizard;
  var wizardCoat = coatColors[getRandomIntInclusive(0, coatColors.length - 1)];
  var wizardEye = eyesColors[getRandomIntInclusive(0, eyesColors.length - 1)];

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
function fillContainer(container, times) {
  var fragment = new DocumentFragment();
  for (var i = 0; i < times; i++) {
    fragment.appendChild(createWizard());
  }
  container.appendChild(fragment);
}

fillContainer(containerWizards, AMOUNT_OF_WIZARDS);

document.querySelector('.setup-similar')
  .classList
  .remove('hidden');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && !evt.target.matches('input[type="text"]')) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onCloseButton);
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
  document.removeEventListener('keydown', onCloseButton);
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
    document.removeEventListener('keydown', onCloseButton);
  }
});

makeCounter.arrlength = eyesColors.length;

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

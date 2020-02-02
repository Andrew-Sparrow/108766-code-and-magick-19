'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardEyeColor = document.querySelector('#wizard-eyes');

// returned random integer
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

var wizardTemplateContainer = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var containerWizards = document.querySelector('.setup-similar-list');

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
/*
* returns new wizard
*
* */
function createWizard() {
  var newWizard = wizardTemplateContainer.cloneNode(true);
  var firstNameWizard = listFirstNames[getRandomIntInclusive(0, listFirstNames.length - 1)];
  var lastNameWizard = listLastNames[getRandomIntInclusive(0, listLastNames.length - 1)];
  var getFullName = firstNameWizard + ' ' + lastNameWizard;
  var getWizardCoat = coatColors[getRandomIntInclusive(0, coatColors.length - 1)];
  var getWizardEye = eyesColors[getRandomIntInclusive(0, eyesColors.length - 1)];

  newWizard.querySelector('.wizard-coat').style.fill = getWizardCoat;
  newWizard.querySelector('.wizard-eyes').style.fill = getWizardEye;
  newWizard.querySelector('.setup-similar-label').innerText = getFullName;

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

fillContainer(containerWizards, 4);

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

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY && !evt.target.matches('input[type="text"]')) {
      closePopup();
    }
  });
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

var setEyeColor = function () {

};

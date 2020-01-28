'use strict';

document.querySelector('.setup')
  .classList
  .remove('hidden');

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

var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];


var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
/*
* returns  new wizard
*
* */
function createWizard() {
  var newWizard = wizardTemplateContainer.cloneNode(true);
  var firstNameWizard = listFirstNames[getRandomIntInclusive(0, listFirstNames.length - 1)];
  var lastNameWizard = listLastNames[getRandomIntInclusive(0, listLastNames.length - 1)];
  var getFullName = firstNameWizard + ' ' + lastNameWizard;
  var getWizardCoat = coatColor[getRandomIntInclusive(0, coatColor.length - 1)];
  var getWizardEye = eyesColor[getRandomIntInclusive(0, eyesColor.length - 1)];

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

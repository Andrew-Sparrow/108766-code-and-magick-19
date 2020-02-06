'use strict';

(function crateWizards() {

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
})();
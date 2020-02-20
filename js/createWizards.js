'use strict';

(function () {

  var wizardTemplateContainer = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var containerWizards = document.querySelector('.setup-similar-list');

  var AMOUNT_OF_WIZARDS = 4;

  window.createWizards = {
    amountOfWizards: AMOUNT_OF_WIZARDS,
    fillContainer: fillContainer
  };

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
  function fillContainer(wizards) {
    var fragment = new DocumentFragment();

    for (var i = 0; i < AMOUNT_OF_WIZARDS; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }
    containerWizards.appendChild(fragment);
  }

  document.querySelector('.setup-similar').classList.remove('hidden');

})();

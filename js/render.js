'use strict';
(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template');
  var similar = document.querySelector('.setup-similar');
  var AMOUNT_OF_WIZARDS = 4;
  var similarList = document.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var element = wizardTemplate.content.cloneNode(true);

    var wizardElement = element.querySelector('.wizard');
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    element.querySelector('.setup-similar-label').innerText = wizard.name;

    return element;
  };

  window.render = function (data) {
    var takeNumber = data.length > AMOUNT_OF_WIZARDS ? AMOUNT_OF_WIZARDS : data.length;
    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarList.appendChild(renderWizard(data[i]));
    }

    similar.classList.remove('hidden');
  };
})();


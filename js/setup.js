'use strict';
(function setup() {

  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  // eslint-disable-next-line no-shadow
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');

  function onCloseButton(evt) {
    // popup shouldn't be closed if text filed is in focus
    if (evt.key === ESC_KEY && !evt.target.matches('input[type="text"]')) {
      closePopup();
    }
  }

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
})();

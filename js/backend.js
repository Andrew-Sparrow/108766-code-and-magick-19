'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');

  window.backend = {
    load: load,
    save: save
  };

  var URL = 'https://js.dump.academy/code-and-magick/data';

  var StatusCode = {
    OK: 200,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404
  };

  var TIMEOUT_IN_MS = 3000; // 3s

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.badRequest:
          error = StatusCode.badRequest + ' - Неверный запрос';
          break;
        case StatusCode.unauthorized:
          error = StatusCode.unauthorized + ' - Пользователь не авторизован';
          break;
        case StatusCode.notFound:
          error = StatusCode.notFound + ' - Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

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

  window.backend.load(window.createWizards.fillContainer, errorHandler);

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function (response) {
      userDialog.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

})();

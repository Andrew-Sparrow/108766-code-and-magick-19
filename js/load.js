'use strict';

(function () {

  var TIMEOUT_IN_MS = 3000; // 3s

  var URLtoSendForm = 'https://js.dump.academy/code-and-magick';

  var StatusCode = {
    OK: 200,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404
  };

  window.load = function (url, onSuccess, onError) {

    url = url || URL;

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.open('GET', url);

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
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
  };

  window.save = function (data, onLoad, onError) {
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

    xhr.open('POST', URLtoSendForm);
    xhr.send(data);
  };

})();

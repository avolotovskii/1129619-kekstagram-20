'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var LOAD_URL = 'https://javascript.pages.academy/kekstagram/data';
  var SEND_URL = 'https://javascript.pages.academy/kekstagram';
  var XHR_READY_STATE_READY = 4;

  var Code = {
    SUCCESS: 200,
    REQUEST_ERROR: 400,
    ACCESS_ERROR: 403,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500,
    RESPONSE_ERROR: 502,
    SERVICE_UNAVIALABLE: 503
  };

  var RequestMethod = {
    GET: 'GET',
    POST: 'POST'
  };

  var processServerStatus = function (xhr, onLoad, onError, errorButtonText) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.readyState === XHR_READY_STATE_READY) {
        if (xhr.status === Code.SUCCESS) {
          onLoad(xhr.response);
        } else {
          switch (xhr.status) {
            case Code.REQUEST_ERROR:
              onError('Ошибка 400: Неверный запрос', errorButtonText);
              break;
            case Code.ACCESS_ERROR:
              onError('Ошибка 403: Доступ запрещен', errorButtonText);
              break;
            case Code.NOT_FOUND_ERROR:
              onError('Ошибка 404: Ничего не найдено', errorButtonText);
              break;
            case Code.SERVER_ERROR:
              onError('Ошибка 500: Ошибка сервера', errorButtonText);
              break;
            case Code.RESPONSE_ERROR:
              onError('Ошибка 502: Неверный ответ сервера', errorButtonText);
              break;
            case Code.SERVICE_UNAVIALABLE:
              onError('Ошибка 503: Сервер временно недоступен', errorButtonText);
              break;
            default:
              onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText, errorButtonText);
          }
        }
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', errorButtonText);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не выполнился за ' + xhr.timeout + 'мс', errorButtonText);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  var load = function (onLoad, onError) {
    var xhrLoad = new XMLHttpRequest();
    var errorButtonText = 'Закрыть';

    xhrLoad.open(RequestMethod.GET, LOAD_URL);
    processServerStatus(xhrLoad, onLoad, onError, errorButtonText);
    xhrLoad.send();
  };

  var send = function (data, onLoad, onError) {
    var xhrSend = new XMLHttpRequest();
    var errorButtonText = 'Загрузить другой файл';

    xhrSend.open(RequestMethod.POST, SEND_URL);
    processServerStatus(xhrSend, onLoad, onError, errorButtonText);
    xhrSend.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };
})();

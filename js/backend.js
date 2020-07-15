'use strict';

(function () {
  var TIMEOUT_MS = 10000;
  var Url = {
    LOAD: 'https://javascript.pages.academy/kekstagram/data',
    SEND: 'https://javascript.pages.academy/kekstagram'
  };

  var processServerStatus = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          switch (xhr.status) {
            case 400:
              onError('Ошибка 400: Неверный запрос');
              break;
            case 403:
              onError('Ошибка 403: Доступ запрещен');
              break;
            case 404:
              onError('Ошибка 404: Ничего не найдено');
              break;
            case 500:
              onError('Ошибка 500: Ошибка сервера');
              break;
            case 502:
              onError('Ошибка 502: Неверный ответ сервера');
              break;
            case 503:
              onError('Ошибка 503: Сервер временно недоступен');
              break;
            default:
              onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
          }
        }
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не выполнился за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_MS;
  };

  var load = function (onLoad, onError) {
    var xhrLoad = new XMLHttpRequest();
    xhrLoad.open('GET', Url.LOAD);
    processServerStatus(xhrLoad, onLoad, onError);
    xhrLoad.send();
  };

  var send = function (data, onLoad, onError) {
    var xhrSend = new XMLHttpRequest();
    xhrSend.open('POST', Url.SEND);
    processServerStatus(xhrSend, onLoad, onError);
    xhrSend.send(data);
  };

  window.backend = {
    load: load,
    send: send,
  };
})();


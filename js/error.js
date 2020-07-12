'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var main = document.querySelector('main');

  var closeErrorMessage = function () {
    var errorWindow = document.querySelector('.error');
    var errorButton = errorWindow.querySelector('.error__button');

    errorButton.removeEventListener('click', clickErrorButtonHandler);
    document.removeEventListener('keydown', keydownErrorMessageHandler);
    document.removeEventListener('click', clickErrorWindowHandler);

    main.removeChild(errorWindow);
  };

  var clickErrorWindowHandler = function (evt) {
    if (evt.target !== document.querySelector('.error__inner')) {
      closeErrorMessage();
    }
  };

  var clickErrorButtonHandler = function () {
    closeErrorMessage();
  };

  var keydownErrorMessageHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closeErrorMessage();
    }
  };

  var createErrorMessage = function (errorMessage, errorType) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var newError = errorTemplate.cloneNode(true);

    var errorTitle = newError.querySelector('.error__title');
    var errorButton = newError.querySelector('.error__button');
    var fragment = document.createDocumentFragment();

    errorTitle.textContent = errorMessage;

    if (errorType) {
      errorButton.textContent = 'Закрыть';
    }

    fragment.appendChild(newError);
    main.appendChild(fragment);

    errorButton.addEventListener('click', clickErrorButtonHandler);
    document.addEventListener('keydown', keydownErrorMessageHandler);
    document.addEventListener('click', clickErrorWindowHandler);
  };

  var loadErrorHandler = function (errorMessage) {
    var isLoadMessage = true;
    createErrorMessage(errorMessage, isLoadMessage);
  };

  var sendErrorHandler = function (errorMessage) {
    var isLoadMessage = false;
    createErrorMessage(errorMessage, isLoadMessage);
  };

  window.error = {
    loadErrorHandler: loadErrorHandler,
    sendErrorHandler: sendErrorHandler
  };
})();

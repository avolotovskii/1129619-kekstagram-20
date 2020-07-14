'use strict';

(function () {
  var main = document.querySelector('main');
  var ESC_KEY = 'Escape';

  var closeSuccessWindow = function () {
    var successWindow = document.querySelector('.success');
    var successCloseButton = successWindow.querySelector('.success__button');

    successCloseButton.removeEventListener('click', clickSuccessButtonHandler);
    document.removeEventListener('click', clickSuccessWindowHandler);
    document.removeEventListener('keydown', keydownSuccessMessageHandler);

    main.removeChild(successWindow);
  };

  var keydownSuccessMessageHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closeSuccessWindow();
    }
  };

  var clickSuccessWindowHandler = function (evt) {
    if (evt.target !== document.querySelector('.success__inner')) {
      closeSuccessWindow();
    }
  };

  var clickSuccessButtonHandler = function () {
    closeSuccessWindow();
  };

  var createSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var fragment = document.createDocumentFragment();
    var newSuccessMessage = successTemplate.cloneNode(true);
    var successCloseButton = newSuccessMessage.querySelector('.success__button');

    fragment.appendChild(newSuccessMessage);
    main.appendChild(fragment);

    successCloseButton.addEventListener('click', clickSuccessButtonHandler);
    document.addEventListener('click', clickSuccessWindowHandler);
    document.addEventListener('keydown', keydownSuccessMessageHandler);
  };

  var successHandler = function () {
    createSuccessMessage();
  };

  window.success = {
    successHandler: successHandler
  };
})();

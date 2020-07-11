'use strict';

(function () {
  var loadErrorHandler = function (errorMessage) {
    var errorWindow = document.querySelector('#error').content.querySelector('.error');

    var newError = errorWindow.cloneNode(true);
    var fragment = document.createDocumentFragment();

    newError.querySelector('.error__title').textContent = errorMessage;
    newError.querySelector('.error__button').classList.add('hidden');

    fragment.appendChild(newError);
    document.body.appendChild(fragment);
  };

  window.error = {
    loadErrorHandler: loadErrorHandler
  };
})();

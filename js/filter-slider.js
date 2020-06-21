'use strict';

(function () {
  var imgUploadForm = window.util.imgUploadForm;

  var effectLevel = imgUploadForm.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var lineWidth = effectLevelLine.offsetWidth;
    var startCoords = evt.clientX;

    var pinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var pinCoordX = effectLevelPin.offsetLeft - shift;

      startCoords = moveEvt.clientX;

      if (!(pinCoordX < 0 || pinCoordX > lineWidth)) {
        var pinPoint = pinCoordX / effectLevelLine.offsetWidth;

        effectLevelPin.style.left = pinCoordX + 'px';
        effectLevelValue.value = Math.round(pinPoint * 100);
        effectLevelDepth.style.width = pinPoint * 100 + '%';
      }
    };
    var effectPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', effectPinMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', effectPinMouseUpHandler);
  });
  window.filterSlider = {
    effectLevel: effectLevel
  };
})();

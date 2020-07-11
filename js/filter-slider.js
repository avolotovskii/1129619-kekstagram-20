'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = 100;
  var MAX_GRAYSCALE_VALUE = 1;
  var MAX_SEPIA_VALUE = 1;
  var MAX_INVERT_VALUE = 100;
  var MAX_BLUR_VALUE = 3;
  var MIN_BRIGHTNESS_VALUE = 1;
  var MAX_BRIGHTNESS_VALUE = 3;

  var imageEditor = window.util.imageEditor;
  var imageUploadPreview = window.util.imageUploadPreview;
  var getValueRange = window.util.getValueRange;

  var effectLevel = imageEditor.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');

  var setDefaultDepthValue = function () {
    effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
    effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + '%';
    effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
    imageUploadPreview.style.filter = '';
  };

  var setNewEffectDepth = function (levelValue) {
    var proportion = levelValue / 100;
    var effectClasses = Array.from(imageUploadPreview.classList);

    for (var i = 0; i < effectClasses.length; i++) {
      if (effectClasses[i].match('effects__preview--')) {
        switch (effectClasses[i]) {
          case 'effects__preview--chrome':
            imageUploadPreview.style.filter = 'grayscale(' + (MAX_GRAYSCALE_VALUE * proportion) + ')';
            break;
          case 'effects__preview--sepia':
            imageUploadPreview.style.filter = 'sepia(' + (MAX_SEPIA_VALUE * proportion) + ')';
            break;
          case 'effects__preview--marvin':
            imageUploadPreview.style.filter = 'invert(' + (MAX_INVERT_VALUE * proportion) + '%)';
            break;
          case 'effects__preview--phobos':
            imageUploadPreview.style.filter = 'blur(' + (MAX_BLUR_VALUE * proportion) + 'px)';
            break;
          case 'effects__preview--heat':
            imageUploadPreview.style.filter = 'brightness(' + getValueRange(proportion, MIN_BRIGHTNESS_VALUE, MAX_BRIGHTNESS_VALUE) + ')';
            break;
          default:
            imageUploadPreview.style.filter = '';
        }
      }
    }
  };

  var effectLevelPinMousedownHandler = function (evt) {
    evt.preventDefault();
    var levelLineWidth = effectLevelLine.offsetWidth;
    var startCoords = evt.clientX;

    var effectPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      var pinCoordX = effectLevelPin.offsetLeft - shift;

      startCoords = moveEvt.clientX;

      if (!(pinCoordX < 0 || pinCoordX > levelLineWidth)) {
        var pinPoint = pinCoordX / effectLevelLine.offsetWidth;

        effectLevelPin.style.left = pinCoordX + 'px';
        effectLevelValue.value = Math.round(pinPoint * 100);
        effectLevelDepth.style.width = Math.round(pinPoint * 100) + '%';
        setNewEffectDepth(effectLevelValue.value);
      }
    };

    var effectPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', effectPinMouseMoveHandler);
      document.removeEventListener('mouseup', effectPinMouseUpHandler);
    };

    document.addEventListener('mousemove', effectPinMouseMoveHandler);
    document.addEventListener('mouseup', effectPinMouseUpHandler);
  };

  effectLevelPin.addEventListener('mousedown', effectLevelPinMousedownHandler);

  window.filterSlider = {
    effectLevel: effectLevel,
    setDefaultDepthValue: setDefaultDepthValue
  };
})();

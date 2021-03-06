'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = 100;
  var MaxValue = {
    GRAYSCALE: '1',
    SEPIA: '1',
    INVERT: '100',
    BLUR: '3',
    BRIGHTNESS: '3',
  };

  var MIN_BRIGHTNESS_VALUE = 1;

  var imageEditor = document.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageEditor.querySelector('.img-upload__preview img');
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
            imageUploadPreview.style.filter = 'grayscale(' + (MaxValue.GRAYSCALE * proportion) + ')';
            break;
          case 'effects__preview--sepia':
            imageUploadPreview.style.filter = 'sepia(' + (MaxValue.SEPIA * proportion) + ')';
            break;
          case 'effects__preview--marvin':
            imageUploadPreview.style.filter = 'invert(' + (MaxValue.INVERT * proportion) + '%)';
            break;
          case 'effects__preview--phobos':
            imageUploadPreview.style.filter = 'blur(' + (MaxValue.BLUR * proportion) + 'px)';
            break;
          case 'effects__preview--heat':
            imageUploadPreview.style.filter = 'brightness(' + getValueRange(proportion, MIN_BRIGHTNESS_VALUE, MaxValue.BRIGHTNESS) + ')';
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

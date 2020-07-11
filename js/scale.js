'use strict';

(function () {
  var SCALE_CHANGE_STEP = 25;
  var SCALE_MIN_VALUE = 25;
  var SCALE_MAX_VALUE = 100;

  var imageEditor = window.util.imageEditor;
  var imageUploadPreview = window.util.imageUploadPreview;

  var scaleContainer = imageEditor.querySelector('.scale');
  var buttonScaleSmaller = scaleContainer.querySelector('.scale__control--smaller');
  var buttonScaleBigger = scaleContainer.querySelector('.scale__control--bigger');
  var scaleControlValue = scaleContainer.querySelector('.scale__control--value');

  var setScaleValue = function (value) {
    scaleControlValue.value = value;
  };

  var setImageScale = function (scaleValue) {
    var newScale = scaleValue / 100;
    imageUploadPreview.style.transform = 'scale(' + newScale + ')';
  };

  var getValue = function () {
    var value = parseInt(scaleControlValue.value.replace('%', ''), 10);

    return value;
  };

  var decreaseScaleValue = function () {
    var scaleValue = getValue();
    if (scaleValue > SCALE_MIN_VALUE) {
      scaleValue = scaleValue - SCALE_CHANGE_STEP;
    }

    return scaleValue;
  };

  var increaseScaleValue = function () {
    var scaleValue = getValue();
    if (scaleValue < SCALE_MAX_VALUE) {
      scaleValue = scaleValue + SCALE_CHANGE_STEP;
    }

    return scaleValue;
  };

  var scaleSmallerClickHandler = function () {
    var newValue = decreaseScaleValue();
    setImageScale(newValue);
    scaleControlValue.value = newValue + '%';
  };

  var scaleBiggerClickHandler = function () {
    var newValue = increaseScaleValue();
    setImageScale(newValue);
    scaleControlValue.value = newValue + '%';
  };

  buttonScaleSmaller.addEventListener('click', scaleSmallerClickHandler);
  buttonScaleBigger.addEventListener('click', scaleBiggerClickHandler);

  window.scale = {
    setScaleValue: setScaleValue,
    setImageScale: setImageScale
  };
})();

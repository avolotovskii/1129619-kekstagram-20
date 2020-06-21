'use strict';

(function () {
  var SCALE_CHANGE_STEP = 25;
  var SCALE_MIN_VALUE = 25;
  var SCALE_MAX_VALUE = 100;

  var imgUploadOverlay = window.util.imgUploadOverlay;

  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
  var scaleContainer = document.querySelector('.scale');
  var buttonScaleSmaller = scaleContainer.querySelector('.scale__control--smaller');
  var buttonScaleBigger = scaleContainer.querySelector('.scale__control--bigger');
  var scaleControlValue = scaleContainer.querySelector('.scale__control--value');

  var scaleValue = function (value) {
    document.querySelector('.scale__control--value').value = value;
  };

  var imageScale = function (scaValue) {
    var newScale = scaValue / 100;
    imgUploadPreview.setAttribute('style', 'transform: scale(' + newScale + ');');
  };

  var getValue = function () {
    var value = parseInt(scaleControlValue.value.replace('%', ''), 10);

    return value;
  };

  var decreaseScaleValue = function () {
    var valueScale = getValue();
    if (valueScale > SCALE_MIN_VALUE) {
      valueScale = valueScale - SCALE_CHANGE_STEP;
    }

    return valueScale;
  };

  var increaseScaleValue = function () {
    var scValue = getValue();
    if (scValue < SCALE_MAX_VALUE) {
      scValue = scValue + SCALE_CHANGE_STEP;
    }

    return scValue;
  };

  var scaleSmallerClickHandler = function () {
    var newValue = decreaseScaleValue();
    imageScale(newValue);
    scaleControlValue.value = newValue + '%';
  };

  var scaleBiggerClickHandler = function () {
    var newValue = increaseScaleValue();
    imageScale(newValue);
    scaleControlValue.value = newValue + '%';
  };

  buttonScaleSmaller.addEventListener('click', scaleSmallerClickHandler);
  buttonScaleBigger.addEventListener('click', scaleBiggerClickHandler);

  window.scale = {
    scaleValue: scaleValue,
    imageScale: imageScale,
    imgUploadPreview: imgUploadPreview
  };
})();

'use strict';

(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var imageEditor = uploadForm.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageEditor.querySelector('.img-upload__preview img');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrayElement = function (array) {
    return array[getRandomInt(0, array.length - 1)];
  };

  var getValueRange = function (value, min, max) {
    return value * (max - min) + min;
  };

  window.util = {
    uploadForm: uploadForm,
    imageEditor: imageEditor,
    imageUploadPreview: imageUploadPreview,
    getRandomInt: getRandomInt,
    getRandomArrayElement: getRandomArrayElement,
    getValueRange: getValueRange
  };
})();

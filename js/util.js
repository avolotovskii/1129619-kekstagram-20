'use strict';

(function () {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');

  var getRandomArrayElem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.util = {
    imgUploadForm: imgUploadForm,
    imgUploadOverlay: imgUploadOverlay,
    getRandomInt: getRandomInt,
    getRandomArrayElem: getRandomArrayElem
  };
})();

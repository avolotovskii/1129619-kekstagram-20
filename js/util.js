'use strict';

(function () {
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
    getRandomInt: getRandomInt,
    getRandomArrayElement: getRandomArrayElement,
    getValueRange: getValueRange
  };
})();

'use strict';

(function () {
  var MAX_RANDOM_AMOUNT = 10;

  var getRandomArrayElement = window.util.getRandomArrayElement;
  var removeUsersPhotos = window.gallery.removeUsersPhotos;
  var addUsersPhotos = window.gallery.addUsersPhotos;

  var imgFilters = document.querySelector('.img-filters');
  var defaultButton = imgFilters.querySelector('#filter-default');
  var randomButton = imgFilters.querySelector('#filter-random');
  var discussedButton = imgFilters.querySelector('#filter-discussed');

  var toggleActiveFilter = function (button) {
    var activeElement = imgFilters.querySelector('.img-filters__button--active');
    activeElement.classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  };

  var showDefaultPhotos = function () {
    addUsersPhotos(window.data.elementsList);
  };

  var showRandomPhotos = function () {
    var randomElements = [];

    while (randomElements.length < MAX_RANDOM_AMOUNT) {
      var newItem = getRandomArrayElement(window.data.elementsList);
      if (randomElements.indexOf(newItem) === -1) {
        randomElements.push(newItem);
      }
    }

    addUsersPhotos(randomElements);
  };

  var showDiscussedPhotos = function () {
    var elementsListCopy = window.data.elementsList.slice();
    var sortedList = elementsListCopy.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });

    addUsersPhotos(sortedList);
  };

  var imgFiltersClickHandler = window.debounce(function (evt) {
    toggleActiveFilter(evt.target);
    removeUsersPhotos();

    switch (evt.target) {
      case defaultButton:
        showDefaultPhotos();
        break;
      case randomButton:
        showRandomPhotos();
        break;
      case discussedButton:
        showDiscussedPhotos();
        break;
      default:
        showDefaultPhotos();
    }
  });

  imgFilters.addEventListener('click', imgFiltersClickHandler);
})();

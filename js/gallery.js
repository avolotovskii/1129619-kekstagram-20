'use strict';

(function () {
  var PHOTOS_AMOUNT = 25;
  var pushElements = window.data.pushElements;
  var elementsList = [];
  var usersPhotos = document.querySelector('.pictures');

  var photoTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');

  var createPhotoElement = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  };

  var addToFragment = function (elements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(createPhotoElement(elements[i]));
    }

    return fragment;
  };

  elementsList = pushElements(PHOTOS_AMOUNT);
  usersPhotos.appendChild(addToFragment(elementsList));

  window.gallery = {
    usersPhotos: usersPhotos,
    elementsList: elementsList
  };
})();

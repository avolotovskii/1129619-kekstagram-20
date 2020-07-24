'use strict';

(function () {
  var usersPhotos = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var createPictureElement = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').dataset.index = photo.id;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  };

  var addUsersPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(createPictureElement(photos[i]));
    }

    usersPhotos.appendChild(fragment);
  };

  var removeUsersPhotos = function () {
    var showPhotos = usersPhotos.querySelectorAll('.picture');
    showPhotos.forEach(function (it) {
      usersPhotos.removeChild(it);
    });
  };

  window.gallery = {
    addUsersPhotos: addUsersPhotos,
    removeUsersPhotos: removeUsersPhotos
  };
})();

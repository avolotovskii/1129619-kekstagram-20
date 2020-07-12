'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var fillPhotoInfo = window.mainPhoto.fillPhotoInfo;

  var bigPhotoTemplate = document.querySelector('.big-picture');
  var closePhotoButton = bigPhotoTemplate.querySelector('#picture-cancel');
  var photosContainer = document.querySelector('.pictures');

  var showBigPhoto = function (bigPhoto) {
    bigPhoto.classList.remove('hidden');
    return bigPhoto;
  };

  var hideCounts = function (bigPhoto) {
    var commentsCount = bigPhoto.querySelector('.social__comment-count');
    var commentsLoader = bigPhoto.querySelector('.comments-loader');
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  var showPhoto = function (target) {
    var activePhoto = showBigPhoto(bigPhotoTemplate);
    var currentIndex = parseInt(target.dataset.index, 10);
    fillPhotoInfo(activePhoto, window.data.elementsList[currentIndex]);
    document.body.classList.add('modal-open');
    hideCounts(bigPhotoTemplate);
  };

  var closePhoto = function () {
    bigPhotoTemplate.classList.add('hidden');
    document.body.classList.remove('modal-open');

    closePhotoButton.removeEventListener('click', closePhotoClickHandler);
    document.removeEventListener('keydown', closePhotoKeydownHandler);
  };

  var closePhotoClickHandler = function () {
    closePhoto();
  };

  var closePhotoKeydownHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closePhoto();
    }
  };

  var addCloseHandlers = function () {
    closePhotoButton.addEventListener('click', closePhotoClickHandler);
    document.addEventListener('keydown', closePhotoKeydownHandler);
  };

  var showPhotoClickHandler = function (evt) {
    var evtTarget = evt.target;
    if (evtTarget.classList.contains('picture__img')) {
      showPhoto(evtTarget);
      addCloseHandlers();
    }
  };

  var showPhotoKeydownHandler = function (evt) {
    if (evt.key === ENTER_KEY && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      var targetImage = evt.target.querySelector('.picture__img');
      showPhoto(targetImage);
      addCloseHandlers();
    }
  };

  photosContainer.addEventListener('click', showPhotoClickHandler);
  photosContainer.addEventListener('keydown', showPhotoKeydownHandler);

  window.mainPhotoModal = {
    showPPhoto: showPhoto
  };
})();

'use strict';

(function () {
  var Keycode = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter'
  };

  var fillPhotoInfo = window.mainPhoto.fillInfo;
  var loadComments = window.mainPhoto.loadComments;

  var photosContainer = document.querySelector('.pictures');
  var bigPhotoTemplate = document.querySelector('.big-picture');
  var commentsLoader = bigPhotoTemplate.querySelector('.comments-loader');
  var closePhotoButton = bigPhotoTemplate.querySelector('#picture-cancel');
  var commentsDataCopy = [];

  var loaderClickHandler = function () {
    loadComments(commentsDataCopy);

    if (commentsDataCopy.length === 0) {
      commentsLoader.removeEventListener('click', loaderClickHandler);
      commentsLoader.classList.add('hidden');
    }
  };

  var showPhoto = function (target) {
    var currentIndex = parseInt(target.dataset.index, 10);
    var element = window.data.elementsList[currentIndex];

    bigPhotoTemplate.classList.remove('hidden');
    commentsDataCopy = element.comments.slice();

    fillPhotoInfo(bigPhotoTemplate, element);

    if (element.comments.length > window.mainPhoto.MAX_COMMENTS_AMOUNT) {
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', loaderClickHandler);
    }

    loadComments(commentsDataCopy);
    document.body.classList.add('modal-open');
  };

  var closePhoto = function () {
    bigPhotoTemplate.classList.add('hidden');
    document.body.classList.remove('modal-open');

    closePhotoButton.removeEventListener('click', closePhotoClickHandler);
    document.removeEventListener('keydown', closePhotoKeydownHandler);
    commentsLoader.removeEventListener('click', loaderClickHandler);
  };

  var closePhotoClickHandler = function () {
    closePhoto();
  };

  var closePhotoKeydownHandler = function (evt) {
    if (evt.key === Keycode.ESC_KEY) {
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
    if (evt.key === Keycode.ENTER_KEY && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      var targetImage = evt.target.querySelector('.picture__img');
      showPhoto(targetImage);
      addCloseHandlers();
    }
  };

  photosContainer.addEventListener('click', showPhotoClickHandler);
  photosContainer.addEventListener('keydown', showPhotoKeydownHandler);
})();

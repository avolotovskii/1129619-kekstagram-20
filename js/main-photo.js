'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var pageBody = document.querySelector('body');
  // var photoCollection = document.querySelectorAll('.picture__img');
  var elementsList = window.gallery.elementsList;
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = commentsList.querySelector('.social__comment');
  var usersPhotos = document.querySelector('.pictures');
  var bigPhotoTemplate = document.querySelector('.big-picture');
  var closePhotoButton = bigPhotoTemplate.querySelector('#picture-cancel');

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

  var renderUserComment = function (commentData) {
    var userComment = commentTemplate.cloneNode(true);

    userComment.querySelector('img').src = commentData.avatar;
    userComment.querySelector('img').alt = commentData.name;
    userComment.querySelector('.social__text').textContent = commentData.message;

    return userComment;
  };

  var createCommentsFragment = function (commentData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentData.length; i++) {
      var newComment = renderUserComment(commentData[i]);
      fragment.appendChild(newComment);
    }

    return fragment;
  };

  var addComments = function (commentsContainer, fragment) {
    commentsContainer.innerHTML = '';
    commentsContainer.appendChild(fragment);
  };

  var fillPhotoInfo = function (bigPhoto, photoData) {
    var photoBlock = bigPhoto.querySelector('.big-picture__img');
    var contentBlock = bigPhoto.querySelector('.big-picture__social');
    var commentsFragment = createCommentsFragment(photoData.comments);

    photoBlock.querySelector('img').src = photoData.url;
    contentBlock.querySelector('.likes-count').textContent = photoData.likes;
    contentBlock.querySelector('.comments-count').textContent = photoData.comments.length;
    contentBlock.querySelector('.social__caption').textContent = photoData.description;

    addComments(commentsList, commentsFragment);
    hideCounts(bigPhoto);
  };

  var closePhoto = function () {
    bigPhotoTemplate.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  var closePhotoClickHandler = function () {
    closePhoto();
    closePhotoButton.removeEventListener('click', closePhotoClickHandler);
  };

  var closePhotoKeydownHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closePhoto();
      document.removeEventListener('keydown', closePhotoKeydownHandler);
    }
  };

  var showPhoto = function (target) {
    var activePhoto = showBigPhoto(bigPhotoTemplate);
    var currentIndex = parseInt(target.dataset.index, 10);
    fillPhotoInfo(activePhoto, elementsList[currentIndex]);
    document.body.classList.add('modal-open');
  };

  // var showPhotoClickHandler = function () {
  //   for (var i = 0; i <= photoCollection.length; i++) {
  //     showPhoto(i);
  //   }

  //   closePhotoButton.addEventListener('click', closePhotoClickHandler);
  //   document.addEventListener('keydown', closePhotoKeydownHandler);
  // };

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

  // до этого момента все ОК

  var showPhotoKeydownHandler = function (evt) {
    if (evt.key === ENTER_KEY && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      var targetImage = evt.target.querySelector('.picture__img');
      showPhoto(targetImage);
      addCloseHandlers();
    }
  };

  usersPhotos.addEventListener('click', showPhotoClickHandler);
  usersPhotos.addEventListener('keydown', showPhotoKeydownHandler);

  window.mainPhoto = {
    pageBody: pageBody
  };
})();

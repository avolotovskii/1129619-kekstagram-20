'use strict';

(function () {
  var MAX_COMMENTS_AMOUNT = 5;

  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = commentsList.querySelector('.social__comment');
  var commentsCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var hideCounts = function () {
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
    commentData.forEach(function (item) {
      var newComment = renderUserComment(item);
      fragment.appendChild(newComment);
    });

    return fragment;
  };

  var loadComments = function (commentsArray) {
    var shownComments = commentsArray.splice(0, MAX_COMMENTS_AMOUNT);
    var commentsFragment = createCommentsFragment(shownComments);
    commentsList.appendChild(commentsFragment);
  };

  var fillPhotoInfo = function (bigPhoto, photoData) {
    var photoBlock = bigPhoto.querySelector('.big-picture__img');
    var contentBlock = bigPhoto.querySelector('.big-picture__social');

    commentsList.innerHTML = '';
    hideCounts(bigPhoto);

    photoBlock.querySelector('img').src = photoData.url;
    contentBlock.querySelector('.likes-count').textContent = photoData.likes;
    contentBlock.querySelector('.comments-count').textContent = photoData.comments.length;
    contentBlock.querySelector('.social__caption').textContent = photoData.description;
  };

  window.mainPhoto = {
    fillInfo: fillPhotoInfo,
    loadComments: loadComments
  };
})();

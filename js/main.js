'use strict';

var NAMES = [
  'Гарри Поттер',
  'Арнольд Шварцнегер',
  'Дольф Лунгред',
  'Ники Минаж',
  'Алла Борисовна',
  'Бродский'
];

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTOS_AMOUNT = 25;
var elementsList = [];

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var usersPhotos = document.querySelector('.pictures');

var commentsList = document.querySelector('.social__comments');
var commentTemplate = commentsList.querySelector('.social__comment');
var bigPhotoTemplate = document.querySelector('.big-picture');

var getRandomArrayElem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// создает комментарий
var getComments = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
    message: getRandomArrayElem(MESSAGES),
    name: getRandomArrayElem(NAMES)
  };
  return comment;
};

// создает массив комментариев
var createCommentsArray = function () {
  var commentsAmount = getRandomInt(1, 10);
  var comments = [];
  for (var i = 0; i <= commentsAmount; i++) {
    comments.push(getComments());
  }

  return comments;
};

var createPhotoDescription = function (photoIndex, description) {
  var photoDescription = {
    url: 'photos/' + photoIndex + '.jpg',
    description: description,
    likes: getRandomInt(15, 200),
    comments: createCommentsArray()
  };

  return photoDescription;
};

var pushElements = function (amount) {
  var elements = [];
  for (var i = 1; i <= amount; i++) {
    var newElement = createPhotoDescription(i, 'Здесь должно быть описание');
    elements.push(newElement);
  }

  return elements;
};

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

elementsList = pushElements(PHOTOS_AMOUNT);
usersPhotos.appendChild(addToFragment(elementsList));
var activePhoto = showBigPhoto(bigPhotoTemplate);
var pageBody = document.querySelector('body');
pageBody.classList.add('modal-open');
fillPhotoInfo(activePhoto, elementsList[0]);

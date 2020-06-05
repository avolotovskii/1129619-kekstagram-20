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

var createPhotoElement = function (picture) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = picture.url;
  photoElement.querySelector('.picture__comments').textContent = picture.comments.length;
  photoElement.querySelector('.picture__likes').textContent = picture.likes;

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

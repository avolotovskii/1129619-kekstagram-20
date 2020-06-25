'use strict';

(function () {
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

  var getRandomInt = window.util.getRandomInt;
  var getRandomArrayElem = window.util.getRandomArrayElem;

  var getComments = function () {
    var comment = {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: getRandomArrayElem(MESSAGES),
      name: getRandomArrayElem(NAMES)
    };
    return comment;
  };

  var createCommentsArray = function () {
    var commentsAmount = getRandomInt(1, 10);
    var comments = [];
    for (var i = 0; i <= commentsAmount; i++) {
      comments.push(getComments());
    }

    return comments;
  };

  var createPhotoDescription = function (photoIndex) {
    var photoDescription = {
      url: 'photos/' + photoIndex + '.jpg',
      description: 'Описание к картинке',
      likes: getRandomInt(15, 200),
      comments: createCommentsArray()
    };

    return photoDescription;
  };

  var pushElements = function (amount) {
    var elements = [];
    for (var i = 1; i < amount; i++) {
      var newElement = createPhotoDescription(i + 1);
      elements.push(newElement);
    }

    return elements;
  };

  window.data = {
    pushElements: pushElements
  };
})();

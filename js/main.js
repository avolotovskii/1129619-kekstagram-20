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

var SCALE_CONTROL_DEFAULT = '100%';
var SCALE_IMAGE_DEFAULT = 100;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var SCALE_CHANGE_STEP = 25;
var SCALE_MIN_VALUE = 25;
var SCALE_MAX_VALUE = 100;

var MAX_HASHTAGS_AMOUNT = 5;
var MAX_HASHTAG_CHARACTERS = 20;
var HASHTAG_PATTERN = /^([#]{1})([0-9a-zа-яё]{1,19})$/g;


var PHOTOS_AMOUNT = 25;
var elementsList = [];

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var usersPhotos = document.querySelector('.pictures');
var commentsList = document.querySelector('.social__comments');
var commentTemplate = commentsList.querySelector('.social__comment');
var bigPhotoTemplate = document.querySelector('.big-picture');
var pageBody = document.querySelector('body');
var photoCollection = usersPhotos.querySelectorAll('.picture__img');
var closePhotoButton = bigPhotoTemplate.querySelector('#picture-cancel');

// Поиск рандомного элемента мин-макс
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


// Создает и отрисовывает массив с фотографиями
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

elementsList = pushElements(PHOTOS_AMOUNT);
usersPhotos.appendChild(addToFragment(elementsList));

// MODULE3-TASK3

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
  pageBody.classList.remove('modal-open');
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

var showPhoto = function (index) {
  var activePhoto = showBigPhoto(bigPhotoTemplate);
  pageBody.classList.add('modal-open');
  fillPhotoInfo(activePhoto, elementsList[index]);
};

var showPhotoClickHandler = function (evt) {
  for (var i = 0; i <= photoCollection.length; i++) {
    showPhoto(i);
  }

  closePhotoButton.addEventListener('click', closePhotoClickHandler);
  document.addEventListener('keydown', closePhotoKeydownHandler);
};

var showPhotoKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    var currentPicture = evt.target.querySelector('.picture__img');
    for (var i = 0; i < photoCollection.length; i++) {
      if (currentPicture === photoCollection[i]) {
        showPhoto(i);
      }
    }
    closePhotoButton.addEventListener('click', closePhotoClickHandler);
    document.addEventListener('keydown', closePhotoKeydownHandler);
  }
};

usersPhotos.addEventListener('click', showPhotoClickHandler);
usersPhotos.addEventListener('keydown', showPhotoKeydownHandler);

// var activePhoto = showBigPhoto(bigPhotoTemplate);
// pageBody.classList.add('modal-open');
// fillPhotoInfo(activePhoto, elementsList[0]);
// MODULE4-TASK2

var imgUploadForm = document.querySelector('.img-upload__form');
var uploadButton = document.querySelector('#upload-file');
var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
var fileUploadCancel = imgUploadForm.querySelector('#upload-cancel');
var textHashtags = imgUploadForm.querySelector('.text__hashtags');
var textDescription = imgUploadForm.querySelector('.text__description');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');

var scaleValue = function (value) {
  document.querySelector('.scale__control--value').value = value;
};

var hideEffect = function () {
  effectLevel.classList.remove('hidden');
};

var uploadButtonHandler = function () {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  scaleValue(SCALE_CONTROL_DEFAULT);
  imageScale(SCALE_IMAGE_DEFAULT);
  hideEffect();
  removeEffect();
  fileUploadCancel.addEventListener('click', cancelButtonClickHandler);
  document.addEventListener('keydown', closeKeydownHandler);
};

var cancelButtonClickHandler = function () {
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  imgUploadForm.reset();
  fileUploadCancel.removeEventListener('click', cancelButtonClickHandler);
};

var closeKeydownHandler = function (evt) {
  if (evt.key === ESC_KEY && textHashtags !== document.activeElement && textDescription !== document.activeElement) {
    imgUploadForm.reset();
    cancelButtonClickHandler();
  }
};

uploadButton.addEventListener('change', uploadButtonHandler);

// изменяем глубину фильтра
var effectLevel = document.querySelector('.effect-level');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var lineWidth = effectLevelLine.offsetWidth;
  var startCoords = evt.clientX;

  var pinMouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;
    var pinCoordX = effectLevelPin.offsetLeft - shift;

    startCoords = moveEvt.clientX;

    if (!(pinCoordX < 0 || pinCoordX > lineWidth)) {
      var pinPoint = pinCoordX / effectLevelLine.offsetWidth;

      effectLevelPin.style.left = pinCoordX + 'px';
      effectLevelValue.value = Math.round(pinPoint * 100);
      effectLevelDepth.style.width = pinPoint * 100 + '%';
    }
  };
  var effectPinMouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', pinMouseMoveHandler);
    document.removeEventListener('mouseup', effectPinMouseUpHandler);
  };

  document.addEventListener('mousemove', pinMouseMoveHandler);
  document.addEventListener('mouseup', effectPinMouseUpHandler);
});

// Изменяем масштаб изображения
var scaleContainer = document.querySelector('.scale');
var buttonScaleSmaller = scaleContainer.querySelector('.scale__control--smaller');
var buttonScaleBigger = scaleContainer.querySelector('.scale__control--bigger');
var scaleControlValue = scaleContainer.querySelector('.scale__control--value');

// Функция масштабирования изображения
var imageScale = function (scaValue) {
  var newScale = scaValue / 100;
  imgUploadPreview.setAttribute('style', 'transform: scale(' + newScale + ');');
};

var getValue = function () {
  var value = parseInt(scaleControlValue.value.replace('%', ''), 10);

  return value;
};

var decreaseScaleValue = function () {
  var valueScale = getValue();
  if (valueScale > SCALE_MIN_VALUE) {
    valueScale = valueScale - SCALE_CHANGE_STEP;
  }

  return valueScale;
};

var increaseScaleValue = function () {
  var scValue = getValue();
  if (scValue < SCALE_MAX_VALUE) {
    scValue = scValue + SCALE_CHANGE_STEP;
  }

  return scValue;
};

var scaleSmallerClickHandler = function () {
  var newValue = decreaseScaleValue();
  imageScale(newValue);
  scaleControlValue.value = newValue + '%';
};

var scaleBiggerClickHandler = function () {
  var newValue = increaseScaleValue();
  imageScale(newValue);
  scaleControlValue.value = newValue + '%';
};

buttonScaleSmaller.addEventListener('click', scaleSmallerClickHandler);
buttonScaleBigger.addEventListener('click', scaleBiggerClickHandler);


// применение эффектов на изображение
var photoEffects = document.querySelectorAll('.effects__radio');


// погуглить про эту скомунизженную функцию
var removeEffect = function () {
  var classes = Array.from(imgUploadPreview.classList);
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].match('effects__preview--')) {
      imgUploadPreview.classList.remove(classes[i]);
    }
  }
};

var showEffectLevel = function () {
  if (effectLevel.classList.contains('hidden')) {
    effectLevel.classList.remove('hidden');
  }
};

var applyEffect = function (style) {
  removeEffect();
  showEffectLevel();
  imgUploadPreview.classList.add(style);
};

var effectClickHandler = function (evt) {
  var evtTarget = evt.target;

  switch (evtTarget.id) {
    case 'effect-none':
      removeEffect();
      hideEffect();
      effectLevel.classList.add('hidden');
      imgUploadPreview.classList.add('effects__preview--none');
      break;
    case 'effect-chrome':
      applyEffect('effects__preview--chrome');
      break;
    case 'effect-sepia':
      applyEffect('effects__preview--sepia');
      break;
    case 'effect-marvin':
      applyEffect('effects__preview--marvin');
      break;
    case 'effect-phobos':
      applyEffect('effects__preview--phobos');
      break;
    case 'effect-heat':
      applyEffect('effects__preview--heat');
      break;
  }
};

for (var i = 0; i < photoEffects.length; i++) {
  photoEffects[i].addEventListener('click', effectClickHandler);
}

// Валидация хештегов

var newHashtags = function (inputString) {
  var hashtags = inputString.split(' ');
  return hashtags;
};

var removeAdditionalSpaces = function (allHashtags) {
  var notEmptyHashtags = [];
  for (var j = 0; j < allHashtags.length; j++) {
    if (allHashtags[j] !== '') {
      notEmptyHashtags.push(allHashtags[j]);
    }
  }
  return notEmptyHashtags;
};

var pushMessageErr = function (message, errMessages) {
  if (errMessages.indexOf(message) === -1) {
    errMessages.push(message);
  }

  return errMessages;
};

var createValMess = function (notEmptyHashtags) {
  var valMessages = [];

  if (notEmptyHashtags.length > MAX_HASHTAGS_AMOUNT) {
    pushMessageErr('Хеш-тегов не должно быть больше ' + MAX_HASHTAGS_AMOUNT + ' .', valMessages);
  }

  for (var j = 0; j < notEmptyHashtags.length; j++) {
    var hashtag = notEmptyHashtags[j];
    if (!hashtag.startsWith('#')) {
      pushMessageErr('Хеш-тег должен начинаться с символа решетки (#).', valMessages);
    } else if (hashtag.length === 1) {
      pushMessageErr('Хеш-тег не может состоять из одного символа.', valMessages);
    } else if (hashtag.length > MAX_HASHTAG_CHARACTERS) {
      pushMessageErr('Хеш-тег не может состоять из более чем ' + MAX_HASHTAG_CHARACTERS + ' символов.', valMessages);
    } else if (!hashtag.match(HASHTAG_PATTERN)) {
      pushMessageErr('Хеш-тег должен состоять только из букв и цифр.', valMessages);
    } else if (notEmptyHashtags.indexOf(hashtag) !== notEmptyHashtags.lastIndexOf(hashtag)) {
      pushMessageErr('Хеш-теги не должны повторяться.', valMessages);
    }
  }

  return valMessages;
};

var hashtagsKeyupHandler = function () {
  var inputValue = textHashtags.value.toLowerCase();
  var dirtyHashtags = newHashtags(inputValue);
  var cleanHashtags = removeAdditionalSpaces(dirtyHashtags);
  var errors = createValMess(cleanHashtags);

  if (errors.length !== 0) {
    textHashtags.setCustomValidity(errors.join(' \n'));
  } else {
    textHashtags.setCustomValidity('');
  }
};

textHashtags.addEventListener('keyup', hashtagsKeyupHandler);

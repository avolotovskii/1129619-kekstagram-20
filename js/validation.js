'use strict';

(function () {
  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_HASHTAG_CHARACTERS = 20;
  var HASHTAG_PATTERN = /^([#]{1})([0-9a-zа-яё]{1,19})$/g;

  // var imgUploadForm = window.util.imgUploadForm;
  var textHashtags = window.photoCusomization.textHashtags;

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
})();

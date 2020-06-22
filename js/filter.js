'use strict';

(function () {
  var imgUploadOverlay = window.util.imgUploadOverlay;
  var effectLevel = window.filterSlider.effectLevel;
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
  var photoEffects = document.querySelectorAll('.effects__radio');

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

  // var hideEffectLevel = function () {
  //   effectLevel.classList.add('hidden');
  // };

  var hideEffect = function () {
    effectLevel.classList.remove('hidden');
  };

  var effectClickHandler = function (evt) {
    var evtTarget = evt.target;

    switch (evtTarget.id) {
      case 'effect-none':
        removeEffect();
        hideEffect();
        // hideEffectLevel();
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

  var createEffectsHandlers = function () {
    for (var i = 0; i < photoEffects.length; i++) {
      photoEffects[i].addEventListener('click', effectClickHandler);
    }
  };

  var removeEffectsHandlers = function () {
    for (var i = 0; i < photoEffects.length; i++) {
      photoEffects[i].removeEventListener('click', effectClickHandler);
    }
  };

  window.filter = {
    removeEffect: removeEffect,
    // hideEffectLevel: hideEffectLevel
    createEffectsHandlers: createEffectsHandlers,
    removeEffectsHandlers: removeEffectsHandlers
  };
})();

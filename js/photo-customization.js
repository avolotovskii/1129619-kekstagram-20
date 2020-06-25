'use strict';

(function () {
  var SCALE_CONTROL_DEFAULT = '100%';
  var SCALE_IMAGE_DEFAULT = 100;
  var ESC_KEY = 'Escape';

  var pageBody = document.querySelector('body');
  var imgUploadForm = window.util.imgUploadForm;
  var imgUploadOverlay = window.util.imgUploadOverlay;
  var scaleValue = window.scale.scaleValue;
  var imageScale = window.scale.imageScale;
  var removeEffect = window.filter.removeEffect;
  var hideEffectLevel = window.filter.hideEffectLevel;
  var effectLevel = window.filterSlider.effectLevel;

  var uploadButton = document.querySelector('#upload-file');
  var fileUploadCancel = imgUploadForm.querySelector('#upload-cancel');
  var textHashtags = imgUploadForm.querySelector('.text__hashtags');
  var textDescription = imgUploadForm.querySelector('.text__description');

  var hideEffect = function () {
    effectLevel.classList.remove('hidden');
  };

  var uploadButtonHandler = function () {
    imgUploadOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    scaleValue(SCALE_CONTROL_DEFAULT);
    imageScale(SCALE_IMAGE_DEFAULT);
    hideEffectLevel();
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

  window.photoCusomization = {
    textHashtags: textHashtags
  };
})();

'use strict';

(function () {
  var SCALE_CONTROL_DEFAULT_VALUE = '100%';
  var SCALE_IMAGE_DEFAULT_VALUE = 100;
  var ESC_KEY = 'Escape';

  var uploadForm = window.util.uploadForm;
  var imageEditor = window.util.imageEditor;
  var setScaleValue = window.scale.setScaleValue;
  var setImageScale = window.scale.setImageScale;
  var removeEffect = window.filter.removeEffect;
  var hideEffectLevel = window.filter.hideEffectLevel;
  var createEffectsHandlers = window.filter.createEffectsHandlers;
  var removeEffectsHandlers = window.filter.removeEffectsHandlers;
  var setDefaultDepthValue = window.filterSlider.setDefaultDepthValue;
  var errorHandler = window.error.sendErrorHandler;
  var successHandler = window.success.successHandler;

  var fileUploadButton = document.querySelector('#upload-file');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');
  var fileUploadCancel = uploadForm.querySelector('#upload-cancel');
  var descriptionInput = uploadForm.querySelector('.text__description');

  var uploadButtonChangeHandler = function () {
    imageEditor.classList.remove('hidden');
    document.body.classList.add('modal-open');
    setScaleValue(SCALE_CONTROL_DEFAULT_VALUE);
    setImageScale(SCALE_IMAGE_DEFAULT_VALUE);
    hideEffectLevel();
    removeEffect();
    setDefaultDepthValue();
    createEffectsHandlers();
    fileUploadCancel.addEventListener('click', cancelButtonClickHandler);
    document.addEventListener('keydown', closeKeydownHandler);
  };

  var closeImageEditor = function () {
    removeEffectsHandlers();
    uploadForm.reset();

    imageEditor.classList.add('hidden');
    document.body.classList.remove('modal-open');

    fileUploadCancel.removeEventListener('click', cancelButtonClickHandler);
    document.removeEventListener('keydown', closeKeydownHandler);
  };

  var cancelButtonClickHandler = function () {
    closeImageEditor();
  };

  var closeKeydownHandler = function (evt) {
    if (evt.key === ESC_KEY && hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement) {
      closeImageEditor();
    }
  };

  fileUploadButton.addEventListener('change', uploadButtonChangeHandler);

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(uploadForm), successHandler, errorHandler);
    evt.preventDefault();
    closeImageEditor();
  });
})();

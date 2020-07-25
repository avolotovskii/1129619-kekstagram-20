'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadForm = document.querySelector('.img-upload__form');
  var imageEditor = uploadForm.querySelector('.img-upload__overlay');
  var imageUploadPreview = imageEditor.querySelector('.img-upload__preview img');
  var uploadInput = document.querySelector('.img-upload__input');
  var effectsPreview = imageEditor.querySelectorAll('.effects__preview');

  var closeImageEditor = window.photoCustomization.closeImageEditor;
  var showErrorMessage = window.error.showErrorMessage;

  var uploadInputChangeHandler = function () {
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (!matches) {
      closeImageEditor();
      showErrorMessage('Недопустимый формат. Фотография должна быть в формате gif, jpg, jpeg или png!', 'Загрузить другую фотографию');
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      imageUploadPreview.src = reader.result;

      for (var i = 0; i < effectsPreview.length; i++) {
        effectsPreview[i].style = 'background-image: url("' + reader.result + '");';
      }
    });

    reader.readAsDataURL(file);
  };

  uploadInput.addEventListener('change', uploadInputChangeHandler);
})();

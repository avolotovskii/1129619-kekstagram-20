'use strict';

(function () {
  var errorHandler = window.error.show;
  var addUsersPhotos = window.gallery.addUsersPhotos;

  var imgFilters = document.querySelector('.img-filters');
  var elementsList = [];

  var createPhotoObject = function (element, index) {
    var photoObject = {
      url: element.url,
      description: element.description,
      likes: element.likes,
      comments: element.comments,
      id: index
    };

    return photoObject;
  };

  var pushElements = function (data) {
    var elements = data.map(function (item, index) {
      var newElement = createPhotoObject(item, index);
      return newElement;
    });

    return elements;
  };

  var loadSuccessHandler = function (data) {
    elementsList = pushElements(data);
    addUsersPhotos(elementsList);
    imgFilters.classList.remove('img-filters--inactive');

    window.data = {
      elementsList: elementsList,
    };
  };

  window.backend.load(loadSuccessHandler, errorHandler, 'Закрыть');
})();

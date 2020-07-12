'use strict';

(function () {
  var loadErrorHandler = window.error.loadErrorHandler;
  var addToFragment = window.gallery.addToFragment;

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
    var elements = [];
    for (var i = 0; i < data.length; i++) {
      var newElement = createPhotoObject(data[i], i);
      elements.push(newElement);
    }

    return elements;
  };

  var loadSuccessHandler = function (data) {
    elementsList = pushElements(data);
    addToFragment(elementsList);

    window.data = {
      elementsList: elementsList
    };
  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);
})();


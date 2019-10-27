'use strict';
(function () {
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SUCCESS_CODE = 200;
  var TIMEOUT_VALUE = 10000;
  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';
  var CONNECTION_ERROR_MESSAGE = 'Произошла ошибка соединения';

  var createNewRequest = function (method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, url);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(CONNECTION_ERROR_MESSAGE);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_VALUE;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var request = createNewRequest(METHOD_GET, LOAD_URL, onLoad, onError);
    request.send();
  };

  var save = function (data, onLoad, onError) {
    var request = createNewRequest(METHOD_POST, SAVE_URL, onLoad, onError);
    request.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();

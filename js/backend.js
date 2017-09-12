// Модуль для работы с сервером данных

'use strict';

(function () {
  var netData = {
    URL: 'https://1510.dump.academy/keksobooking',
    URL_ADDITION: '/data',
    OK_STATUS: 200,
    TIMEOUT: 10000,
    DATA_TYPE: 'json',
    ERROR_MAIN: 'Произошла ошибка: ',
    ERROR_CONNECTION: 'Произошла ошибка соединения',
    ERROR_TIMEOUT: 'Запрос не успел выполниться за '
  };

  // Функция, возвращающая созданный и обернутый в необходимые обработчики объект xhr
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = netData.DATA_TYPE;
    xhr.timeout = netData.TIMEOUT;

    // Вешаем обработчик ответа с сервера
    xhr.addEventListener('load', function () {
      if (xhr.status === netData.OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(netData.ERROR_MAIN + xhr.status + ' ' + xhr.statusText);
      }
    });

    // Вешаем обработчик ошибки соединения
    xhr.addEventListener('error', function () {
      onError(netData.ERROR_CONNECTION);
    });

    // Вешаем обработчик таймаута
    xhr.addEventListener('timeout', function () {
      onError(netData.ERROR_TIMEOUT + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    // Функция для загрузки данных с сервера
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', netData.URL + netData.URL_ADDITION);
      xhr.send();
    },

    // Функция для отправки данных на сервер
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', netData.URL);
      xhr.send(data);
    }
  };
})();

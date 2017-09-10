// Модуль для работы с сервером данных

'use strict';

(function () {
  var URL = 'https://1510.dump.academy/keksobooking';

  // Функция, возвращающая созданный и обернутый в необходимые обработчики объект xhr
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    // Вешаем обработчик ответа с сервера
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    // Вешаем обработчик ошибки соединения
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    // Вешаем обработчик таймаута
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    // Функция для загрузки данных с сервера
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    // Функция для отправки данных на сервер
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();

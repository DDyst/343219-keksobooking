// Вспомогательный модуль

'use strict';

(function () {
  // Объект со значениями кодов клавиш
  var keyCodes = {
    ESC: 27,
    ENTER: 13
  };

  // Объект с цветами рамок диалогового окна
  var popUpBorderColor = {
    error: '#ff6d51',
    success: '#40ff00'
  };

  // Функция для создания и стилизации поп-апа
  var createPopUp = function (text, borderColor) {
    var popUp = document.createElement('div');
    popUp.style.position = 'fixed';
    popUp.style.top = '50%';
    popUp.style.left = '50%';
    popUp.style.zIndex = 100;
    popUp.style.padding = '50px';
    popUp.style.background = '#ffffff';
    popUp.style.border = '4px solid ' + borderColor;
    popUp.style.borderRadius = '8px';
    popUp.style.transform = 'translate(-50%, -50%)';
    popUp.style.cursor = 'pointer';
    popUp.textContent = text;
    popUp.className = 'pop-up';
    return popUp;
  };

  // Функция для создания и стилизации оверлея
  var createOverlay = function () {
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.left = 0;
    overlay.style.zIndex = 90;
    overlay.style.background = 'rgba(0, 0, 0, 0.5)';
    overlay.className = 'overlay';
    return overlay;
  };

  // Функция отрисовки диалогового окна
  var renderDialog = function (message, borderColor) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createPopUp(message, borderColor));
    fragment.appendChild(createOverlay());
    document.body.appendChild(fragment);

    var dialog = document.querySelector('.pop-up');
    var overlay = document.querySelector('.overlay');

    var dialogClickHandler = function () {
      removeDialog(dialog, overlay);
      dialog.removeEventListener('click', dialogClickHandler);
      document.removeEventListener('keydown', keydownHandler);
    };

    var keydownHandler = function (evt) {
      if (window.util.isEscPressed(evt.keyCode)) {
        removeDialog(dialog, overlay);
        dialog.removeEventListener('click', dialogClickHandler);
        document.removeEventListener('keydown', keydownHandler);
      }
    };

    dialog.addEventListener('click', dialogClickHandler);
    document.addEventListener('keydown', keydownHandler);
  };

  // Функция удаления из DOM диалогового окна и оверлея
  var removeDialog = function (popup, overlay) {
    document.body.removeChild(popup);
    document.body.removeChild(overlay);
  };

  window.util = {
    // Функция, сравнивающая значение переданного кода клавиши с кодом Esc
    isEscPressed: function (code) {
      return code === keyCodes.ESC;
    },

    // Функция, сравнивающая значение переданного кода клавиши с кодом Enter
    isEnterPressed: function (code) {
      return code === keyCodes.ENTER;
    },

    // Функция нахождения случайного целого числа в заданном диапазоне включительно
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Функция, возвращающая индекс случайного элемента массива
    getRandomArrayItemIndex: function (array) {
      return this.getRandomInRange(0, array.length - 1);
    },

    // Функция, возвращающая случайный элемент массива
    getRandomArrayItem: function (array) {
      return array[this.getRandomInRange(0, array.length - 1)];
    },

    // Функция, удаляющая случайный элемент массива
    deleteRandomArrayItem: function (array) {
      array.splice(this.getRandomArrayItemIndex(array), 1);
    },

    // Функция, возвращающая массив случайной длины (но не менее 1) из случайных элементов переданного в неё массива
    getRandomArrayItems: function (array) {
      var copiedItems = array.slice();
      for (var i = 0; i < this.getRandomArrayItemIndex(array); i++) {
        this.deleteRandomArrayItem(copiedItems);
      }
      return copiedItems;
    },

    // Функция нахождения координаты левого верхнего угла метки по X, принимает координату острого конца и ширину метки
    getTopLeftXCoord: function (xCoord, pinWidth) {
      return xCoord - Math.floor(pinWidth / 2);
    },

    // Функция нахождения координаты левого верхнего угла метки по Y, принимает координату острого конца и высоту метки
    getTopLeftYCoord: function (yCoord, pinHeight) {
      return yCoord - pinHeight;
    },

    // Функция нахождения координаты острого конца любой метки по X, принимает координату левого верхнего угла и ширину метки
    getPinTipXCoord: function (xCoord, pinWidth) {
      return xCoord + Math.floor(pinWidth / 2);
    },

    // Функция нахождения координаты острого конца любой метки по Y, принимает координату левого верхнего угла и высоту метки
    getPinTipYCoord: function (yCoord, pinHeight) {
      return yCoord + pinHeight;
    },

    // Функция, выводящая окно с ошибкой при неудачной передаче данных
    errorHandler: function (errorMessage) {
      renderDialog(errorMessage, popUpBorderColor.error);
    },

    // Функция, выводящая окно с сообщением об успешной отправке данных
    uploadSuccessHandler: function () {
      renderDialog('Данные успешно отправлены', popUpBorderColor.success);
    }
  };
})();

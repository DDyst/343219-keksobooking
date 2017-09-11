// Модуль для определения нужных координат метки объявления

'use strict';

(function () {
  window.getCoords = {
    // Функция нахождения координаты левого верхнего угла метки по X, принимает координату острого конца и ширину метки
    getTopLeftXCoord: function (xCoord, pinWidth) {
      return xCoord - Math.floor(pinWidth / 2);
    },

    // Функция нахождения координаты левого верхнего угла метки по Y, принимает координату острого конца и высоту метки
    getTopLeftYCoord: function (yCoord, pinHeight) {
      return yCoord - pinHeight;
    },

    // Функция нахождения координаты острого конца метки по X, принимает координату левого верхнего угла и ширину метки
    getPinTipXCoord: function (xCoord, pinWidth) {
      return xCoord + Math.floor(pinWidth / 2);
    },

    // Функция нахождения координаты острого конца метки по Y, принимает координату левого верхнего угла и высоту метки
    getPinTipYCoord: function (yCoord, pinHeight) {
      return yCoord + pinHeight;
    }
  };
})();

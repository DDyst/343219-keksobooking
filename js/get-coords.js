// Модуль для работы с координатами меток объявлений

'use strict';

(function () {
  window.coords = {
    // Объект с размерами меток сгенерированных объявлений
    pinProportions: {
      WIDTH: 56,
      HEIGHT: 75
    },

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
    },

    // Функция для сравнения координат отрисованной на корте метки с координатами элемента массива данных
    compareCoords: function (pin, dataArrayItem) {
      return this.getPinTipXCoord(pin.offsetLeft, this.pinProportions.WIDTH) === dataArrayItem.location.x && this.getPinTipYCoord(pin.offsetTop, this.pinProportions.HEIGHT) === dataArrayItem.location.y;
    }
  };
})();

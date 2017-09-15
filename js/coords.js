// Модуль для работы с координатами меток объявлений

'use strict';

(function () {
  // Объект с размерами меток сгенерированных объявлений
  var pinProportions = {
    WIDTH: 56,
    HEIGHT: 75
  };

  window.coords = {
    // Функция нахождения координаты левого верхнего угла сгенерированной метки объявлений по X, принимает координату острого конца метки
    getTopLeftXCoord: function (xCoord) {
      return xCoord - Math.floor(pinProportions.WIDTH / 2);
    },

    // Функция нахождения координаты левого верхнего угла сгенерированной метки объявлений по Y, принимает координату острого конца метки
    getTopLeftYCoord: function (yCoord) {
      return yCoord - pinProportions.HEIGHT;
    },

    // Функция нахождения координаты острого конца любой метки по X, принимает координату левого верхнего угла и ширину метки
    getPinTipXCoord: function (xCoord, pinWidth) {
      return xCoord + Math.floor(pinWidth / 2);
    },

    // Функция нахождения координаты острого конца любой метки по Y, принимает координату левого верхнего угла и высоту метки
    getPinTipYCoord: function (yCoord, pinHeight) {
      return yCoord + pinHeight;
    },

    // Функция для сравнения координат отрисованной на корте метки с координатами элемента массива данных
    compareCoords: function (pin, dataArrayItem) {
      return this.getPinTipXCoord(pin.offsetLeft, pinProportions.WIDTH) === dataArrayItem.location.x && this.getPinTipYCoord(pin.offsetTop, pinProportions.HEIGHT) === dataArrayItem.location.y;
    }
  };
})();

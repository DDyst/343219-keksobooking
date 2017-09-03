/*
Основной модуль, взаимодействие с меткой размещаемого объявления

card.js - отрисовка панели объявления
pin.js - отрисовка меток объявлений и взаимодействие с ними
*/

'use strict';

(function () {
  // Объект с размерами главной метки
  var mainPinProportions = {
    WIDTH: 75,
    HEIGHT: 94
  };

  var map = document.querySelector('.tokyo__pin-map');
  var mainPin = map.querySelector('.pin__main');
  var addressInput = document.getElementById('address');

  // Функция, отрисовывающая новое положение метки во время перетаскивания
  var refreshPinPosition = function (xShift, yShift) {
    mainPin.style.top = (mainPin.offsetTop - yShift) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - xShift) + 'px';
  };

  // Функция нахождения координаты острого конца главной метки по X, принимает координату левого верхнего угла
  var getProperXCoord = function (xCoord) {
    return xCoord + Math.floor(mainPinProportions.WIDTH / 2);
  };

  // Функция нахождения координаты острого конца главной метки по Y, принимает координату левого верхнего угла
  var getProperYCoord = function (yCoord) {
    return yCoord + mainPinProportions.HEIGHT;
  };

  // Функция обновления значения в поле #address при перетаскивании метки
  var refreshAddress = function () {
    addressInput.value = 'x: ' + getProperXCoord(mainPin.offsetLeft) + ', y: ' + getProperYCoord(mainPin.offsetTop);
  };

  // Обработчик перетаскивания метки
  var pinMouseDownHandler = function (evt) {
    evt.preventDefault();
    var initialCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      var shift = {
        x: initialCoords.x - moveEvt.clientX,
        y: initialCoords.y - moveEvt.clientY
      };

      initialCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      refreshPinPosition(shift.x, shift.y);
      refreshAddress();
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  mainPin.addEventListener('mousedown', pinMouseDownHandler);
})();

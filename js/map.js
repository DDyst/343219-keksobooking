/*
Основной модуль, взаимодействие с меткой размещаемого объявления

card.js - отрисовка панели объявления
pin.js - отрисовка меток объявлений и взаимодействие с ними
*/

'use strict';

(function () {
  var map = document.querySelector('.tokyo');
  var mapFilters = map.querySelector('.tokyo__filters-container');
  var mainPin = map.querySelector('.pin__main');
  var addressInput = document.getElementById('address');

  // Объект с координатами границ перемещения метки при перетаскивании, из учета позиционирования через top и left
  var mapBordersCoordinates = {
    top: 0,
    right: map.offsetWidth,
    bottom: map.offsetHeight - mapFilters.offsetHeight,
    left: 0
  };

  // Функция проверяет, будет ли метка находиться в пределах допустимых границ по горизонтали после предполагаемого сдвига
  var isPinInHorizontalBorders = function (xShift) {
    return mainPin.offsetLeft - xShift >= mapBordersCoordinates.left && mainPin.offsetLeft - xShift <= mapBordersCoordinates.right - mainPin.offsetWidth;
  };

  // Функция проверяет, будет ли метка находиться в пределах допустимых границ по вертикали после предполагаемого сдвига
  var isPinInVerticalBorders = function (yShift) {
    return mainPin.offsetTop - yShift >= mapBordersCoordinates.top && mainPin.offsetTop - yShift <= mapBordersCoordinates.bottom - mainPin.offsetHeight;
  };

  // Функция возвращает координату ближайшей горизонтальной границы для метки, ушедшей при предполагаемом сдвиге за допустимые границы по горизонтали
  var getInnerHorizontalCoord = function (xShift) {
    return mainPin.offsetLeft - xShift < mapBordersCoordinates.left ? mapBordersCoordinates.left : mapBordersCoordinates.right - mainPin.offsetWidth;
  };

  // Функция возвращает координату ближайшей вертикальной границы для метки, ушедшей при предполагаемом сдвиге за допустимые границы по вертикали
  var getInnerVerticalCoord = function (yShift) {
    return mainPin.offsetTop - yShift < mapBordersCoordinates.top ? mapBordersCoordinates.top : mapBordersCoordinates.bottom - mainPin.offsetHeight;
  };

  // Функция, отрисовывающая новое положение метки во время перетаскивания
  var refreshPinPosition = function (xShift, yShift) {
    mainPin.style.top = (isPinInVerticalBorders(yShift) ? mainPin.offsetTop - yShift : getInnerVerticalCoord(yShift)) + 'px';
    mainPin.style.left = (isPinInHorizontalBorders(xShift) ? mainPin.offsetLeft - xShift : getInnerHorizontalCoord(xShift)) + 'px';
  };

  // Функция нахождения координаты острого конца главной метки по X, принимает координату левого верхнего угла
  var getProperXCoord = function (xCoord) {
    return xCoord + Math.floor(mainPin.offsetWidth / 2);
  };

  // Функция нахождения координаты острого конца главной метки по Y, принимает координату левого верхнего угла
  var getProperYCoord = function (yCoord) {
    return yCoord + mainPin.offsetHeight;
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

  refreshAddress();
  mainPin.addEventListener('mousedown', pinMouseDownHandler);
})();

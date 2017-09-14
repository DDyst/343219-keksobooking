/*
Основной модуль, взаимодействие с меткой размещаемого объявления

card.js - отрисовка панели объявления
pin.js - отрисовка меток объявлений и взаимодействие с ними
*/

'use strict';

(function () {
  var map = document.querySelector('.tokyo');
  var pinBoard = map.querySelector('.tokyo__pin-map');
  var filtersContainer = map.querySelector('.tokyo__filters-container');
  var dialogClose = map.querySelector('.dialog__close');
  var mainPin = map.querySelector('.pin__main');
  var addressInput = document.querySelector('#address');
  var typeFilter = document.querySelector('#housing_type');
  var priceFilter = document.querySelector('#housing_price');
  var roomsFilter = document.querySelector('#housing_room-number');
  var guestsFilter = document.querySelector('#housing_guests-number');
  var featuresFilter = document.querySelector('#housing_features');

  // Объект с координатами границ перемещения метки при перетаскивании, из учета позиционирования через top и left
  var mapBordersCoordinates = {
    top: document.querySelector('.header').offsetHeight,
    right: map.offsetWidth,
    bottom: map.offsetHeight - filtersContainer.offsetHeight,
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

  // Функция обновления значения в поле #address при перетаскивании метки
  var refreshAddress = function () {
    addressInput.value = 'x: ' + window.coords.getPinTipXCoord(mainPin.offsetLeft, mainPin.offsetWidth) + ', y: ' + window.coords.getPinTipYCoord(mainPin.offsetTop, mainPin.offsetHeight);
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

  // Коллбэк, выполняющийся в случае успешной загрузки данных с сервера
  var downloadSuccessHandler = function (data) {
    var pinBoardClickHandler = function (evt) {
      window.showCard(evt.target, window.pin.activate, data);
    };

    var pinBoardKeyDownHandler = function (evt) {
      if (window.util.isEnterPressed(evt.keyCode)) {
        window.showCard(evt.target, window.pin.activate, data);
      }
    };

    var filterChangeHandler = function () {
      window.debounce(window.pin.update(window.getFiltratedAdvertisements(data)));
    };

    window.pin.renderRandom(data);

    pinBoard.addEventListener('click', pinBoardClickHandler);
    pinBoard.addEventListener('keydown', pinBoardKeyDownHandler);
    typeFilter.addEventListener('change', filterChangeHandler);
    priceFilter.addEventListener('change', filterChangeHandler);
    roomsFilter.addEventListener('change', filterChangeHandler);
    guestsFilter.addEventListener('change', filterChangeHandler);
    featuresFilter.addEventListener('change', filterChangeHandler, true);
  };

  refreshAddress();

  window.backend.load(downloadSuccessHandler, window.popUp.errorHandler);

  // Вешаем обработчики
  mainPin.addEventListener('mousedown', pinMouseDownHandler);
  dialogClose.addEventListener('click', window.card.dialogCloseClickHandler);
  dialogClose.addEventListener('keydown', window.card.dialogCloseKeyDownHandler);
  document.addEventListener('keydown', window.card.keyDownHandler);

  // Функция установки главной метки в первоначальное положение
  window.setInitialAddress = function () {
    mainPin.style.top = '';
    mainPin.style.left = '';
    refreshAddress();
  };
})();

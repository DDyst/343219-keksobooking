// Модуль для отрисовки и взаимодействия с метками объявлений на карте

'use strict';

(function () {
  var TABINDEX_SOURCE_ORDER_VALUE = 0;
  var map = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var dialogBlock = document.querySelector('#offer-dialog');
  var dialogClose = dialogBlock.querySelector('.dialog__close');
  var activePin = false;

  // Функция отрисовки объявления на карте
  var renderAdvertisement = function (advertisement) {
    var advertisementElement = document.createElement('div');
    advertisementElement.className = 'pin';
    advertisementElement.style.left = window.util.getTopLeftXCoord(advertisement.location.x, window.data.pinProportions.WIDTH) + 'px';
    advertisementElement.style.top = window.util.getTopLeftYCoord(advertisement.location.y, window.data.pinProportions.HEIGHT) + 'px';
    advertisementElement.tabIndex = TABINDEX_SOURCE_ORDER_VALUE;
    advertisementElement.innerHTML = '<img src="' + advertisement.author.avatar + '" class="rounded" width="40" height="40">';
    return advertisementElement;
  };

  // Функция, снимающая выделение с метки объявления
  var deactivatePin = function () {
    activePin.classList.remove('pin--active');
    activePin = false;
  };

  // Функция, переключающая активную метку объявления, при условии, что выбранная метка уже не является активной
  var switchPin = function (pinElement) {
    if (!activePin || activePin !== pinElement) {
      if (activePin) {
        activePin.classList.remove('pin--active');
      } else {
        dialogBlock.classList.remove('hidden');
      }
      pinElement.classList.add('pin--active');
      activePin = pinElement;
    }
  };

  // Обработчики событий
  var mapClickHandler = function (evt) {
    window.showCard(evt.target, switchPin);
  };

  var mapKeyDownHandler = function (evt) {
    if (window.util.isEnterPressed(evt.keyCode)) {
      window.showCard(evt.target, switchPin);
    }
  };

  var dialogCloseClickHandler = function () {
    window.card.closePanel();
    deactivatePin();
  };

  var dialogCloseKeyDownHandler = function (evt) {
    if (window.util.isEnterPressed(evt.keyCode)) {
      window.card.closePanel();
      deactivatePin();
    }
  };

  var keyDownHandler = function (evt) {
    if (window.util.isEscPressed(evt.keyCode) && !dialogBlock.classList.contains('hidden')) {
      window.card.closePanel();
      deactivatePin();
    }
  };

  // Коллбэк, выполняющийся в случае успешной загрузки данных с сервера
  var successHandler = function (data) {
    data.forEach(function (item) {
      fragment.appendChild(renderAdvertisement(item));
    });
    map.appendChild(fragment);
    window.downloadedAdvertisements = data;
  };

  window.backend.load(successHandler, window.util.errorHandler);

  // Вешаем обработчики на метки объявлений и диалоговую панель
  map.addEventListener('click', mapClickHandler);
  map.addEventListener('keydown', mapKeyDownHandler);
  dialogClose.addEventListener('click', dialogCloseClickHandler);
  dialogClose.addEventListener('keydown', dialogCloseKeyDownHandler);
  document.addEventListener('keydown', keyDownHandler);
})();

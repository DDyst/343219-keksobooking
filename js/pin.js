// Модуль для отрисовки и взаимодействия с метками объявлений на карте

'use strict';

(function () {
  var TABINDEX_SOURCE_ORDER_VALUE = 0;
  // var ANY_VALUE = 'any';

  var map = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var dialogBlock = document.querySelector('#offer-dialog');
  var activePin = false;
  // var typeFilter = document.querySelector('#housing_type');
  // var priceFilter = document.querySelector('#housing_price');
  // var roomsFilter = document.querySelector('#housing_room-number');
  // var guestsFilter = document.querySelector('#housing_guests-number');
  // var wifiFilter = document.querySelector('#housing_features input[value="wifi"]');
  // var dishwasherFilter = document.querySelector('#housing_features input[value="dishwasher"]');
  // var parkingFilter = document.querySelector('#housing_features input[value="parking"]');
  // var washerFilter = document.querySelector('#housing_features input[value="washer"]');
  // var elevatorFilter = document.querySelector('#housing_features input[value="elevator"]');
  // var conditionerFilter = document.querySelector('#housing_features input[value="conditioner"]');

  // Функция для создания и стилизации элемента объявления
  var createAdvertisement = function (advertisement) {
    var advertisementElement = document.createElement('div');
    advertisementElement.className = 'pin';
    advertisementElement.style.left = window.coords.getTopLeftXCoord(advertisement.location.x) + 'px';
    advertisementElement.style.top = window.coords.getTopLeftYCoord(advertisement.location.y) + 'px';
    advertisementElement.tabIndex = TABINDEX_SOURCE_ORDER_VALUE;
    advertisementElement.innerHTML = '<img src="' + advertisement.author.avatar + '" class="rounded" width="40" height="40">';
    return advertisementElement;
  };

  // Функция отрисовки меток объявлений на карте
  var renderPins = function (advertisements) {
    advertisements.forEach(function (item) {
      fragment.appendChild(createAdvertisement(item));
    });
    map.appendChild(fragment);
  };

  // Коллбэк, выполняющийся в случае успешной загрузки данных с сервера
  var downloadSuccessHandler = function (data) {
    renderPins(data);
    window.pin.downloadedAdvertisements = data;
  };

  // var updatePins = function (advertisements) {
  //   var pins = map.querySelectorAll('.pin:not(.pin__main)');
  //   [].forEach.call(pins, function (item) {
  //     map.removeChild(item);
  //   });
  //   renderPins(advertisements);
  // };

  // var filtrateType = function (advertisement) {
  //   return (typeFilter.value === advertisement.offer.type) || (typeFilter.value === ANY_VALUE);
  // };

  // var filtrateAdvertisements = function () {
  //   return window.pin.downloadedAdvertisements.filter(filtrateType);
  // };

  // var typeChangeHandler = function () {
  //   updatePins(filtrateAdvertisements());
  // };

  // typeFilter.addEventListener('change', typeChangeHandler);

  window.backend.load(downloadSuccessHandler, window.popUp.errorHandler);

  window.pin = {
    // Функция, снимающая выделение с метки объявления
    deactivatePin: function () {
      activePin.classList.remove('pin--active');
      activePin = false;
    },

    // Функция, переключающая активную метку объявления, при условии, что выбранная метка уже не является активной
    activatePin: function (pinElement) {
      if (!activePin || activePin !== pinElement) {
        if (activePin) {
          activePin.classList.remove('pin--active');
        } else {
          dialogBlock.classList.remove('hidden');
        }
        pinElement.classList.add('pin--active');
        activePin = pinElement;
      }
    }
  };
})();

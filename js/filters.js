// Модуль для фильтрации отрисованных на карте объявлений

'use strict';

(function () {
  var ANY_VALUE = 'any';

  // Объект с данными о значениях поля #housing_price
  var pricesData = {
    low: {
      NUMBER: 10000,
      VALUE: 'low'
    },
    high: {
      NUMBER: 50000,
      VALUE: 'high'
    }
  };

  var typeFilter = document.querySelector('#housing_type');
  var priceFilter = document.querySelector('#housing_price');
  var roomsFilter = document.querySelector('#housing_room-number');
  var guestsFilter = document.querySelector('#housing_guests-number');
  var featuresFilter = document.querySelector('#housing_features');

  var filtrateFunctions = [
    // Функция для фильтрации объявлений по типу
    function (advertisement) {
      return (typeFilter.value === advertisement.offer.type) || (typeFilter.value === ANY_VALUE);
    },

    // Функция для фильтрации объявлений по цене
    function (advertisement) {
      switch (priceFilter.value) {
        case pricesData.low.VALUE:
          return advertisement.offer.price < pricesData.low.NUMBER;
        case pricesData.high.VALUE:
          return advertisement.offer.price > pricesData.high.NUMBER;
        case ANY_VALUE:
          return true;
        default:
          return advertisement.offer.price >= pricesData.low.NUMBER && advertisement.offer.price <= pricesData.high.NUMBER;
      }
    },

    // Функция для фильтрации объявлений по количеству комнат
    function (advertisement) {
      return (roomsFilter.value === advertisement.offer.rooms.toString()) || (roomsFilter.value === ANY_VALUE);
    },

    // Функция для фильтрации объявлений по числу гостей
    function (advertisement) {
      return (guestsFilter.value === advertisement.offer.guests.toString()) || (guestsFilter.value === ANY_VALUE);
    },

    // Функция для фильтрации объявлений по доступным удобствам
    function (advertisement) {
      var checkedElements = featuresFilter.querySelectorAll('input[type="checkbox"]:checked');
      var selectedFeatures = [].map.call(checkedElements, function (item) {
        return item.value;
      });
      return selectedFeatures.every(function (currentFeature) {
        return advertisement.offer.features.includes(currentFeature);
      });
    }
  ];

  // Функция фильтрации исходного массива объявлений
  var getFiltratedAdvertisements = function (advertisements) {
    return advertisements.filter(function (advertisement) {
      return filtrateFunctions.every(function (currentFunction) {
        return currentFunction(advertisement);
      });
    });
  };

  // Функция активации фильтров, принимает на вход исходный массив объявлений
  window.activateFilters = function (advertisements) {
    var redrawPins = function () {
      window.pin.update(getFiltratedAdvertisements(advertisements));
    };

    var filterChangeHandler = function () {
      window.debounce(redrawPins);
    };

    typeFilter.addEventListener('change', filterChangeHandler);
    priceFilter.addEventListener('change', filterChangeHandler);
    roomsFilter.addEventListener('change', filterChangeHandler);
    guestsFilter.addEventListener('change', filterChangeHandler);
    featuresFilter.addEventListener('change', filterChangeHandler, true);
  };
})();

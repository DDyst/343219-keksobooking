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

  // Функция для фильтрации объявлений по типу
  var filtrateType = function (advertisement) {
    return (typeFilter.value === advertisement.offer.type) || (typeFilter.value === ANY_VALUE);
  };

  // Функция для фильтрации объявлений по цене
  var filtratePrice = function (advertisement) {
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
  };

  // Функция для фильтрации объявлений по количеству комнат
  var filtrateRooms = function (advertisement) {
    return (roomsFilter.value === advertisement.offer.rooms.toString()) || (roomsFilter.value === ANY_VALUE);
  };

  // Функция для фильтрации объявлений по числу гостей
  var filtrateGuests = function (advertisement) {
    return (guestsFilter.value === advertisement.offer.guests.toString()) || (guestsFilter.value === ANY_VALUE);
  };

  // Функция для фильтрации объявлений по доступным удобствам
  var filtrateFeatures = function (advertisement) {
    var checkedElements = featuresFilter.querySelectorAll('input[type="checkbox"]:checked');
    var selectedFeatures = [].map.call(checkedElements, function (item) {
      return item.value;
    });
    if (selectedFeatures) {
      var result = selectedFeatures.reduce(function (acc, item) {
        return acc * advertisement.offer.features.includes(item);
      }, true);
      return result;
    }
    return true;
  };

  // Функция фильтрации исходного массива объявлений
  window.getFiltratedAdvertisements = function (advertisements) {
    return advertisements.filter(filtrateType).filter(filtratePrice).filter(filtrateRooms).filter(filtrateGuests).filter(filtrateFeatures);
  };
})();

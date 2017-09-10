// Модуль генерации данных для объявлений

'use strict';

(function () {
  // Объект с настройками массива объявлений
  var advertisementsData = {
    QUANTITY: 8,
    TITLES: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    TYPES: ['flat', 'house', 'bungalo'],
    CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    X_RANGE_FROM: 300,
    X_RANGE_TO: 900,
    Y_RANGE_FROM: 100,
    Y_RANGE_TO: 500,
    PRICE_RANGE_FROM: 1000,
    PRICE_RANGE_TO: 1000000,
    ROOMS_RANGE_FROM: 1,
    ROOMS_RANGE_TO: 5,
    GUESTS_RANGE_FROM: 1,
    GUESTS_RANGE_TO: 15
  };

  // Фукнция, генерирующая массив объектов на основе значений из переданного в неё объекта
  var generateAdvertisements = function (data) {
    var generatedAdvertisements = [];
    for (var i = 0; i < data.QUANTITY; i++) {
      var x = window.util.getRandomInRange(data.X_RANGE_FROM, data.X_RANGE_TO);
      var y = window.util.getRandomInRange(data.Y_RANGE_FROM, data.Y_RANGE_TO);
      generatedAdvertisements[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: data.TITLES[i],
          address: x + ', ' + y,
          price: window.util.getRandomInRange(data.PRICE_RANGE_FROM, data.PRICE_RANGE_TO),
          type: window.util.getRandomArrayItem(data.TYPES),
          rooms: window.util.getRandomInRange(data.ROOMS_RANGE_FROM, data.ROOMS_RANGE_TO),
          guests: window.util.getRandomInRange(data.GUESTS_RANGE_FROM, data.GUESTS_RANGE_TO),
          checkin: window.util.getRandomArrayItem(data.CHECKIN_TIMES),
          checkout: window.util.getRandomArrayItem(data.CHECKIN_TIMES),
          features: window.util.getRandomArrayItems(data.FEATURES),
          description: '',
          photos: []
        },
        location: {
          x: x,
          y: y
        }
      };
    }
    return generatedAdvertisements;
  };

  window.data = {
    // Объект с размерами меток сгенерированных объявлений
    pinProportions: {
      WIDTH: 56,
      HEIGHT: 75
    },

    // Массив сгенерированных объявлений
    advertisements: generateAdvertisements(advertisementsData)
  };
})();

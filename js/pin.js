// Модуль для отрисовки и взаимодействия с метками объявлений на карте

'use strict';

(function () {
  var TABINDEX_SOURCE_ORDER_VALUE = 0;
  var RANDOM_PINS_NUMBER = 3;

  var map = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var dialogBlock = document.querySelector('#offer-dialog');
  var activePin = false;

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

  window.pin = {
    // Функция, снимающая выделение с метки объявления
    deactivate: function () {
      activePin.classList.remove('pin--active');
      activePin = false;
    },

    // Функция, переключающая активную метку объявления, при условии, что выбранная метка уже не является активной
    activate: function (pinElement) {
      if (!activePin || activePin !== pinElement) {
        if (activePin) {
          activePin.classList.remove('pin--active');
        } else {
          dialogBlock.classList.remove('hidden');
        }
        pinElement.classList.add('pin--active');
        activePin = pinElement;
      }
    },

    // Функция изначальной отрисовки заданного количества случайных меток объявлений на карте
    renderRandom: function (advertisements) {
      var randomAdvertisements = window.util.getNewArray(advertisements, RANDOM_PINS_NUMBER);
      for (var i = 0; i < randomAdvertisements.length; i++) {
        fragment.appendChild(createAdvertisement(randomAdvertisements[i]));
      }
      map.appendChild(fragment);
    },

    // Функция отрисовки всех меток объявлений на карте
    renderAll: function (advertisements) {
      advertisements.forEach(function (item) {
        fragment.appendChild(createAdvertisement(item));
      });
      map.appendChild(fragment);
    },

    // Функция обновления отрисованных меток
    update: function (advertisements) {
      var pins = map.querySelectorAll('.pin:not(.pin__main)');
      [].forEach.call(pins, function (item) {
        map.removeChild(item);
      });
      this.renderAll(advertisements);
    }
  };
})();

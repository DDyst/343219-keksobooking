// Модуль для отрисовки меток объявлений на карте

'use strict';

(function () {
  var TABINDEX_SOURCE_ORDER_VALUE = 0;
  var map = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  // Функция отрисовки объявления на карте
  var renderAdvertisement = function (advertisement) {
    var advertisementElement = document.createElement('div');
    advertisementElement.className = 'pin';
    advertisementElement.style.left = window.data.getProperXCoord(advertisement.location.x) + 'px';
    advertisementElement.style.top = window.data.getProperYCoord(advertisement.location.y) + 'px';
    advertisementElement.tabIndex = TABINDEX_SOURCE_ORDER_VALUE;
    advertisementElement.innerHTML = '<img src="' + advertisement.author.avatar + '" class="rounded" width="40" height="40">';
    return advertisementElement;
  };

  // Отрисовываем все объявления из сгенерированного массива
  window.data.advertisements.forEach(function (item) {
    fragment.appendChild(renderAdvertisement(item));
  });
  map.appendChild(fragment);
})();

// Модуль для отрисовки панели элемента

'use strict';

(function () {
  // Объект с соотношением типа апартаментов и соответствующей ему строки
  var lodgeTypesRelations = {
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var fragment = document.createDocumentFragment();
  var panelTemplate = document.querySelector('#lodge-template').content;
  var dialogBlock = document.querySelector('#offer-dialog');

  // Функция, переводящая тип апартаментов в удобочитаемый вид
  var getProperLodgeType = function (type) {
    return lodgeTypesRelations[type.toUpperCase()];
  };

  // Функция для преобразования строк из массива в пустые спаны с соответствующим классом
  var parseFeatures = function (array) {
    array.forEach(function (item) {
      var featureElement = document.createElement('span');
      featureElement.className = 'feature__image feature__image--' + item;
      fragment.appendChild(featureElement);
    });
    return fragment;
  };

  // Функция закрытия диалоговой панели объявления
  var closePanel = function () {
    dialogBlock.classList.add('hidden');
  };

  dialogBlock.classList.add('hidden');

  window.card = {
    // Функция отрисовки диалоговой панели объявления
    renderDialogPanel: function (advertisementItem) {
      var panelElement = panelTemplate.querySelector('.dialog__panel').cloneNode(true);
      panelElement.querySelector('.lodge__title').textContent = advertisementItem.offer.title;
      panelElement.querySelector('.lodge__address').textContent = advertisementItem.offer.address;
      panelElement.querySelector('.lodge__price').innerHTML = advertisementItem.offer.price + '&#x20bd;/ночь';
      panelElement.querySelector('.lodge__type').textContent = getProperLodgeType(advertisementItem.offer.type);
      panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advertisementItem.offer.guests + ' гостей в ' + advertisementItem.offer.rooms + ' комнатах';
      panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advertisementItem.offer.checkin + ', выезд до ' + advertisementItem.offer.checkout;
      panelElement.querySelector('.lodge__features').appendChild(parseFeatures(advertisementItem.offer.features));
      panelElement.querySelector('.lodge__description').textContent = advertisementItem.offer.description;
      dialogBlock.replaceChild(panelElement, dialogBlock.querySelector('.dialog__panel'));
      dialogBlock.querySelector('.dialog__title img').src = advertisementItem.author.avatar;
    },

    // Функция, определяющая соответствие между меткой объявления и элементом массива, и отрисовывающая соответствующую диалоговую панель
    renderProperPanel: function (pinElement) {
      for (var i = 0; i < window.pin.downloadedAdvertisements.length; i++) {
        if (window.coords.compareCoords(pinElement, window.pin.downloadedAdvertisements[i])) {
          this.renderDialogPanel(window.pin.downloadedAdvertisements[i]);
          break;
        }
      }
    },

    // Обработчики событий
    dialogCloseClickHandler: function () {
      closePanel();
      window.pin.deactivatePin();
    },

    dialogCloseKeyDownHandler: function (evt) {
      if (window.util.isEnterPressed(evt.keyCode)) {
        closePanel();
        window.pin.deactivatePin();
      }
    },

    keyDownHandler: function (evt) {
      if (window.util.isEscPressed(evt.keyCode) && !dialogBlock.classList.contains('hidden')) {
        closePanel();
        window.pin.deactivatePin();
      }
    }
  };
})();

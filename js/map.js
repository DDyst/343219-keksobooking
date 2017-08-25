// Файл для работы с объявлениями на карте

'use strict';

var KEYCODES = {
  esc: 27,
  enter: 13
};

var TABINDEX_SOURCE_ORDER_VALUE = 0;

// Объект с настройками массива объявлений
var ADVERTISEMENTS_DATA = {
  quantity: 8,
  elementWidth: 56,
  elementHeight: 75,
  titles: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  types: ['flat', 'house', 'bungalo'],
  checkinTimes: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  xRangeFrom: 300,
  xRangeTo: 900,
  yRangeFrom: 100,
  yRangeTo: 500,
  priceRangeFrom: 1000,
  priceRangeTo: 1000000,
  roomsRangeFrom: 1,
  roomsRangeTo: 5,
  guestsRangeFrom: 1,
  guestsRangeTo: 15
};

// Объект с соотношением типа апартаментов и соответствующей ему строки
var LODGE_TYPES_RELATIONS = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var panelTemplate = document.getElementById('lodge-template').content;
var map = document.querySelector('.tokyo__pin-map');
var dialogBlock = document.getElementById('offer-dialog');
var dialogClose = dialogBlock.querySelector('.dialog__close');

// Функция сравнения переданного кода с кодом нажатой клавиши
var compareKeyCodes = function (event, code) {
  if (event.keyCode === code) {
    return true;
  }
  return false;
};

// Функция нахождения случайного целого числа в заданном диапазоне включительно
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция нахождения координаты левого верхнего угла по X, принимает координату острого конца метки
var getProperXCoord = function (xCoord) {
  return xCoord - ADVERTISEMENTS_DATA.elementWidth / 2;
};

// Функция нахождения координаты левого верхнего угла по Y, принимает координату острого конца метки
var getProperYCoord = function (yCoord) {
  return yCoord - ADVERTISEMENTS_DATA.elementHeight;
};

// Функция, возвращающая индекс случайного элемента массива
var getRandomArrayItemIndex = function (array) {
  return getRandomInRange(0, array.length - 1);
};

// Функция, возвращающая случайный элемент массива
var getRandomArrayItem = function (array) {
  return array[getRandomInRange(0, array.length - 1)];
};

// Функция, удаляющая случайный элемент массива
var deleteRandomArrayItem = function (array) {
  array.splice(getRandomArrayItemIndex(array), 1);
};

// Функция, возвращающая массив случайной длины (но не менее 1) из случайных элементов переданного в неё массива
var getRandomArrayItems = function (array) {
  var copiedItems = array.slice();
  for (var i = 0; i < getRandomArrayItemIndex(array); i++) {
    deleteRandomArrayItem(copiedItems);
  }
  return copiedItems;
};

// Фукнция, генерирующая массив объектов на основе значений из переданного в неё объекта
var generateAdvertisements = function (data) {
  var generatedAdvertisements = [];
  for (var i = 0; i < data.quantity; i++) {
    var x = getRandomInRange(data.xRangeFrom, data.xRangeTo);
    var y = getRandomInRange(data.yRangeFrom, data.yRangeTo);
    generatedAdvertisements[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: data.titles[i],
        address: x + ', ' + y,
        price: getRandomInRange(data.priceRangeFrom, data.priceRangeTo),
        type: getRandomArrayItem(data.types),
        rooms: getRandomInRange(data.roomsRangeFrom, data.roomsRangeTo),
        guests: getRandomInRange(data.guestsRangeFrom, data.guestsRangeTo),
        checkin: getRandomArrayItem(data.checkinTimes),
        checkout: getRandomArrayItem(data.checkinTimes),
        features: getRandomArrayItems(data.features),
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

// Функция отрисовки объявления на карте
var renderAdvertisement = function (advertisement) {
  var advertisementElement = document.createElement('div');
  advertisementElement.className = 'pin';
  advertisementElement.style.left = getProperXCoord(advertisement.location.x) + 'px';
  advertisementElement.style.top = getProperYCoord(advertisement.location.y) + 'px';
  advertisementElement.tabIndex = TABINDEX_SOURCE_ORDER_VALUE;
  advertisementElement.innerHTML = '<img src="' + advertisement.author.avatar + '" class="rounded" width="40" height="40">';
  return advertisementElement;
};

// Функция, переводящая тип апартаментов в удобочитаемый вид
var getProperLodgeType = function (type) {
  return LODGE_TYPES_RELATIONS[type];
};

// Функция для преобразования строк из массива в пустые спаны с соответствующим классом
var parseFeatures = function (arr) {
  arr.forEach(function (item) {
    var featureElement = document.createElement('span');
    featureElement.className = 'feature__image feature__image--' + item;
    fragment.appendChild(featureElement);
  });
  return fragment;
};

// Функция отрисовки диалоговой панели объявления
var renderDialogPanel = function (obj) {
  var panelElement = panelTemplate.querySelector('.dialog__panel').cloneNode(true);
  panelElement.querySelector('.lodge__title').textContent = obj.offer.title;
  panelElement.querySelector('.lodge__address').textContent = obj.offer.address;
  panelElement.querySelector('.lodge__price').innerHTML = obj.offer.price + '&#x20bd;/ночь';
  panelElement.querySelector('.lodge__type').textContent = getProperLodgeType(obj.offer.type);
  panelElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + obj.offer.guests + ' гостей в ' + obj.offer.rooms + ' комнатах';
  panelElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  panelElement.querySelector('.lodge__features').appendChild(parseFeatures(obj.offer.features));
  panelElement.querySelector('.lodge__description').textContent = obj.offer.description;
  dialogBlock.replaceChild(panelElement, dialogBlock.querySelector('.dialog__panel'));
  dialogBlock.querySelector('.dialog__title img').src = obj.author.avatar;
};

// Функция закрытия диалоговой панели объявления
var closePanel = function () {
  dialogBlock.classList.add('hidden');
  map.querySelector('.pin--active').classList.remove('pin--active');
};

// Функция, подсвечивающая активируемую метку объявления и открывающая соответствующую ей диалоговую панель
var activatePin = function (targetElement) {
  var target = targetElement;
  while (target !== map) {
    if (target.classList.contains('pin') && !target.classList.contains('pin__main')) {
      if (map.querySelector('.pin--active')) {
        if (map.querySelector('.pin--active') === target) {
          return;
        }
        map.querySelector('.pin--active').classList.remove('pin--active');
      }
      target.classList.add('pin--active');
      var elementIndex;
      advertisements.forEach(function (item, index) {
        if (target.firstChild.getAttribute('src') === item.author.avatar) {
          elementIndex = index;
        }
      });
      renderDialogPanel(advertisements[elementIndex]);
      if (dialogBlock.classList.contains('hidden')) {
        dialogBlock.classList.remove('hidden');
      }
      return;
    }
    target = target.parentNode;
  }
};

var advertisements = generateAdvertisements(ADVERTISEMENTS_DATA);

// Отрисовываем все объявления из массива
var fragment = document.createDocumentFragment();
advertisements.forEach(function (item) {
  fragment.appendChild(renderAdvertisement(item));
});
map.appendChild(fragment);

renderDialogPanel(advertisements[0]);

map.addEventListener('click', function (event) {
  activatePin(event.target);
});

map.addEventListener('keydown', function (event) {
  if (compareKeyCodes(event, KEYCODES.enter)) {
    activatePin(event.target);
  }
});

dialogClose.addEventListener('click', function () {
  closePanel();
});

dialogClose.addEventListener('keydown', function (event) {
  if (compareKeyCodes(event, KEYCODES.enter)) {
    closePanel();
  }
});

document.addEventListener('keydown', function (event) {
  if (compareKeyCodes(event, KEYCODES.esc) && !dialogBlock.classList.contains('hidden')) {
    closePanel();
  }
});

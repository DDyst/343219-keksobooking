// Файл для работы с объявлениями на карте

'use strict';

var TABINDEX_SOURCE_ORDER_VALUE = 0;

// Объект со значениями кодов клавиш
var keyCodes = {
  ESC: 27,
  ENTER: 13
};

// Объект с настройками массива объявлений
var advertisementsData = {
  QUANTITY: 8,
  ELEMENT_WIDTH: 56,
  ELEMENT_HEIGHT: 75,
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

// Объект с соотношением типа апартаментов и соответствующей ему строки
var lodgeTypesRelations = {
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

// Объект со значениями атрибутов полей формы
var formFieldsData = {
  TITLE_MIN_LENGTH: 30,
  TITLE_MAX_LENGTH: 100,
  PRICE_MIN_VALUE: 0,
  PRICE_MAX_VALUE: 1000000,
  PRICE_INITIAL_VALUE: '1000'
};

// Объект с соотношением типа апартаментов и минимальной цены при размещении объявления
var typeToPriceRatio = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

// Объект со значениями атрибута value для опций выпадающих списков, соответствующих апартаментам, не предназначенным для гостей
var nonGuestsValue = {
  ROOMS: '100',
  CAPACITY: '0'
};

// Функция, сравнивающая значение переданного кода клавиши с кодом Esc
var isEscPressed = function (code) {
  return code === keyCodes.ESC;
};

// Функция, сравнивающая значение переданного кода клавиши с кодом Enter
var isEnterPressed = function (code) {
  return code === keyCodes.ENTER;
};

// Функция нахождения случайного целого числа в заданном диапазоне включительно
var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция нахождения координаты левого верхнего угла по X, принимает координату острого конца метки
var getProperXCoord = function (xCoord) {
  return xCoord - advertisementsData.ELEMENT_WIDTH / 2;
};

// Функция нахождения координаты левого верхнего угла по Y, принимает координату острого конца метки
var getProperYCoord = function (yCoord) {
  return yCoord - advertisementsData.ELEMENT_HEIGHT;
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
  for (var i = 0; i < data.QUANTITY; i++) {
    var x = getRandomInRange(data.X_RANGE_FROM, data.X_RANGE_TO);
    var y = getRandomInRange(data.Y_RANGE_FROM, data.Y_RANGE_TO);
    generatedAdvertisements[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: data.TITLES[i],
        address: x + ', ' + y,
        price: getRandomInRange(data.PRICE_RANGE_FROM, data.PRICE_RANGE_TO),
        type: getRandomArrayItem(data.TYPES),
        rooms: getRandomInRange(data.ROOMS_RANGE_FROM, data.ROOMS_RANGE_TO),
        guests: getRandomInRange(data.GUESTS_RANGE_FROM, data.GUESTS_RANGE_TO),
        checkin: getRandomArrayItem(data.CHECKIN_TIMES),
        checkout: getRandomArrayItem(data.CHECKIN_TIMES),
        features: getRandomArrayItems(data.FEATURES),
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

// Функция отрисовки диалоговой панели объявления
var renderDialogPanel = function (advertisementItem) {
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
};

// Функция, снимающая выделение с метки объявления
var deactivatePin = function () {
  activePin.classList.remove('pin--active');
  activePin = false;
};

// Функция закрытия диалоговой панели объявления
var closePanel = function () {
  dialogBlock.classList.add('hidden');
};

// Функция, определяющая соответствие между меткой объявления и элементом массива, и отрисовывающая соответствующую диалоговую панель
var renderProperPanel = function (pinElement) {
  for (var i = 0; i < advertisements.length; i++) {
    if (pinElement.firstChild.getAttribute('src') === advertisements[i].author.avatar) {
      renderDialogPanel(advertisements[i]);
      break;
    }
  }
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

// Функция, подсвечивающая активируемую метку объявления и открывающая соответствующую ей диалоговую панель
var activatePinAndPanel = function (target) {
  while (target !== map) {
    if (target.classList.contains('pin') && !target.classList.contains('pin__main')) {
      switchPin(target);
      renderProperPanel(target);
      break;
    }
    target = target.parentNode;
  }
};

// Функция, устанавливающая изначальные значения атрибутов полей формы
var setInitialInputAttributes = function () {
  addressInput.required = true;
  titleInput.minLength = formFieldsData.TITLE_MIN_LENGTH;
  titleInput.maxLength = formFieldsData.TITLE_MAX_LENGTH;
  titleInput.required = true;
  priceInput.min = formFieldsData.PRICE_MIN_VALUE;
  priceInput.max = formFieldsData.PRICE_MAX_VALUE;
  priceInput.value = formFieldsData.PRICE_INITIAL_VALUE;
  priceInput.required = true;
  adjustPrice();
  adjustCapacity();
};

// Функция для снятия disabled у элементов списка
var cleanDisabledOptions = function (select) {
  for (var i = 0; i < select.options.length; i++) {
    select.options[i].disabled = false;
  }
};

// Функция переключения атрибута disabled
var toggleDisabled = function (element) {
  element.disabled = element.disabled ? false : true;
};

// Функция сравнения значений value у выбранной пользователем опции количества комнат и опций числа гостей
var isCapacityValueBiggerThanRooms = function (index) {
  return parseInt(capacityInput.options[index].value, 10) > parseInt(roomsInput.value, 10);
};

// Функция синхронизации полей времени заезда и выезда
var adjustTime = function (target) {
  if (target === timeInInput) {
    timeOutInput.value = target.value;
  } else {
    timeInInput.value = target.value;
  }
};

// Функция синхронизации полей типа апартаментов и минимальной цены
var adjustPrice = function () {
  priceInput.min = typeToPriceRatio[typeInput.value.toUpperCase()];
};

// Функция синхронизации полей количества комнат и числа гостей
var adjustCapacity = function () {
  for (var i = 0; i < capacityInput.options.length; i++) {
    if (isCapacityValueBiggerThanRooms(i) || capacityInput.options[i].value === nonGuestsValue.CAPACITY) {
      capacityInput.options[i].disabled = true;
    }
    if (roomsInput.value === nonGuestsValue.ROOMS) {
      toggleDisabled(capacityInput.options[i]);
    }
    if (roomsInput.value !== nonGuestsValue.ROOMS) {
      capacityInput.value = roomsInput.value;
    } else {
      capacityInput.value = nonGuestsValue.CAPACITY;
    }
  }
  // if (roomsInput.value === '1') {
  //   capacityInput.options[0].disabled = true;
  //   capacityInput.options[1].disabled = true;
  //   capacityInput.options[3].disabled = true;
  //   capacityInput.value = roomsInput.value;
  // } else if (roomsInput.value === '2') {
  //   capacityInput.options[0].disabled = true;
  //   capacityInput.options[3].disabled = true;
  //   capacityInput.value = roomsInput.value;
  // } else if (roomsInput.value === '3') {
  //   capacityInput.options[3].disabled = true;
  //   capacityInput.value = roomsInput.value;
  // } else {
  //   capacityInput.options[0].disabled = true;
  //   capacityInput.options[1].disabled = true;
  //   capacityInput.options[2].disabled = true;
  //   capacityInput.value = '0';
  // }
};

// Обработчики событий
var mapClickHandler = function (evt) {
  activatePinAndPanel(evt.target);
};

var mapKeyDownHandler = function (evt) {
  if (isEnterPressed(evt.keyCode)) {
    activatePinAndPanel(evt.target);
  }
};

var dialogCloseClickHandler = function () {
  closePanel();
  deactivatePin();
};

var dialogCloseKeyDownHandler = function (evt) {
  if (isEnterPressed(evt.keyCode)) {
    closePanel();
    deactivatePin();
  }
};

var keyDownHandler = function (evt) {
  if (isEscPressed(evt.keyCode) && !dialogBlock.classList.contains('hidden')) {
    closePanel();
    deactivatePin();
  }
};

var timeInputHandler = function (evt) {
  adjustTime(evt.target);
};

var typeInputHandler = function () {
  adjustPrice();
};

var roomsInputHandler = function () {
  cleanDisabledOptions(capacityInput);
  adjustCapacity();
};

var panelTemplate = document.getElementById('lodge-template').content;
var map = document.querySelector('.tokyo__pin-map');
var dialogBlock = document.getElementById('offer-dialog');
var dialogClose = dialogBlock.querySelector('.dialog__close');
var advertisements = generateAdvertisements(advertisementsData);
var fragment = document.createDocumentFragment();
var activePin = false;
var advertisementForm = document.querySelector('.notice__form');
var addressInput = advertisementForm.querySelector('#address');
var titleInput = advertisementForm.querySelector('#title');
var timeInInput = advertisementForm.querySelector('#timein');
var timeOutInput = advertisementForm.querySelector('#timeout');
var typeInput = advertisementForm.querySelector('#type');
var priceInput = advertisementForm.querySelector('#price');
var roomsInput = advertisementForm.querySelector('#room_number');
var capacityInput = advertisementForm.querySelector('#capacity');

// Отрисовываем все объявления из массива
advertisements.forEach(function (item) {
  fragment.appendChild(renderAdvertisement(item));
});
map.appendChild(fragment);

dialogBlock.classList.add('hidden');

// Вешаем обработчики на метки объявлений и диалоговую панель
map.addEventListener('click', mapClickHandler);
map.addEventListener('keydown', mapKeyDownHandler);
dialogClose.addEventListener('click', dialogCloseClickHandler);
dialogClose.addEventListener('keydown', dialogCloseKeyDownHandler);
document.addEventListener('keydown', keyDownHandler);

setInitialInputAttributes();

// Вешаем обработчики на элементы формы размещения объявления
timeInInput.addEventListener('input', timeInputHandler);
timeOutInput.addEventListener('input', timeInputHandler);
typeInput.addEventListener('input', typeInputHandler);
roomsInput.addEventListener('input', roomsInputHandler);

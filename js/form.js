// Модуль для работы с формой подачи объявления

'use strict';

(function () {
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

  // Объект с данными значений полей #room_number и #capacity
  var roomsAndCapacityData = {
    ONE_ROOM_VALUE: '1',
    TWO_ROOMS_VALUE: '2',
    THREE_ROOMS_VALUE: '3',
    HUNDRED_ROOMS_VALUE: '100',
    ONE_ROOM_DISABLED_INDEXES: [0, 1, 3],
    TWO_ROOMS_DISABLED_INDEXES: [0, 3],
    THREE_ROOMS_DISABLED_INDEXES: [3],
    HUNDRED_ROOMS_DISABLED_INDEXES: [0, 1, 2],
    CAPACITY_NON_GUESTS_VALUE: '0'
  };

  var INVALID_FIELD_BORDER = '2px solid #ff0000';
  var advertisementForm = document.querySelector('.notice__form');
  var submitButton = advertisementForm.querySelector('.form__submit');
  var addressInput = advertisementForm.querySelector('#address');
  var titleInput = advertisementForm.querySelector('#title');
  var timeInInput = advertisementForm.querySelector('#timein');
  var timeOutInput = advertisementForm.querySelector('#timeout');
  var typeInput = advertisementForm.querySelector('#type');
  var priceInput = advertisementForm.querySelector('#price');
  var roomsInput = advertisementForm.querySelector('#room_number');
  var capacityInput = advertisementForm.querySelector('#capacity');

  // Функция, устанавливающая изначальные значения атрибутов полей формы
  var setInitialInputAttributes = function () {
    addressInput.required = true;
    addressInput.readOnly = true;
    titleInput.minLength = formFieldsData.TITLE_MIN_LENGTH;
    titleInput.maxLength = formFieldsData.TITLE_MAX_LENGTH;
    titleInput.required = true;
    priceInput.min = formFieldsData.PRICE_MIN_VALUE;
    priceInput.max = formFieldsData.PRICE_MAX_VALUE;
    priceInput.value = formFieldsData.PRICE_INITIAL_VALUE;
    priceInput.required = true;
    window.synchronizeFields(priceInput, typeInput, adjustPrice);
    window.synchronizeFields(capacityInput, roomsInput, adjustCapacity);
  };

  // Функция, блокирующая опцию списка #capacity, соответствующую переданному индексу опции
  var disableCapacityOptions = function (value) {
    capacityInput.options[value].disabled = true;
  };

  // Функция для снятия disabled у элементов списка
  var cleanDisabledOptions = function (select) {
    [].forEach.call(select.options, function (item) {
      item.disabled = false;
    });
  };

  // Функция синхронизации полей времени заезда и выезда
  var adjustTime = function (input1, input2, target) {
    if (target === input1) {
      input2.value = target.value;
    } else {
      input1.value = target.value;
    }
  };

  // Функция синхронизации полей типа апартаментов и минимальной цены
  var adjustPrice = function (input1, input2) {
    input1.min = typeToPriceRatio[input2.value.toUpperCase()];
  };

  // Функция синхронизации полей количества комнат и числа гостей
  var adjustCapacity = function (input1, input2) {
    if (input2.value === roomsAndCapacityData.ONE_ROOM_VALUE) {
      roomsAndCapacityData.ONE_ROOM_DISABLED_INDEXES.forEach(disableCapacityOptions);
    } else if (input2.value === roomsAndCapacityData.TWO_ROOMS_VALUE) {
      roomsAndCapacityData.TWO_ROOMS_DISABLED_INDEXES.forEach(disableCapacityOptions);
    } else if (input2.value === roomsAndCapacityData.THREE_ROOMS_VALUE) {
      roomsAndCapacityData.THREE_ROOMS_DISABLED_INDEXES.forEach(disableCapacityOptions);
    } else {
      roomsAndCapacityData.HUNDRED_ROOMS_DISABLED_INDEXES.forEach(disableCapacityOptions);
    }
    if (input2.value !== roomsAndCapacityData.HUNDRED_ROOMS_VALUE) {
      input1.value = input2.value;
    } else {
      input1.value = roomsAndCapacityData.CAPACITY_NON_GUESTS_VALUE;
    }
  };

  // Функция, обнуляющая значение style.border элемента
  var setInitialBorderStyle = function (element) {
    element.style.border = '';
  };

  // Функция, отмечающая поля формы при условии их невалидности
  var markInvalidFields = function () {
    if (!addressInput.validity.valid) {
      addressInput.style.border = INVALID_FIELD_BORDER;
      addressInput.addEventListener('input', fieldInputHandler);
    }
    if (!titleInput.validity.valid) {
      titleInput.style.border = INVALID_FIELD_BORDER;
      titleInput.addEventListener('input', fieldInputHandler);
    }
    if (!priceInput.validity.valid) {
      priceInput.style.border = INVALID_FIELD_BORDER;
      priceInput.addEventListener('input', fieldInputHandler);
    }
  };

  // Обработчики событий
  var timeInputHandler = function (evt) {
    window.synchronizeFields(timeInInput, timeOutInput, adjustTime, evt.target);
  };

  var typeInputHandler = function () {
    window.synchronizeFields(priceInput, typeInput, adjustPrice);
  };

  var roomsInputHandler = function () {
    cleanDisabledOptions(capacityInput);
    window.synchronizeFields(capacityInput, roomsInput, adjustCapacity);
  };

  var submitButtonClickHandler = function () {
    markInvalidFields();
  };

  var submitButtonKeydownHandler = function (evt) {
    if (window.util.isEnterPressed(evt.keyCode)) {
      markInvalidFields();
    }
  };

  var fieldInputHandler = function (evt) {
    if (evt.target.validity.valid) {
      setInitialBorderStyle(evt.target);
      evt.target.removeEventListener('input', fieldInputHandler);
    }
  };

  setInitialInputAttributes();

  // Вешаем обработчики на элементы формы размещения объявления
  timeInInput.addEventListener('input', timeInputHandler);
  timeOutInput.addEventListener('input', timeInputHandler);
  typeInput.addEventListener('input', typeInputHandler);
  roomsInput.addEventListener('input', roomsInputHandler);
  submitButton.addEventListener('click', submitButtonClickHandler);
  submitButton.addEventListener('keydown', submitButtonKeydownHandler);
})();

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
  var typeToPriceRelation = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  // Объект с соотношением устанавливаемых значений полей #room_number и #capacity
  var roomsToCapacityRelation = {
    1: 1,
    2: 2,
    3: 3,
    100: 0
  };

  // Объект с соотношением устанавливаемого значения поля #room_number и отключаемых значений поля #capacity
  var roomsToDisabledCapacityRelation = {
    1: [0, 1, 3],
    2: [0, 3],
    3: [3],
    100: [0, 1, 2]
  };

  var INVALID_FIELD_BORDER = '2px solid #ff0000';
  var advertisementForm = document.querySelector('.notice__form');
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
    titleInput.pattern = '.{' + formFieldsData.TITLE_MIN_LENGTH + ',' + formFieldsData.TITLE_MAX_LENGTH + '}';
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
  var disableCapacityOptions = function (index) {
    capacityInput.options[index].disabled = true;
  };

  // Функция для снятия disabled у элементов списка
  var cleanDisabledOptions = function (select) {
    [].forEach.call(select.options, function (item) {
      item.disabled = false;
    });
  };

  // Функция синхронизации полей времени заезда и выезда
  var adjustTime = function (firstField, secondField, target) {
    if (target === firstField) {
      secondField.value = target.value;
    } else {
      firstField.value = target.value;
    }
  };

  // Функция синхронизации полей типа апартаментов и минимальной цены
  var adjustPrice = function (dependentField, mainField) {
    dependentField.min = typeToPriceRelation[mainField.value.toUpperCase()];
  };

  // Функция синхронизации полей количества комнат и числа гостей
  var adjustCapacity = function (dependentField, mainField) {
    roomsToDisabledCapacityRelation[mainField.value].forEach(disableCapacityOptions);
    dependentField.value = roomsToCapacityRelation[mainField.value];
  };

  // Функция, обнуляющая значение style.border элемента
  var setInitialBorderStyle = function (element) {
    element.style.border = '';
  };

  // Функция для пометки невалидных полей формы
  var markField = function (field) {
    field.style.border = INVALID_FIELD_BORDER;
    field.addEventListener('input', fieldInputHandler);
  };

  // Функция для проверки валидности поля #price и снятия его маркировки в случае, если оно валидно
  var checkPriceValidity = function () {
    if (priceInput.checkValidity()) {
      setInitialBorderStyle(priceInput);
      priceInput.removeEventListener('input', fieldInputHandler);
    }
  };

  // Функция для вывода кастомного сообщения для невалидного поля #title при вводе слишком короткого значения
  var checkTitleLength = function () {
    if (titleInput.value && titleInput.value.length < formFieldsData.TITLE_MIN_LENGTH) {
      titleInput.setCustomValidity('Пожалуйста, используйте не менее ' + formFieldsData.TITLE_MIN_LENGTH + ' символов (сейчас вы используете ' + titleInput.value.length + ' символов).');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  // Обработчики событий
  var timeChangeHandler = function (evt) {
    window.synchronizeFields(timeInInput, timeOutInput, adjustTime, evt.target);
  };

  var typeChangeHandler = function () {
    window.synchronizeFields(priceInput, typeInput, adjustPrice);
    checkPriceValidity();
  };

  var roomsChangeHandler = function () {
    cleanDisabledOptions(capacityInput);
    window.synchronizeFields(capacityInput, roomsInput, adjustCapacity);
  };

  var formInvalidHandler = function (evt) {
    markField(evt.target);
  };

  var fieldInputHandler = function (evt) {
    if (evt.target === titleInput) {
      checkTitleLength();
    }
    if (evt.target.validity.valid) {
      setInitialBorderStyle(evt.target);
      evt.target.removeEventListener('input', fieldInputHandler);
    }
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(advertisementForm), window.popUp.uploadSuccessHandler, window.popUp.errorHandler);
    advertisementForm.reset();
    setInitialInputAttributes();
    window.setInitialAddress();
  };

  setInitialInputAttributes();

  // Вешаем обработчики на элементы формы размещения объявления
  timeInInput.addEventListener('change', timeChangeHandler);
  timeOutInput.addEventListener('change', timeChangeHandler);
  typeInput.addEventListener('change', typeChangeHandler);
  roomsInput.addEventListener('change', roomsChangeHandler);
  advertisementForm.addEventListener('invalid', formInvalidHandler, true);
  advertisementForm.addEventListener('submit', formSubmitHandler);
})();

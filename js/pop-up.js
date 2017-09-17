// Модуль для создания и вывода окна с сообщением

'use strict';

(function () {
  // Объект с цветами рамок диалогового окна
  var popUpBorderColor = {
    error: '#ff6d51',
    success: '#40ff00'
  };

  // Функция для создания и стилизации поп-апа
  var createPopUp = function () {
    var popUp = document.createElement('div');
    popUp.style.position = 'fixed';
    popUp.style.top = '50%';
    popUp.style.left = '50%';
    popUp.style.zIndex = 100;
    popUp.style.padding = '50px';
    popUp.style.background = '#ffffff';
    popUp.style.border = '4px solid #000000';
    popUp.style.borderRadius = '8px';
    popUp.style.transform = 'translate(-50%, -50%)';
    popUp.style.cursor = 'pointer';
    popUp.className = 'pop-up hidden';
    return popUp;
  };

  // Функция для создания и стилизации оверлея
  var createOverlay = function () {
    var overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.left = 0;
    overlay.style.zIndex = 90;
    overlay.style.background = 'rgba(0, 0, 0, 0.5)';
    overlay.className = 'overlay hidden';
    return overlay;
  };

  // Функция добавления элементов диалогового окна на страницу
  var renderDialog = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createPopUp());
    fragment.appendChild(createOverlay());
    document.body.appendChild(fragment);
  };

  // Функция показа диалогового окна
  var showDialog = function (message, borderColor) {
    popUp.textContent = message;
    popUp.style.borderColor = borderColor;
    popUp.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  // Функция скрытия диалогового окна
  var hideDialog = function () {
    popUp.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  // Обработчики событий
  var popUpClickHandler = function () {
    hideDialog();
  };

  var keydownHandler = function (evt) {
    if (window.util.isEscPressed(evt.keyCode)) {
      hideDialog();
    }
  };

  renderDialog();

  var popUp = document.querySelector('.pop-up');
  var overlay = document.querySelector('.overlay');

  popUp.addEventListener('click', popUpClickHandler);
  document.addEventListener('keydown', keydownHandler);

  window.popUp = {
    // Функция, выводящая окно с ошибкой при неудачной передаче данных
    errorHandler: function (errorMessage) {
      showDialog(errorMessage, popUpBorderColor.error);
    },

    // Функция, выводящая окно с сообщением об успешной отправке данных и сбрасывающая форму к первоначальному состоянию
    uploadSuccessHandler: function () {
      showDialog('Данные успешно отправлены', popUpBorderColor.success);
      window.resetForm();
    }
  };
})();

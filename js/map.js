// Файл для работы с объявлениями на карте

'use strict';

(function () {
  var map = document.querySelector('.tokyo__pin-map');
  var dialogBlock = document.getElementById('offer-dialog');
  var dialogClose = dialogBlock.querySelector('.dialog__close');
  var activePin = false;

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
    for (var i = 0; i < window.data.advertisements.length; i++) {
      if (pinElement.firstChild.getAttribute('src') === window.data.advertisements[i].author.avatar) {
        window.renderDialogPanel(window.data.advertisements[i]);
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

  // Обработчики событий
  var mapClickHandler = function (evt) {
    activatePinAndPanel(evt.target);
  };

  var mapKeyDownHandler = function (evt) {
    if (window.util.isEnterPressed(evt.keyCode)) {
      activatePinAndPanel(evt.target);
    }
  };

  var dialogCloseClickHandler = function () {
    closePanel();
    deactivatePin();
  };

  var dialogCloseKeyDownHandler = function (evt) {
    if (window.util.isEnterPressed(evt.keyCode)) {
      closePanel();
      deactivatePin();
    }
  };

  var keyDownHandler = function (evt) {
    if (window.util.isEscPressed(evt.keyCode) && !dialogBlock.classList.contains('hidden')) {
      closePanel();
      deactivatePin();
    }
  };

  dialogBlock.classList.add('hidden');

  // Вешаем обработчики на метки объявлений и диалоговую панель
  map.addEventListener('click', mapClickHandler);
  map.addEventListener('keydown', mapKeyDownHandler);
  dialogClose.addEventListener('click', dialogCloseClickHandler);
  dialogClose.addEventListener('keydown', dialogCloseKeyDownHandler);
  document.addEventListener('keydown', keyDownHandler);
})();

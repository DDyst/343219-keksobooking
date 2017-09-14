// Модуль для отрисовки диалоговой панели выбранного жилья при нажатии на метку на карте

'use strict';

(function () {
  var map = document.querySelector('.tokyo__pin-map');

  // Функция, подсвечивающая активируемую метку объявления и открывающая соответствующую ей диалоговую панель
  window.showCard = function (target, activatePin, advertisements) {
    while (target !== map) {
      if (target.classList.contains('pin') && !target.classList.contains('pin__main')) {
        activatePin(target);
        window.card.renderProperPanel(target, advertisements);
        break;
      }
      target = target.parentNode;
    }
  };
})();

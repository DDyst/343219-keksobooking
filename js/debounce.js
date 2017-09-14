// Модуль для устранения "дребезга" при частом вызове функции

'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 5000;
  var lastTimeout;

  window.debounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };
})();

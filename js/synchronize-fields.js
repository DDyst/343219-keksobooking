// Модуль для синхронизации полей формы

'use strict';

(function () {
  window.synchronizeFields = function (input1, input2, callBack, target) {
    callBack(input1, input2, target);
  };
})();

// Вспомогательный модуль

'use strict';

(function () {
  // Объект со значениями кодов клавиш
  var keyCodes = {
    ESC: 27,
    ENTER: 13
  };

  window.util = {
    // Функция, сравнивающая значение переданного кода клавиши с кодом Esc
    isEscPressed: function (code) {
      return code === keyCodes.ESC;
    },

    // Функция, сравнивающая значение переданного кода клавиши с кодом Enter
    isEnterPressed: function (code) {
      return code === keyCodes.ENTER;
    },

    // Функция нахождения случайного целого числа в заданном диапазоне включительно
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Функция, возвращающая индекс случайного элемента массива
    getRandomArrayItemIndex: function (array) {
      return this.getRandomInRange(0, array.length - 1);
    },

    // Функция, возвращающая случайный элемент массива
    getRandomArrayItem: function (array) {
      return array[this.getRandomInRange(0, array.length - 1)];
    },

    // Функция, удаляющая случайный элемент массива
    deleteRandomArrayItem: function (array) {
      array.splice(this.getRandomArrayItemIndex(array), 1);
    },

    // Функция, возвращающая массив случайной длины (но не менее 1) из случайных элементов переданного в неё массива
    getRandomArrayItems: function (array) {
      var copiedItems = array.slice();
      for (var i = 0; i < this.getRandomArrayItemIndex(array); i++) {
        this.deleteRandomArrayItem(copiedItems);
      }
      return copiedItems;
    },

    // Функция, возвращающая массив указанной длины из случайных элементов переданного в неё массива
    getNewArray: function (array, newArrayLength) {
      var copiedItems = array.slice();
      for (var i = 0; copiedItems.length > newArrayLength; i++) {
        this.deleteRandomArrayItem(copiedItems);
      }
      return copiedItems;
    }
  };
})();

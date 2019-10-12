'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.util = {
    // выбирает случайный элемент массива
    getRandomItem: function (arr) {
      var randomEl = arr[Math.floor(Math.random() * (arr.length))];
      return randomEl;
    },
    // меняет передаваемое значение стилей
    changeValue: function (array, element, input, rule) {
      var randomValue = window.util.getRandomItem(array);
      element.style[rule] = randomValue;
      input.value = randomValue;
    },
    // обработчик esc
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    // обработчик enter
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
  };
})();

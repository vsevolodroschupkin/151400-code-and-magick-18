'use strict';
(function () {
  var WIZARDS_QNT = 4;
  // var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(56, 159, 117)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // локальные переменные
  var setupDialogElement = document.querySelector('.setup');
  var form = setupDialogElement.querySelector('.setup-wizard-form');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
  var setupSimilar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  var setupWizard = setupDialogElement.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireball = setupDialogElement.querySelector('.setup-fireball-wrap');
  var fireballColorValue = setupFireball.querySelector('input[name="fireball-color"]');
  var wizardEyesValue = setupDialogElement.querySelector('input[name="eyes-color"]');
  var wizardCoatValue = setupDialogElement.querySelector('input[name="coat-color"]');

  // генерирует массив с объектами
  // var createWizards = function () {
  //   var wizards = [];
  //   for (var i = 0; i < WIZARDS_QNT; i++) {
  //     wizards[i] = {
  //       name: window.util.getRandomItem(FIRST_NAMES) + ' ' + window.util.getRandomItem(SURNAMES),
  //       coatColor: window.util.getRandomItem(COAT_COLORS),
  //       eyeColor: window.util.getRandomItem(EYE_COLORS),
  //     };
  //   }
  //   return wizards;
  // };


  // наполняет фрагмент
  var fillWizardTemplate = function (elements) {
    for (var i = 0; i < WIZARDS_QNT; i++) {
      var element = template.cloneNode(true);
      var elementName = element.querySelector('.setup-similar-label');
      var elementCoat = element.querySelector('.wizard-coat');
      var elementEye = element.querySelector('.wizard-eyes');
      var j = window.util.getRandomInteger(0, elements.length); // выбираем произвольный элемент массива данных
      elementName.textContent = elements[j].name;
      elementCoat.style.fill = elements[j].colorCoat;
      elementEye.style.fill = elements[j].eyeColor;
      fragment.appendChild(element);
    }
    return fragment;
  };

  // рендерит фрагмент с похожими персонажами
  // var readyWizards = createWizards();

  // обработчик входных данных
  var successDataHandler = function (wizards) {
    var readyWizardFragment = fillWizardTemplate(wizards);
    similarList.appendChild(readyWizardFragment);
    setupSimilar.classList.remove('hidden');
  };

  // обработчик ошибки передачи данных
  var errorHandler = function (errorMessage) {
    var newElement = document.createElement('div');
    newElement.style = 'z-index: 1000; margin: 0 auto; text-align: center; background-color: #c62828; padding: 16px;';
    newElement.style.position = 'absolute';
    newElement.style.minWidth = '344px';
    newElement.style.minHeight = '48px';
    newElement.style.left = '10%';
    newElement.style.top = '10%';
    newElement.style.fontSize = '1.2em';
    newElement.style.borderRadius = '5px';
    newElement.style.fontFamily = 'Roboto, sans-serif';
    newElement.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.5)';

    newElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', newElement);
  };

  var formSendHandler = function (evt) {
    window.backend.save(
        new FormData(form), // данные формы
        function () {
          setupDialogElement.classList.add('hidden');
        }, // в случае успеха
        errorHandler// в случае ошибки
    );
    evt.preventDefault();
  };

  // изменяет цвет элементов персонажа
  wizardCoat.addEventListener('click', function () {
    window.util.changeValue(COAT_COLORS, wizardCoat, wizardCoatValue, 'fill');
  });
  wizardEyes.addEventListener('click', function () {
    window.util.changeValue(EYE_COLORS, wizardEyes, wizardEyesValue, 'fill');
  });
  setupFireball.addEventListener('click', function () {
    window.util.changeValue(FIREBALL_COLORS, setupFireball, fireballColorValue, 'backgroundColor');
  });

  // получаем данные
  window.backend.load(successDataHandler, errorHandler);

  // отправка формы
  form.addEventListener('submit', formSendHandler);


})();



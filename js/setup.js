'use strict';
var WIZARDS_QNT = 4;
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgba(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(56, 159, 117)', 'rgba(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var similarList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

// выбирает случайный элемент массива
var getRandomItem = function (arr) {
  var randomEl = arr[Math.floor(Math.random() * (arr.length))];
  return randomEl;
};

// генерирует массив с объектами
var createWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARDS_QNT; i++) {
    wizards[i] = {
      name: getRandomItem(firstNames) + ' ' + getRandomItem(surnames),
      coatColor: getRandomItem(coatColors),
      eyeColor: getRandomItem(eyeColors),
    };
  }
  return wizards;
};

// наполняет фрагмент
var fillWizardTemplate = function (persons) {
  for (var i = 0; i < WIZARDS_QNT; i++) {
    var element = template.cloneNode(true);
    var elementName = element.querySelector('.setup-similar-label');
    var elementCoat = element.querySelector('.wizard-coat');
    var elementEye = element.querySelector('.wizard-eyes');
    elementName.textContent = persons[i].name;
    elementCoat.style.fill = persons[i].coatColor;
    elementEye.style.fill = persons[i].eyeColor;
    fragment.appendChild(element);
  }
  return fragment;
};

// рендерит фрагмент
var renderSimilar = function (readyFragment) {
  similarList.appendChild(readyFragment);
};

var readyWizards = createWizards();
var readyWizardFragment = fillWizardTemplate(readyWizards);
renderSimilar(readyWizardFragment);
setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');

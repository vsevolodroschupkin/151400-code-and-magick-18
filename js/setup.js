'use strict';
var WIZARDS_QNT = 4;
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgba(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(56, 159, 117)', 'rgba(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var similarList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var fireballColorValue = setupFireball.querySelector('input[name="fireball-color"]');
var wizardEyesValue = setup.querySelector('input[name="eyes-color"]');
var wizardCoatValue = setup.querySelector('input[name="coat-color"]');

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
setupSimilar.classList.remove('hidden');


// события
var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


// делаем настройки персонажа
var changeFeature = function (array, element, input) {
  var randomItem = getRandomItem(array);
  if (element.tagName !== 'use') {
    element.style.backgroundColor = randomItem;
  } else {
    element.style.fill = randomItem;
  }
  input.value = randomItem;
};

wizardCoat.addEventListener('click', function () {
  changeFeature(coatColors, wizardCoat, wizardCoatValue);
});

wizardEyes.addEventListener('click', function () {
  changeFeature(eyeColors, wizardEyes, wizardEyesValue);
});

setupFireball.addEventListener('click', function () {
  changeFeature(fireballColors, setupFireball, fireballColorValue);
});


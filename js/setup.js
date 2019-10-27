'use strict';
(function () {
  var WIZARDS_QNT = 4;
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

  var fillWizardTemplate = function (elements) {
    for (var i = 0; i < WIZARDS_QNT; i++) {
      var element = template.cloneNode(true);
      var elementName = element.querySelector('.setup-similar-label');
      var elementCoat = element.querySelector('.wizard-coat');
      var elementEye = element.querySelector('.wizard-eyes');
      var randomNumber = window.util.getRandomInteger(0, elements.length);
      var selectedElement = elements[randomNumber];
      elementName.textContent = selectedElement.name;
      elementCoat.style.fill = selectedElement.colorCoat;
      elementEye.style.fill = selectedElement.eyeColor;
      fragment.appendChild(element);
    }
    return fragment;
  };

  var successLoadHandler = function (wizards) {
    var readyWizardFragment = fillWizardTemplate(wizards);
    similarList.appendChild(readyWizardFragment);
    setupSimilar.classList.remove('hidden');
  };

  var successSendHandler = function () {
    setupDialogElement.classList.add('hidden');
  };

  var errorLoadHandler = function (errorMessage) {
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
    var formData = new FormData(form);
    window.backend.save(formData, successSendHandler, errorLoadHandler);
    evt.preventDefault();
  };

  wizardCoat.addEventListener('click', function () {
    window.util.changeValue(COAT_COLORS, wizardCoat, wizardCoatValue, 'fill');
  });
  wizardEyes.addEventListener('click', function () {
    window.util.changeValue(EYE_COLORS, wizardEyes, wizardEyesValue, 'fill');
  });
  setupFireball.addEventListener('click', function () {
    window.util.changeValue(FIREBALL_COLORS, setupFireball, fireballColorValue, 'backgroundColor');
  });

  window.backend.load(successLoadHandler, errorLoadHandler);

  form.addEventListener('submit', formSendHandler);

})();



'use strict';
(function () {
  var setupDialogElement = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupDialogElement.querySelector('.setup-close');
  var setupUserName = setupDialogElement.querySelector('.setup-user-name');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  var popupEcsPressHandler = function (evt) {
    if (evt.target !== setupUserName) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var getOriginCoords = function (element) {
    var originCoords = {
      x: element.offsetLeft,
      y: element.offsetTop
    };
    return originCoords;
  };

  var openPopup = function () {
    setupDialogElement.classList.remove('hidden');
    window.setupDialogCoords = getOriginCoords(setupDialogElement);
    document.addEventListener('keydown', popupEcsPressHandler);
  };

  var closePopup = function () {
    setupDialogElement.style.left = window.setupDialogCoords.x + 'px';
    setupDialogElement.style.top = window.setupDialogCoords.y + 'px';
    setupDialogElement.classList.add('hidden');
    document.removeEventListener('keydown', popupEcsPressHandler);
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });
  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var onClickPreventDefault = function (evtDrag) {
          evtDrag.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();


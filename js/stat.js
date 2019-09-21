'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_MARGIN = 20;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_GUTTER = 50;
var GRAPH_X = CLOUD_X + 40;
var GRAPH_Y = CLOUD_HEIGHT + CLOUD_Y - CLOUD_MARGIN - FONT_GAP;
var LEGEND_HEIGHT = 16;
var barHeight = 150;
var myColor = 'rgba(255, 0, 0, 1)';

//рисуем облако для статистики
var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

//находим максимальный элемент массива
var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

//рисуем статистику
window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  //настройки шрифта
  ctx.font = '16px, PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';

  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_MARGIN, CLOUD_Y + CLOUD_MARGIN);
  ctx.fillText('Список результатов: ', CLOUD_X + CLOUD_MARGIN, CLOUD_Y + CLOUD_MARGIN + FONT_GAP);

  var maxTime = getMaxElement(times);

  for(var i = 0; i < players.length; i++) {
    ctx.fillStyle = "#000";
    ctx.fillText(players[i], GRAPH_X + (BAR_WIDTH + BAR_GUTTER) * i , GRAPH_Y);
    ctx.fillText(Math.round(times[i]), GRAPH_X + (BAR_WIDTH + BAR_GUTTER) * i, GRAPH_Y - LEGEND_HEIGHT - FONT_GAP - ((barHeight * times[i]) / maxTime));

    //Выделяем красным столбец пользователя
    if (players[i] === 'Вы') {
      ctx.fillStyle = myColor;
    } else {
      var saturation = Math.random().toFixed(2);
      ctx.fillStyle = 'hsl(231, 79%, 39%, ' + saturation +')';
    };
    ctx.fillRect(GRAPH_X + (BAR_WIDTH + BAR_GUTTER) * i, GRAPH_Y - LEGEND_HEIGHT, BAR_WIDTH, - ((barHeight * times[i]) / maxTime));
  };
};

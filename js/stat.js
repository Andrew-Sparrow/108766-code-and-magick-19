'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var MAX_HEIGHT = 150;

var COLUMN_Y = 200;
var COLUMN_WIDTH = 40;

var START_X = 130;
var START_Y = 260;

var COLUMN_DISTANCE = 80;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7 )');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  var lineTitle1 = 'Ура вы победили!';
  var lineTitle2 = 'Список результатов:';
  ctx.fillText(lineTitle1, 120, 40);
  ctx.fillText(lineTitle2, 120, 60);

  ctx.fillText('Вы', START_X + COLUMN_DISTANCE * 0, START_Y);
  ctx.fillText('Иван', START_X + COLUMN_DISTANCE * 1, START_Y);
  ctx.fillText('Юлия', START_X + COLUMN_DISTANCE * 2, START_Y);

  ctx.translate(0, 230);
  ctx.rotate(Math.PI);
  ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
  ctx.fillRect(-START_X + COLUMN_DISTANCE * 0, 0, -COLUMN_WIDTH, 100);

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.fillStyle = 'hsl(240, 100%, 70%)';
  ctx.fillRect(START_X + COLUMN_DISTANCE, COLUMN_Y, COLUMN_WIDTH, 20);

  ctx.fillRect(START_X + COLUMN_DISTANCE * 2, COLUMN_Y, COLUMN_WIDTH, 20);
};

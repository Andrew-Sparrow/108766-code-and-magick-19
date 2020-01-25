'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var MAX_HEIGHT = 150;

var COLUMN_WIDTH = 40;

var START_X = 130;
var START_Y = 265;

var COLUMN_DISTANCE = 100;
var UPPER_GAP_COLUMN = 35;

var namePlayers = ['Вы', 'Кекс', 'Катя', 'Игорь'];
var timesPlayers = [2725, 4025, 1244, 1339];

var colorUser = 'rgba(255, 0, 0, 1)';

var listCalculatedHeight = []; // array with height of columns in statistic

/*
* find maximum in arr
* @param {Object} arr - list of player's times.
*/
function getMax(arr) {
  return arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
}

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// show name of Players under columns
// but not more than first 4 players
function positionNames(names, ctx) {
  for (var i = 0; i < names.length && i < 4; i++) {
    ctx.fillText(names[i], START_X + COLUMN_DISTANCE * i, START_Y);
  }
}

// returned random integer
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

/*
* show result of statistics
* but not more than first 4 players
* @param {Object} ctx - CanvasRenderingContext2D.
* @param {Object} times - array of player's times.
* */
function showStatistic(ctx, times) {
  var maxTime = getMax(times);
  var calculatedHigh;

  for (var i = 0; i < times.length && i < 4; i++) {
    if (i === 0) {
      ctx.fillStyle = colorUser;
    } else {
      ctx.fillStyle = `hsl(240, 100%, ${getRandomIntInclusive(10, 90)}%)`;
    }
    calculatedHigh = Math.floor((MAX_HEIGHT * times[i]) / maxTime);

    ctx.fillRect(-(START_X + COLUMN_DISTANCE * i), 0, -COLUMN_WIDTH, calculatedHigh);
    listCalculatedHeight.push(calculatedHigh);
  }
}
/*
* show times of players
* but not more than first 4 players
* @param {Object} ctx - CanvasRenderingContext2D.
* @param {Object} times - array of player's times.
* */
function showTimesPlayers(ctx, times) {
  for (var i = 0; i < times.length && i < 4; i++) {
    ctx.fillText(times[i], START_X + COLUMN_DISTANCE * i, CLOUD_HEIGHT - listCalculatedHeight[i] - UPPER_GAP_COLUMN);
  }
}

window.renderStatistics = function (ctx) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7 )');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  var lineTitle1 = 'Ура вы победили!';
  var lineTitle2 = 'Список результатов:';
  ctx.fillText(lineTitle1, 120, 40);
  ctx.fillText(lineTitle2, 120, 60);

  positionNames(namePlayers, ctx);
  ctx.save();
  // shift and rotate coordinate system
  ctx.translate(0, 240);
  ctx.rotate(Math.PI);

  showStatistic(ctx, timesPlayers);

  // set coordinates system to origin state
  ctx.restore();
  showTimesPlayers(ctx, timesPlayers);
};

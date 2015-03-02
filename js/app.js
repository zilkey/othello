"use strict";

// 0 = blank, 1 = white, 2 = black
var Othello = function(board, turn){
  this._board = board;
  this.turn = turn || 2;
  this._callbacks = [];
};

Othello.prototype.board = function () {
  this._ensureBoard();
  return this._board;
};

Othello.prototype._ensureBoard = function () {
  if(!this._board) {
    this._board = [];
    for (var i = 0; i < 8; i++) {
      this._board[i] = [];
      for (var j = 0; j < 8; j++) {
        this._board[i][j] = 0;
      }
    }
    this._board[3][3] = 1;
    this._board[3][4] = 2;
    this._board[4][3] = 2;
    this._board[4][4] = 1;
    this.turn = 2;
  }
};

Othello.directions = {
  southOf: function(point) { return {y: point.y + 1, x: point.x}; },
  eastOf: function(point) { return {y: point.y, x: point.x + 1}; },
  northOf: function(point) { return {y: point.y - 1, x: point.x}; },
  westOf: function(point) { return {y: point.y, x: point.x - 1}; },
  northeastOf: function(point) { return {y: point.y - 1, x: point.x + 1}; },
  southwestOf: function(point) { return {y: point.y + 1, x: point.x - 1}; },
  northwestOf: function(point) { return {y: point.y - 1, x: point.x - 1}; },
  southeastOf: function(point) { return {y: point.y + 1, x: point.x + 1}; },
}

Othello.prototype.onMove = function (callback) {
  this._callbacks.push(callback);
};

Othello.prototype.move = function (value, x, y) {
  this._ensureBoard();
  var point = {y: y, x: x};
  var opposite = value === 1 ? 2 : 1;

  var result = [];
  for (var direction in Othello.directions) {
    result = result.concat(this.flip(point, opposite, value, Othello.directions[direction]));
  };

  if(result.length > 0) {
    this.turn = opposite;
    var move = new Move(value, point, result);
    this._callbacks.forEach(function (callback) {
      callback(move);
    });
  }
  return move;
};

Othello.prototype.flip = function (point, opposite, value, fn) {
  var newPoint = fn(point);
  var result = [];
  if(this._board[newPoint.y] && this._board[newPoint.y][newPoint.x] === opposite) {
    var canFlip = false;
    var index = 2;
    var piecesToFlip = [];
    var keepGoing = true;
    piecesToFlip.push(point);
    piecesToFlip.push(newPoint);

    while (!canFlip && keepGoing) {
      newPoint = fn(newPoint);
      if (this._board[newPoint.y] && this._board[newPoint.y][newPoint.x] === value) {
        canFlip = true;
      } else if (this._board[newPoint.y] && this._board[newPoint.y][newPoint.x] === opposite) {
        piecesToFlip.push(newPoint);
      } else {
        keepGoing = false;
      }
      index++;
    }

    if (canFlip) {
      for (var i = 0; i < piecesToFlip.length; i++) {
        newPoint = piecesToFlip[i];
        result.push(newPoint);
        this._board[newPoint.y][newPoint.x] = value;
      }
    }
  }
  return result;
};

var Move = function (player, point, piecesTurned) {
  this.player = player;
  this.point = point;
  this.piecesTurned = piecesTurned;
};

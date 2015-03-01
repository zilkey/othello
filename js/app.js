"use strict";

// 0 = blank, 1 = white, 2 = black
var Othello = function(board, turn){
  this._board = board;
  this.turn = turn || 2;
};

Othello.columnNames = {a:0, b:1, c:2, d:3, e:4, f:5, g:6, h:7};

Othello.prototype._translate = function (columnName, rowName) {
  return {x: Othello.columnNames[columnName], y: rowName - 1};
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
    this.place(2, 'd', 5);
    this.place(1, 'e', 5);
    this.place(2, 'e', 4);
    this.place(1, 'd', 4);
  }
};

Othello.directions = {
  southOf: function(point) { return {y: point.y + 1, x: point.x}; },
  eastOf: function(point) { return {y: point.y, x: point.x + 1}; },
  northOf: function(point) { return {y: point.y - 1, x: point.x}; },
  westOf: function(point) { return {y: point.y, x: point.x - 1}; },
}

Othello.prototype.place = function (value, columnName, rowName) {
  this._ensureBoard();
  var point = this._translate(columnName, rowName);
  var opposite = value === 1 ? 2 : 1;
  this._board[point.y][point.x] = value;

  this.flip(point, opposite, value, Othello.directions.northOf);
  this.flip(point, opposite, value, Othello.directions.eastOf);
  this.flip(point, opposite, value, Othello.directions.southOf);
  this.flip(point, opposite, value, Othello.directions.westOf);

  // south east
  if(this._board[point.y + 1]) {
    if(this._board[point.y + 1][point.x + 1] === opposite && this._board[point.y + 2][point.x + 2] === value) {
      this._board[point.y + 1][point.x + 1] = value;
    }
  }

  // north west
  if(this._board[point.y - 1] && this._board[point.y - 1][point.x - 1] === opposite && this._board[point.y - 2][point.x - 2] === value) {
    this._board[point.y - 1][point.x - 1] = value;
  }

  // south west
  if(this._board[point.y + 1]) {
    if(this._board[point.y + 1][point.x - 1] === opposite && this._board[point.y + 2][point.x - 2] === value) {
      this._board[point.y + 1][point.x - 1] = value;
    }
  }

  // north east
  if(this._board[point.y - 1] && this._board[point.y - 1][point.x + 1] === opposite && this._board[point.y - 2][point.x + 2] === value) {
    this._board[point.y - 1][point.x + 1] = value;
  }

  this.turn = opposite;
};

Othello.prototype.flip = function (point, opposite, value, fn) {
  var newPoint = fn(point);
  if(this._board[newPoint.y] && this._board[newPoint.y][newPoint.x] === opposite) {
    var canFlip = false;
    var piecesToFlip = [];
    var index = 2;
    var keepGoing = true;
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
        this._board[newPoint.y][newPoint.x] = value;
      }
    }
  }
};

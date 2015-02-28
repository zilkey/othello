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

Othello.prototype.place = function (value, columnName, rowName) {
  this._ensureBoard();
  var point = this._translate(columnName, rowName);
  var opposite = value === 1 ? 2 : 1;
  this._board[point.y][point.x] = value;
  if(this._board[point.y + 1][point.x] === opposite && this._board[point.y + 2][point.x] === value) {
    this._board[point.y + 1][point.x] = value;
  }
  if(this._board[point.y][point.x + 1] === opposite && this._board[point.y][point.x + 2] === value) {
    this._board[point.y][point.x + 1] = value;
  }
  if(this._board[point.y - 1][point.x] === opposite && this._board[point.y - 2][point.x] === value) {
    this._board[point.y - 1][point.x] = value;
  }
  if(this._board[point.y][point.x - 1] === opposite && this._board[point.y][point.x - 2] === value) {
    this._board[point.y][point.x - 1] = value;
  }
  if(this._board[point.y + 1][point.x + 1] === opposite && this._board[point.y + 2][point.x + 2] === value) {
    this._board[point.y + 1][point.x + 1] = value;
  }
  if(this._board[point.y - 1][point.x - 1] === opposite && this._board[point.y - 2][point.x - 2] === value) {
    this._board[point.y - 1][point.x - 1] = value;
  }
  if(this._board[point.y + 1][point.x - 1] === opposite && this._board[point.y + 2][point.x - 2] === value) {
    this._board[point.y + 1][point.x - 1] = value;
  }
  if(this._board[point.y + 1][point.x - 1] === opposite && this._board[point.y + 2][point.x - 2] === value) {
    this._board[point.y + 1][point.x - 1] = value;
  }
  if(this._board[point.y - 1][point.x + 1] === opposite && this._board[point.y - 2][point.x + 2] === value) {
    this._board[point.y - 1][point.x + 1] = value;
  }
  this.turn = opposite;
};

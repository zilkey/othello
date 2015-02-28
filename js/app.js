"use strict";

// 0 = blank, 1 = white, 2 = black
var Othello = function(){
  this._board = {};
  this._init();
};

Othello.prototype._init = function () {
  var columns = 'abcdefgh'.split('');
  for (var i = 1; i < 9; i++) {
    this._board[i] = {};
    columns.forEach(function (columnName) {
      this._board[i][columnName] = 0;
    }.bind(this));
  }
  this.place(1, 'd', 4);
  this.place(1, 'e', 5);
  this.place(2, 'd', 5);
  this.place(2, 'e', 4);
};

Othello.prototype.board = function () {
  var result = [],
      row,
      columnName,
      rowName;

  for(rowName in this._board) {
    row = [];
    for (columnName in this._board[rowName]) {
      row.push(this._board[rowName][columnName]);
    }
    result.push(row);
  }
  return result;
};

Othello.prototype.place = function (value, columnName, rowName) {
  var opposite = value === 1 ? 2 : 1;
  this._board[rowName][columnName] = value;
  if(this._board[rowName + 1][columnName] === opposite && this._board[rowName + 2][columnName] === value) {
    this._board[rowName + 1][columnName] = value;
  }
};

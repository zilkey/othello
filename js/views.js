//data-container="game"

var BoardView = function ($container, game) {
  this.$container = $container;
  this.game = game;
  this.game.onMove(this.render.bind(this));
};

BoardView.prototype.render = function (move) {
  var $piece, $cell;
  move.piecesTurned.forEach(function (point) {
    $cell = this.grid[point.y][point.x];
    $piece = $cell.find('.piece');
    if ($piece.length === 0) {
      $piece = $('<div class="piece">');
      $cell.append($piece);
    }

    if (move.player === 1) {
      $piece.addClass('white').removeClass('black');
    }
    else {
      $piece.addClass('black').removeClass('white');
    }
  }.bind(this));
}

BoardView.prototype.init = function () {
  var self = this,
      grid = {},
      $row,
      $cell,
      $board = $('<div class="board"></div>');

  this.game.board().forEach(function (row, y) {
    grid[y] = {};
    $row = $('<div class="row"></div>');
    row.forEach(function (cell, x) {
      $cell = $('<div class="cell"></div>');
      if (cell === 1) {
        $cell.append('<div class="piece white">');
      }
      else if (cell === 2) {
        $cell.append('<div class="piece black">');
      }
      $cell.click(function () {
        self.game.move(self.game.turn, x, y);
      });
      $row.append($cell);
      grid[y][x] = $cell;
    });
    $board.append($row);
  });

  this.grid = grid;
  this.$container.append($board);
};

$(function () {
  var game = new Othello();

  var boardView = new BoardView($('[data-container=game]'), game);
  boardView.init();
});

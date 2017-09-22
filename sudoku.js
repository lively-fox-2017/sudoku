"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardFill = board_string;
    this.sudoBoard = [];
    this.generateBoard();
  }
  generateBoard() {
    for (var i = 1; i < 10; i++) {
      var temp = [];
      for (var j = 1; j < 10;j++){
        temp.push([this.boardFill[(j * i)-1]]);
      }
      this.sudoBoard.push(temp);
    }
  }
  solve() {

  }

  // Returns a string representing the current state of the board
  board() {
    return this.sudoBoard;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())

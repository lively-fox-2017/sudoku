'use strict'

class Sudoku {
  constructor(board_string) {
    this.string = board_string;
    this.box = [];
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    let a = 0;
    for (let i = 0; i < 9; i++) {
    this.box[i] = [];
      for (let y = 0; y < 9; y++) {
        this.box[i][y] = Number(this.string[a]);
        a++;
      }
    }

    return this.box;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]

var game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900');

// Remember: this will just fill out what it can and not "guess"
game.solve();

console.log(game.board());

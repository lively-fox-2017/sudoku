"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardELement = [];
    for (let i = 0; i < 9; i++) {
      let baris = [];
      for (let j = 0; j < 9; j++) {
        baris.push(board_string[i + j]);
      }
      this.boardELement.push(baris);
    }
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    let str = '';
    for (let i = 0; i < 9; i++) {
      if (i === 0 || i % 3 === 0)
        str += "\n--------------------------------\n";
      for (let j = 0; j < 9; j++) {
        if ((j + 1) % 3 === 0 && j !== 8) {
          str += ' ' + this.boardELement[i][j] + ' | ';
        } else {
          str += ' ' + this.boardELement[i][j] + ' ';
        }
      }
      if ((i + 1) % 3 !== 0)
        str += "\n"
      if (i === 8)
        str += "\n--------------------------------\n";
    }
    return str;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('./set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()

console.log(game.board())

"use strict"

class Sudoku {
  constructor(board_string) {
    this.grid = board_string;
    this.saver = this.create_board(this.grid);
    // this.emptycell = this.checkempty(this.saver)
    this.board = [];
  }

  solve() {}

  // Returns a string representing the current state of the board
  create_board(grid) {
    let papan = []
    let k = 0
    for (let i = 0; i < 9; i++) {
      let temp = [];
      for (let j = 0; j < 9 && k < 81; j++) {
        temp.push(parseInt(grid[k]))
        k++
      }
      papan.push(temp)
    }
    this.board = papan
    let kotak = this.board
    return kotak
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

console.log(game.create_board(board_string))

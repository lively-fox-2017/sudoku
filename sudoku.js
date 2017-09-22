"use strict"

class Sudoku {
  constructor(board_string) {
    this.grid = board_string;
    this.saver = this.create_board(this.grid);
    // this.emptycell = this.checkempty(this.saver)
    this.board = [];
  }

  solve() {
    let kotak = this.create_board(this.grid)
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (kotak[i][j] == 0) {
          for (var k = 1; k < 10; k++) {
            if ((this.checkRow(i, k) && this.checkCol(j, k) && this.checkBox(i, j, k))) {
              kotak[i][j] = k;
            } 
          }
        }
      }

    }
    this.board = kotak;
    return this.board;
  }

  // Returns a string representing the current state of the board
  create_board() {
    let papan = []
    let k = 0
    for (let i = 0; i < 9; i++) {
      let temp = [];
      for (let j = 0; j < 9 && k < 81; j++) {
        temp.push(parseInt(this.grid[k]))
        k++
      }
      papan.push(temp)
    }
    this.board = papan
    let kotak = this.board
    return kotak
  }

  checkRow(row, value) { // mengecek posisi yang available
    for (var i = 0; i < 9; i++) {
      if (this.board[row][i] == value) { // kalau ketemu angka yang sama dianggapnya false
        return false;
      }
    }
    return true;
  }

  checkCol(col, value) { // mengecek posisi yang available
    for (var i = 0; i < 9; i++) {
      if (this.board[i][col] == value) {// kalau ketemu angka yang sama dianggapnya false
        return false;
      }
    }
    return true;
  }

  checkBox(row, col, value) {
    // pertama tentukan dulu sudutnya
    var colcorner = 0, rowcorner = 0;
    // kalau row yang masuk masih disekitar boxnya, masih bisa dicek
    // kalo enggak boxnya digeser
    while (row >= rowcorner + 3) {
      rowcorner += 3;
    }
    // yang kolom juga sama kayak yang row
    while (col >= colcorner + 3) {
      colcorner += 3;
    }

    for (var i = rowcorner; i < rowcorner + 3; i++) {
      // cek masing-masing boxnya kayak biasa
      for (var j = colcorner; j < colcorner + 3; j++) {
        // aturannya sama kayak yang cek row dan colomn
        if (this.board[i][j] == value) {
          return false;
        }
      }
    }
    return true;
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

console.log(game.solve())
// console.log(game.checkBox(1,1,1));
// console.log(game.checkBox(1,1,2));
// console.log(game.checkBox(1,1,3));
// console.log(game.checkBox(1,1,4));
// console.log(game.checkBox(1,1,5));
// console.log(game.checkBox(1,1,6));
// console.log(game.checkBox(1,1,7));
// console.log(game.checkBox(1,1,8));
// console.log(game.checkBox(1,1,9));
// console.log(game.board)

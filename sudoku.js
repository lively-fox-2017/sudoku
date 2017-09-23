"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardStr = board_string;
    this.boardSave = [];
  }

  solve() {
    let empty = this.checkEmpty();
    let limit = 9;
    for(let i = 0; i < empty.length;) {
      debugger
      let row = empty[i][0];
      let col = empty[i][1];
      let value = this.boardSave[row][col] + 1;
      let found = false;
      while(found == false && value <= limit) {
        if(this.checkRow(row, value) && this.checkCol(col, value) && this.checkSquare(col, row, value)){
          found = true;
          this.boardSave[row][col] = value;
          i++;
        }else{
          value++;
        }
      }
      if(found == false) {
        this.boardSave[row][col] = 0;
        i--;
      }
    }
    return this.boardSave;
  }

  // Returns a string representing the current state of the board
  board() {
    let arrBoard = this.boardStr.split('');
    for (var i = 0; i < 9; i++) {
      let row = []
      for (var j = 0; j < 9; j++) {
        row.push(parseInt(arrBoard[j]));
      }
      arrBoard.splice(0, 9);
      this.boardSave.push(row);
    }
    return this.boardSave;
  }

  checkRow(row, value) {
    for (var i = 0; i < this.boardSave.length; i++) {
      if(this.boardSave[row][i] == value){
        return false
      }
    }
    return true
  }

  checkCol(col, value) {
    for (var i = 0; i < this.boardSave.length; i++) {
      if(this.boardSave[i][col] == value){
        return false
      }
    }
    return true
  }

  checkSquare(col, row, value) {
    col = Math.floor(col/3) * 3
    row = Math.floor(row/3) * 3
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(this.boardSave[row+i][col+j] == value){
          return false;
        }
      }
    }
    return true;
  }

  checkEmpty() {
    let limit = 9;
    let empty = []
    for (var i = 0; i < limit; i++) {
      for (var j = 0; j < limit; j++) {
        if(this.boardSave[i][j] === 0){
          empty.push([i, j]);
        }
      }
    }
    return empty;
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
console.log('Board Game');
console.log(game.board())
console.log('\nSolve Game');
console.log(game.solve()) // masih ngaco

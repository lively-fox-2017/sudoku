"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string=board_string,
    this.board_sudoku=[]
  }
  cekEmpty(){
    let empty=[];
    for (var r = 0; r < this.board_sudoku.length; r++) {
      for (var c = 0; c < this.board_sudoku[r].length; c++) {
        if (this.board_sudoku[r][c]==0){
          empty.push([r,c])
        }
      }
    }
    return empty;
  }
  isValidPlace(row,col,value){
    //cek row
    for (var i = 0; i < this.board_sudoku[row].length; i++) {
      // console.log('--'+this.board_sudoku[row][i]);
      if (this.board_sudoku[row][i]==value) {
        return false;
      }
    }
    //cek col
    for (var i = 0; i < this.board_sudoku.length; i++) {
      // console.log('----'+this.board_sudoku[i][col]);
      if (this.board_sudoku[i][col]==value){
        return false;
      }
    }
    //cek 3x3
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        // console.log('------'+this.board_sudoku[r+row-row%3][c+col-col%3]);
        if (this.board_sudoku[r+row-row%3][c+col-col%3]==value) {
          return false;
        }
      }
    }
    // console.log('ree');
    return true;
  }
  solve() {
    let empty=this.cekEmpty(),row,col,found,value;
    // console.log(empty);
    for (var i = 0; i < empty.length;) {
      // console.log(i);
      row=empty[i][0];
      col=empty[i][1];
      value=this.board_sudoku[row][col]+1;
      found=false;
      while (!found && value<=9) {
        if (this.isValidPlace(row,col,value)) {
          this.board_sudoku[row][col]=value;
          found=true;
          i++;
        } else {
          value++;
        }
      }
      if (!found) {
        this.board_sudoku[row][col]=0;
        i--;
      }
    }
    return this.board_sudoku;
  }

  // Returns a string representing the current state of the board
  board() {
    let r=0;
    for (var i = 0; i < 9; i++) {
      this.board_sudoku.push([]);
      for (var j = 0; j < 9; j++) {
        this.board_sudoku[i].push(Number(this.board_string[r]));
        r++;
      }
    }
    return this.board_sudoku;
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
console.log('sudoku to solve');
console.log(game.board())
console.log('sudoku solved');
console.log(game.solve());

"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.board = [],
    this.cekEmptyPos = [];
  }
 


  // Returns a string representing the current state of the board
  papan() {
    
    
    // let k = 0;
    // for (var  i = 0; i  < 9; i++){
    //   let tmp = [];
    //   console.log(tmp)
    //   for(var j = 0; j < 9 && k < 81; j++){
    //   tmp.push(parseInt(grid[k]));
    //   k++
    //   }
    //   this.board.push(tmp);
    // }
    // let board = this.board;
    // return board
    let newArr = this.board_string.split('');
    

   
    for (var i = 0; i < newArr.length; i++) {
      this.board.push(newArr.splice(0, 9));
    }
  
    return this.board;
  }

  cekEmpty() {
    //cek tiap angka nol di papan
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] == '0') {
          this.cekEmptyPos.push([i, j]);
        }
      }
    }
    return this.cekEmptyPos;
  }

  Cek_row(row, value) {
    //console.log(this.board.length)
    for (var i = 0; i < this.board[row].length; i++) {
      // debugger
      if (this.board[row][i] == value) {
        return false;
      }
    }
    return true;
  }
  Cek_col(col, value) {
    //console.log(this.board.length)
    for (var i = 0; i < this.board.length; i++) {
      // debugger
      if (this.board[i][col] == value) {
        return false;
      }
    }

    return true;
  }

  Cek_3X3(row, col, value) {

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        
        if (this.board[(i + row) - (row % 3)][(j + col) - (col % 3)] == value) {
          return false;
        }
      }
    }
    return true;
  }


  checkValue(col, row, value) {
    if (this.Cek_row(row, value) && this.Cek_col(col, value) &&
      this.Cek_3X3(row, col, value)) {
      return true;
    } else {
      return false;
    }
  }

  solve() {
    let row, col, status, value;
    this.cekEmpty();
    // console.log(this.cekEmptyPos.length) 
    for (var i = 0; i < this.cekEmptyPos.length;) {
      debugger
      
      row = this.cekEmptyPos[i][0]
      col = this.cekEmptyPos[i][1]
      value = +this.board[row][col] + 1
      //console.log(value);
      status = false;

      for (var j = value; j <= 9; j++) {
        // console.log(this.checkValue(col, row, value))
        if (this.checkValue(col, row, value) === true) {
          this.board[row][col] = value.toString();
          status = true
          i++
          break;
        } else {
          value++
        }
      }
      if (!status) {
        this.board[row][col] = 0;
        i--
      }
    }
    return this.board;
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


console.log(game.papan(9))
 //console.log(game.Cek_row(0,2))
// console.log(game.Cek_col(1,3))
// console.log(game.Cek_3X3(0, 0, 1))
// console.log(game.Cek_3X3(0, 0, 2))
// console.log(game.Cek_3X3(0, 0, 3))
// console.log(game.Cek_3X3(0, 0, 4))
// console.log(game.Cek_3X3(0, 0, 5))
// console.log(game.Cek_3X3(0, 0, 6))
// console.log(game.Cek_3X3(0, 0, 7))
// console.log(game.Cek_3X3(0, 0, 8))
// console.log(game.Cek_3X3(0, 0, 9))
console.log('------------------------------------------------------')
console.log(game.solve())
//console.log(game.cekEmpty());
//console.log(game.checkValue(1,2,4))
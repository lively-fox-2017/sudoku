"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.arr = [];
    this.arrEmpty = [];
  }

  // checkCon(){

  // }
  checkEmpty(){
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length; j++) {
        if (this.arr[i][j] == 0) {
          this.arrEmpty.push([i, j]);
        }
      }
    }
    return this.arrEmpty;
  }

  solve() {
    this.checkEmpty();
    let i, row, col, check, nilai;
    
    for (i = 0; i < this.arrEmpty.length;) {
     
      row = this.arrEmpty[i][0];
      col = this.arrEmpty[i][1];
      nilai = Number(this.arr[row][col]) + 1;
      check = false;
      

      while (!check && nilai <= 9) {
        if (this.cekBaris(nilai, row) && this.cekKolom(nilai, col) && this.cekRegion(nilai, row, col)) {
          check = true;
          this.arr[row][col] = nilai.toString();
          i++;
        } else {
          nilai++;
        }
      }

      if (!check) {
        this.arr[row][col] = 0;
        i--;
      }


    }

   return this.arr;
  }

  // Returns a string representing the current state of the board
  board() {
    // this.board_string = this.board_string;
    let board = this.board_string.split("");
    for (let i = 0; i < board.length; i++) {
      this.arr.push(board.splice(0, 9));
    }
    return this.arr;
  }
  cekBaris(angka, baris) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[baris][i] == angka) {
        return false;
      }
    }
    return true;


  }
  cekKolom(angka, kolom) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i][kolom] == angka) {
        return false;
      }
    }
    return true;
  }

  cekRegion(angka, baris, kolom) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.arr[(i + baris) - (baris % 3)][(j + kolom) - (kolom % 3)] == angka) {
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


game.board();
console.log(game.solve());



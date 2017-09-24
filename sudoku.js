"use strict"

class Sudoku {
  constructor(board_string) {
    this.papan = board_string
    this.box = []
    this.kosong = []
  }

  solve() {

  }

  // Returns a string representing the current state of the board
  board() {
    // let pisah = this.papan.split("")
    let count = 0


    for (let i = 0; i < 9; i++) {
      // let papan2 = pisah.splice(0,9)
        let temp = []
      for (let j = 0; j < 9; j++) {
          temp.push(parseInt(this.papan[count]))
          count++
      }
      this.box.push(temp)
    }
    // console.log(this.box.length + '---- ini kehed');
    return this.box
  }

  simpanKosong() {
    // var arrKosong = []

    for (var i = 0; i < this.box.length; i++) {
      for (var j = 0; j < this.box[i].length; j++) {
        if (this.box[i][j] == 0) {
          this.kosong.push([i,j])
        }
      }
    }
    // console.log(this.kosong + '-=--------------------');
    return this.kosong
  }

  cekBaris(row,value) {
    console.log(this.box[0][0] + ' ---- ini baris ');
    for(let i = 0; i < this.box[row].length; i++) {
      if(this.box[row][i] == value) {
        return false + ' ----> ini cek baris'
      } else if (this.box[row][i] != value) {
        return true + ' ----> ini cek baris'
      }
    }
  }

  cekKolom(column,value) {
    for (let i = 0; i < this.box.length; i++) {
      if (this.box[i][column] == value) {
        // console.log(value);
        return false + ' ----> ini cek kolom'
      }else if(this.box[i][column] != value) {
        return true + ' ----> ini cek kolom'
      }
    }
  }

  cek3x3(column, row, value) {
    var columnCorner = 0
    var rowCorner = 0
    var squareSize = 3

    while(column >= columnCorner + squareSize) {
      columnCorner = columnCorner + squareSize
    }

    while(row >= rowCorner + squareSize) {
      rowCorner = rowCorner + squareSize
    }

    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      for (let j = columnCorner; j < columnCorner + squareSize; j++) {
        if (this.box[i][j] == value) {
          return false
        }
      }
    }
    return true
  }

  cekNilai(column,row,value) {
    //console.log(column,row,value);
    if(this.cekBaris(row,value) && this.cekKolom(column,value) &&
    this.cek3x3(column,row,value)) {
      return true
    } else {
      return false
    }
  }

  solveSudo() {
    // console.log(this.kosong);
    // return this.kosong.length
    this.simpanKosong()
    let kosongnya = this.kosong
    console.log(kosongnya);
    console.log(kosongnya[0][1]);
    let row,column,value,found
    // console.log(this.kosong[0]);
    // return this.kosong[1]
    for (var i = 0; i < kosongnya.length;) {
      // console.log(i);
      // console.log(kosongnya.length + ' ini panjang length');
      // console.log(kosongnya);
      console.log(row + ' -----> ini row');
      console.log(column + ' -----> ini coloumn');
      row = kosongnya[i][0]
      column = kosongnya[i][1]
      value = this.box[row][column] + 1
      found = false

      for (var j = value; j <= 9; j++) {
        value = j;
        if (this.cekNilai(column,row,value)) {
          this.box[row][column] = value
          found = true
          i++;
          break;
        } else {
          value = value + 1
        }
      }
      if(!found) {
        this.box[row][column] = 0
        i = i - 1
      }
    }
    this.box.forEach(function(row) {
      console.log(row.join());
    })
    return this.box
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
// game.solve()
// game.cekBaris(1,4)
// game.cekKolom(1,0)
console.log(game.board())
// console.log(game.simpanKosong());
console.log(game.solveSudo());
// console.log(game.cek3x3(0,1,3));
// console.log(game.simpanKosong());
// console.log(game.cekBaris(0,3));
// console.log(game.cekKolom(1,3));
// console.log(game.cekKolom(2,4));

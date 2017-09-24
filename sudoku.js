"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string;
    this.arrBoard = []
    this. isi = ''
    this.nolPosition = []
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    var tempBoard = this.boardString.split('')
    var boardLenght = tempBoard.length;


    for(let i = 0; i , tempBoard.length; i++){
      this.arrBoard.push(tempBoard.splice(0,9));
    }

    return this.arrBoard

  }

  cekColumn(column,value){
    for(let i = 0; i < this.arrBoard.length; i++){
        let cek = this.arrBoard[column][i]
        // console.log(''+cek);
        if (value === cek){
          return false
        }
    }

    return true
  }

  cekRow(row, value){
    for(let i = 0; i < this.arrBoard.length; i++){
        let cek = this.arrBoard[i][row]
        // console.log(''+cek);
        if (value === cek){
          return false
        }
    }

    return true
  }

  cekMatrix(column,row, value){

    var columnCorner = 0
    var  rowCorner = 0
    var  matrix3x3 = 3

  // cari di kolom kiri Find the left-most column
  while(column >= columnCorner + matrix3x3) {
    columnCorner += matrix3x3;
  }

  // cari di baris atasnya Find the upper-most row
  while(row >= rowCorner + matrix3x3) {
    rowCorner += matrix3x3;
  }

  // looping tiap baris
  for(var i = rowCorner; i < rowCorner + matrix3x3; i++) {
    // looping tiap kolom
    for(var j = columnCorner; j < columnCorner + matrix3x3; j++) {
      // jika ditemukan
      if(this.arrBoard[i][j] === value) {
        return false;
      }
    }
  }
  // jika tidak ditemukan
  return true;
  }

  cekValue(column, row, value){
    if(this.cekColumn(column,value) && this.cekRow(row, value) && this.cekMatrix(column,row, value)){
      return true
    } else {
      return false
    }
  }

  isiMatrixKosong(){
    for (let i = 0; i < this.arrBoard.length; i++){
      for(let j = 0; j< this.arrBoard.length; j++){
        if(this.arrBoard[i][j]==='0'){
          this.nolPosition.push([i,j])
        }
      }
    }
    return this.nolPosition
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

console.log(game.board())
console.log('--------------------------------------');
console.log(game.cekColumn(3,'2'))
console.log(game.cekColumn(0,'7'))
console.log('--------------------------------------');
console.log(game.cekRow(5,'2'))
console.log(game.cekRow(1,'6'))
console.log('--------------------------------------');
console.log(game.cekMatrix(3,5,'2'))
console.log('--------------------------------------');
console.log(game.cekValue(3,5,'9'));
console.log('--------------------------------------');
console.log(game.isiMatrixKosong());

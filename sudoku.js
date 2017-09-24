"use strict"

class Sudoku {
  constructor(board_string) {
  	this.num=board_string;
  	this.number=[1,2,3,4,5,6,8,9];
  }

  solve() {
    let board = this.board()
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (board[i][j]==0) {
          for (var k = 0; k < this.number.length; k++) {
            if (this.cekValue(i, j, this.number[k])) {
              board[i][j] = this.number[k]
            }
          }
        }
      }
    }
    return board
  }
  // Returns a string representing the current state of the board
  board() {
    let board=[];
  	let arrSplit = this.num.split('')
    let arrNum = arrSplit.map(function (x) {
      return parseInt(x)
    })
  	for(let i=0; i<arrNum.length; i++){
  		board.push(arrNum.splice(0,9))
  	}

    return board
  }

  cekHorizontal(row, angka) {
    let baris = this.board()
  	for(let i=0; i<baris[row].length; i++){
  		if(baris[row][i]==angka){
  			return false
  		}
  	}
    return true
  }

  cekVertikal(col, angka){
    let kolom = this.board()
  	for(let i=0; i<kolom[col].length; i++){
  		if(kolom[i][col]==angka){
  			return false
  		}
  	}
    return true
  }

  cekArea(row, col, angka){
    let area = this.board()
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(area[(i+row)-(row%3)][(j+col)]-[(col%3)]===angka){
          return false
        }
      }
    }
    return true
  }

  cekValue(row, col, angka){
    if(this.cekHorizontal(row, angka) &&
      this.cekVertikal(col, angka) &&
      this.cekArea(row, col, angka)) {
      return true
    }
    return false
  }

  cekEmpty(){
    let board = this.board()
    let indeksNol=[]
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (board[i][j]==0) {
          indeksNol.push([i,j])
        }
      }
    }
    return indeksNol
  }

  backtrack(){
    this.cekEmpty()
    let indeksNol = this.cekEmpty()
    let board = this.board()
    //variabel untuk tracking posisi solver

    let limit = 10,
        row, col, value, found;
      //console.log(indeksNol.length);
    for (var i = 0; i < indeksNol.length;) {
      // console.log(i);
      row = indeksNol[i][0]
      col = indeksNol[i][1]
      value = board[row][col]+1
      found = false;

      while(!found && value < limit) {
        if (this.cekValue(row, col, value)) {
          found = true;
          board[row][col] = value;
          i++;
        }else {
          value++;
        }
      }

      if (!found) {
        board[row][col] = 0
        i++
      }
    }
    return board
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
// console.log(game.board());
//console.log(game.cekHorizontal(0, 5));
//console.log(game.solve())
//console.log(game.cekVertikal(0, 5));
console.log(game.backtrack());

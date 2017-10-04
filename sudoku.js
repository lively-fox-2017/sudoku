"use strict"

class Sudoku {
  constructor(board_string) {}

  solve(){

  }

  // Returns a string representing the current state of the board
  board(){
    let arr = []
    let split = board_string.split('')
    let reg = new RegExp(',', 'g')
    for(let i = 0; i < 9; i++){
      let div = split.splice(0, 9)
      arr.push(div)
    }
    return arr
    // .join('\n').replace(reg, ' | ')
  }

  // [ 
  // [ '1', '0', '5', '8', '0', '2', '0', '0', '0' ], * 1
  // [ '0', '9', '0', '0', '7', '6', '4', '0', '5' ], * 2
  // [ '2', '0', '0', '4', '0', '0', '8', '1', '9' ], * 3
  // [ '0', '1', '9', '0', '0', '7', '3', '0', '6' ], * 4
  // [ '7', '6', '2', '0', '8', '3', '0', '9', '0' ], * 5
  // [ '0', '0', '0', '0', '6', '1', '0', '5', '0' ], * 6
  // [ '0', '0', '7', '6', '0', '0', '0', '3', '0' ], * 7
  // [ '4', '3', '0', '0', '2', '0', '5', '0', '1' ], * 8
  // [ '6', '0', '0', '3', '0', '8', '9', '0', '0' ]  * 9
                                              //   ]

  // ========= /ARRAY =========
  // 1 | 0 | 5 | 8 | 0 | 2 | 0 | 0 | 0 * 1
  // 0 | 9 | 0 | 0 | 7 | 6 | 4 | 0 | 5 * 2
  // 2 | 0 | 0 | 4 | 0 | 0 | 8 | 1 | 9 * 3
  // 0 | 1 | 9 | 0 | 0 | 7 | 3 | 0 | 6 * 4
  // 7 | 6 | 2 | 0 | 8 | 3 | 0 | 9 | 0 * 5
  // 0 | 0 | 0 | 0 | 6 | 1 | 0 | 5 | 0 * 6
  // 0 | 0 | 7 | 6 | 0 | 0 | 0 | 3 | 0 * 7
  // 4 | 3 | 0 | 0 | 2 | 0 | 5 | 0 | 1 * 8
  // 6 | 0 | 0 | 3 | 0 | 8 | 9 | 0 | 0 * 9

  // * 1 => lakukan pengecekan dimana semua kolom di baris pertama itu ada angka yang sama atau tidak
  // * 1 => lakukan pengecekan dimana semua baris dalam 1 kolom atau juga yang disebut vertikal itu ada angka yang sama atau tidak
  // * 1 => lakukan pengecekan dimana pada kolom index 0 - 3 di baris pertama, baris kedua dan baris ketiga. jika ada yang sama maka kembalikan nilai false, dan kembalikan nilai true jika tidak ada yang sama

  checkCol(){
    for(let i = 0; i < this.board().length; i++){
      // console.log(this.board()[0][i+1] + 'ini kolom')
      if(this.board()[0][i] && this.board(0)[i+1] != 0 || this.board()[1][i] && this.board()[1][i+1] != 0 || this.board()[2][i] && this.board()[2][i+1] != 0 || this.board()[3][i] && this.board()[3][i+1] != 0 || this.board()[4][i] && this.board()[4][i+1] != 0 || this.board()[5][i] && this.board()[5][i+1] != 0 || this.board()[6][i] && this.board()[6][i+1] != 0 || this.board()[7][i] && this.board()[7][i+1] != 0 || this.board()[8][i] && this.board()[8][i+1] != 0){
        return true
      }else{
        return false
      }
    }
  }

  checkRow(){
    for(let i = 0; i < this.board()[0].length; i++){
      if(this.board()[0][i] !== 0){
        return true
      }else{
        return false
      }
    }
  }

  // => cek kolom dari index ke 0 - 2 di baris pertama, kedua dan ketiga
  // 1 | 0 | 5 | 8 | 0 | 2 | 0 | 0 | 0 * 1 [0]
  // 0 | 9 | 0 | 0 | 7 | 6 | 4 | 0 | 5 * 2 [1]
  // 2 | 0 | 0 | 4 | 0 | 0 | 8 | 1 | 9 * 3 [2]
  // 0 | 1 | 9 | 0 | 0 | 7 | 3 | 0 | 6 * 4 [3]
  // 7 | 6 | 2 | 0 | 8 | 3 | 0 | 9 | 0 * 5 [4]
  // 0 | 0 | 0 | 0 | 6 | 1 | 0 | 5 | 0 * 6 [5]
  // 0 | 0 | 7 | 6 | 0 | 0 | 0 | 3 | 0 * 7 [6]
  // 4 | 3 | 0 | 0 | 2 | 0 | 5 | 0 | 1 * 8 [7]
  // 6 | 0 | 0 | 3 | 0 | 8 | 9 | 0 | 0 * 9 [8]
  // 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  check3x3(){
    // console.log(this.board()[0].splice(0, 3))
    console.log(this.board()[0].splice(0, 3))
    console.log(this.board()[0][3].splice(0, 3))
    console.log(this.board()[0].splice(0, 3))
    for(let i = 0; i < this.board().length; i++){
      if(this.board()[0].splice(0, 3) != 0 || this.board()[1].splice(0, 3) != 0 || this.board()[2].splice(0, 3) != 0){
        return 'ini if pertama ' + true
      }else if(this.board()[0][3].splice(0, 3) != 0 || this.board()[1][3].splice(0, 3) != 0 || this.board()[2][3].splice(0, 3) != 0){
        return 'ini if kedua ' + true
      }else if(this.board()[0][6].splice(0, 3) != 0 || this.board()[1][6].splice(0, 3) != 0 || this.board()[2][6].splice(0, 3) != 0){
        return 'ini if ketiga ' + true
      }else if(this.board()[3].splice(0, 3) != 0 || this.board()[4].splice(0, 3) != 0 || this.board()[5].splice(0, 3) != 0){
        return 'ini if keempat ' + true
      }else if(this.board()[3][3].splice(0, 3) != 0 || this.board()[4][3].splice(0, 3) != 0)
    }

    // console.log(this.board()[0][3])
    // for(let j = 0; j < this.board().length; j++){
    //   if(this.board()[0].splice(0, 3) != 0 || this.board()[4].splice(0, 3) != 0 || this.board()[5].splice(0, 3) != 0){
    //     return true
    //   }else{
    //     return false
    //   }
    // }

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

// console.log(game.board())
// console.log(game.checkCol())
// console.log(game.checkRow())
console.log(game.check3x3())

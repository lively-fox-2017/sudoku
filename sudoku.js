"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.arr = []
    this.cVer = true
    this.cHor = true
  }

  new() {
    let i = 0
    for (let r = 0; r < 9; r++) {
      let arrRow = []
      for (let c = 0; c < 9; c++) {
        arrRow.push(Number(this.board_string[i]))
        i++
      }
      this.arr.push(arrRow)
    }
  }

  c_horizontal() { //dibuang sayang
    for (let r = 0; r < 9; r++) {
      let cRow = []
      for (let c = 0; c < 9; c++) {
        if (this.arr[r][c] != 0) {
          if (cRow.indexOf(this.arr[r][c]) == -1) {
            cRow.push(Number(this.arr[r][c]))
          } else {
            this.cHor = false
          }
        }
      }
    }
  }

  c_vertical() { //dibuang sayang
    for (let c = 0; c < 9; c++) {
      let cCol = []
      for (let r = 0; r < 9; r++) {
        if (this.arr[r][c] != 0) {
          if (cCol.indexOf(this.arr[r][c]) == -1) {
            cCol.push(Number(this.arr[r][c]))
          } else {
            this.cVer = false
          }
        }
      }
    }
  }

  c_row(row) {
    row -= 1
    let arrRow = []
    let cek = true
    for (let c = 0; c < 9; c++) {
      if (this.arr[row][c] != 0) {
        if (arrRow.indexOf(this.arr[row][c]) == -1) {
          arrRow.push(Number(this.arr[row][c]))
        } else {
          cek = false
        }
      }
    }
    return cek
  }

  c_col(col) {
    col -= 1
    let arrCol = []
    let cek = true
    for (let r = 0; r < 9; r++) {
      if (this.arr[r][col] != 0) {
        if (arrCol.indexOf(this.arr[r][col]) == -1) {
          arrCol.push(Number(this.arr[r][col]))
        } else {
          cek = false
        }
      }
    }
    return cek
  }

  c_reg(row, col) {
    let cek = true

    let reg = [
      [11, 12, 13, 21, 22, 23, 31, 32, 33],
      [14, 15, 16, 24, 25, 26, 34, 35, 36],
      [17, 18, 19, 27, 28, 29, 37, 38, 39],

      [41, 42, 43, 51, 52, 53, 61, 62, 63],
      [44, 45, 46, 54, 55, 56, 64, 65, 66],
      [47, 48, 49, 57, 58, 59, 67, 68, 69],

      [71, 72, 73, 81, 82, 83, 91, 92, 93],
      [74, 75, 76, 84, 85, 86, 94, 95, 96],
      [77, 78, 79, 87, 88, 89, 97, 98, 99]
    ]

    let xy = Number(String(row) + String(col))
    let cArr = []
    let iReg = 0
    for (let i = 0; i < 9; i++) { //check region position
      if (reg[i].indexOf(xy) != -1) {
        iReg = i
        break
      }
    }

    for (let j = 0; j < 9; j++) { //validate region
      let pos = this.arr[Number(String(reg[iReg][j])[0]) - 1][Number(String(reg[iReg][j])[1]) - 1]
      if (pos != 0) {
        if (cArr.indexOf(Number(pos)) == -1) {
          cArr.push(Number(pos))
        } else {
          cek = false
        }
      }
    }
    return cek
  }

  solve() {
    let arrO = []
    let back = false
    for (let r = 0; r < 9; r++) { //save 0 position
      for (let c = 0; c < 9; c++) {
        let posO = []
        let valO = []
        if (this.arr[r][c] == 0) {
          posO = []
          valO = []
          posO.push(r)
          posO.push(c)
          valO.push(this.arr[r][c])
          valO.push(posO)
          arrO.push(valO)
        }
      }
    }

    let i = 0
    let x = 1
    while (i < arrO.length) {
      let r = arrO[i][1][0]
      let c = arrO[i][1][1]

      if (arrO[i][0] == 10) {
        arrO[i][0] = 0
        this.arr[r][c] = 0
        i--
        if (i == -1) {
          return 'Solve not found'
        }
        r = arrO[i][1][0]
        c = arrO[i][1][1]
        x = arrO[i][0] + 1
      }

      for (let num = x; num <= 10; num++) {
        arrO[i][0] = num
        this.arr[r][c] = num
        if (game.c_row(r + 1) && game.c_col(c + 1) && game.c_reg(r + 1, c + 1) && num < 10) {
          i++
          x = 1
          break
        }
      }
    }
  }


  // Returns a string representing the current state of the board
  board() {
    console.log('-'.repeat(21));
    for (let r = 0; r < 9; r++) {
      let rBoard = ''
      for (let c = 0; c < 9; c++) {
        rBoard += this.arr[r][c] + ' '
        if ('25'.indexOf(c) != -1) {
          rBoard += '| '
        }
      }
      console.log(rBoard);
      if ('258'.indexOf(r) != -1) {
        console.log('-'.repeat(21));
      }
    }
    return '-----Sudoku Game-----'
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
game.new()
console.log('------New Board------');
console.log(game.board())

console.log()
console.log();;

game.solve()
console.log('----Solved Board-----');
console.log(game.board())

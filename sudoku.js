'use strict'

class Sudoku {
  constructor(board_string) {
    this.string = board_string;
    this.box = [];
  }

  printBoard() {
    let a = 0;
    for (let i = 0; i < 9; i++) {
      this.box[i] = [];
      for (let j = 0; j < 9; j++) {
        this.box[i][j] = Number(this.string[a]);
        a++;
      }
    }
    // console.log(this.box);
    return this.box;
  }

  checkLine(sudoBoard, line, nilai) {
    for (let i = 0; i < sudoBoard[line].length; i++) {
      if (sudoBoard[line][i] === nilai)
      return false;
    }
    return true;
  }

  checkColl(sudoBoard, kolom, nilai) {
    for (let i = 0; i < sudoBoard.length; i++) {
      if (sudoBoard[i][kolom] === nilai)
      return false;
    }
    return true;
  }

  checkBox3x3(sudoBoard, kolom, line, nilai) {
    let firstLine = 0;
    let firstColl = 0;
    let bigBox = 3;

    while (kolom >= firstColl + bigBox) {
      firstColl += bigBox;
    }

    while (line >= firstLine + bigBox) {
      firstLine += bigBox;
    }

    for (let i = firstLine; i < firstLine + bigBox; i++) {
      for (let j = firstColl; j < firstColl + bigBox; j++) {
        if (sudoBoard[i][j] === nilai)
        return false;
      }
    }
    return true;
  }

  checkAll(sudoBoard, kolom, line, nilai) {
    if (this.checkLine(sudoBoard, line, nilai) && this.checkColl(sudoBoard, kolom, nilai) && this.checkBox3x3(sudoBoard, kolom, line, nilai)) {
      return true;
    } else {
      return false;
    }
  }

  solve(sudoBoard, posisiKosong) {
    let limit = 9;
    let total = 0;

    for (let i = 0; i < posisiKosong.length;) {
      let line = posisiKosong[i][0];  //0
      let kolom = posisiKosong[i][1];  //1
      let nilai = sudoBoard[line][kolom] + 1;
      let find = false;

      while (!find && nilai <= 9) {
        total++;
        if (this.checkAll(sudoBoard, kolom, line, nilai)) {
          find = true;
          sudoBoard[line][kolom] = nilai;
          i++;
        }

        else {
          nilai++;
        }
      }

      if (!find) {
        sudoBoard[line][kolom] = 0;
        i--;
      }
    }

    console.log(sudoBoard);
  }

  checkEmpty() {
    let emptyArray = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.box[i][j] === '0' || this.box[i][j] === 0)
        emptyArray.push([i, j]);
      }
    }

    return emptyArray;
  }

  backtrack() {
    let sudoBoardSelesai = this.printBoard();
    let posisiKosongs = this.checkEmpty();
    return this.solve(sudoBoardSelesai, posisiKosongs);
  }
}

// Returns a string representing the current state of the board

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]

var board_string = '005030081902850060600004050007402830349760005008300490150087002090000600026049503';
var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
// game.printBoard()
game.backtrack();

// console.log(game.printBoard());

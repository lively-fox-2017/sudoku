"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardELement = [];
    for (let i = 0; i < 9; i++) {
      let baris = [];
      for (let j = 0; j < 9; j++) {
        baris.push(board_string[i * 9 + j]);
      }
      this.boardELement.push(baris);
    }
  }

  rowCheck(x) {
    let element = {
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 1,
      '8': 1,
      '9': 1,
    }

    for (let i = 0; i < 9; i++) {
      element[this.boardELement[x][i]]--;
      if (element[this.boardELement[x][i]] < 0)
        return false;
    }
    return true;
  }

  colCheck(x) {
    let element = {
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 1,
      '8': 1,
      '9': 1,
    }

    for (let i = 0; i < 9; i++) {
      element[this.boardELement[i][x]]--;
      if (element[this.boardELement[i][x]] < 0)
        return false;
    }
    return true;
  }

  initWindow(x, y) {
    let init = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    let baris = [];
    let kolom = [];

    for (let i = 0; i < init.length; i++) {
      if (init[i].indexOf(x) !== -1) {
        baris = init[i];
      }
      if (init[i].indexOf(y) !== -1) {
        kolom = init[i];
      }
    }
    return [baris, kolom];
  }

  windowCheck(x, y) {
    let element = {
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 1,
      '8': 1,
      '9': 1,
    }
    let areaWindow = this.initWindow(x, y);
    for (let i = 0; i < areaWindow[0].length; i++) {
      for (let j = 0; j < areaWindow[1].length; j++) {
        element[this.boardELement[areaWindow[0][i]][areaWindow[0][j]]]--;
        if (element[this.boardELement[areaWindow[0][i]][areaWindow[0][j]]] < 0)
          return false;
      }
    }
    return true;
  }

  initNumber() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.boardELement[i][j] == 0) {
          for (let k = 1; k <= 10; k++) {
            this.boardELement[i][j] = k;
            if (k !== 10) {
              if (this.rowCheck(i) && this.colCheck(j) && this.windowCheck(i, j)) {
                break;
              }
            } else {
              this.boardELement[i][j] = 0;
            }
          }
        }
      }
    }
  }

  solve() {

  }

  // Returns a string representing the current state of the board
  board() {
    let str = '';
    for (let i = 0; i < 9; i++) {
      if (i === 0 || i % 3 === 0)
        str += "\n--------------------------------\n";
      for (let j = 0; j < 9; j++) {
        if ((j + 1) % 3 === 0 && j !== 8) {
          str += ' ' + this.boardELement[i][j] + ' | ';
        } else {
          str += ' ' + this.boardELement[i][j] + ' ';
        }
      }
      if ((i + 1) % 3 !== 0)
        str += "\n"
      if (i === 8)
        str += "\n--------------------------------\n";
    }
    return str;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('./set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
console.log(game.board());
game.initNumber();
console.log(game.board());

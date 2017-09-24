"use strict"
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

class Sudoku {
  constructor(board_string) {
    this.boardFill = board_string;
    this.sudoBoard = [];
    this.generateBoard();
    this.sudoInColumn = [];
    this.sudoInRegion = [];
    this.index0 = [];
  }
  generateBoard() {
    for (var i = 0; i < 81; i += 9) {
      var temp = [];
      for (var j = 0; j < 9; j++) {
        temp.push(this.boardFill[j + i]);
      }
      this.sudoBoard.push(temp);
    }
  }
  checkSetOfArr(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== "0") {
        for (var j = 0; j < arr.length; j++) {
          if (i == j) {
            continue;
          }
          if (arr[i] === arr[j]) {
            return false;
          }
        }
      }
    }
    return true;
  }
  solve(index = 0) {
    if (index === this.index0.length) {
      return true;
    }
    if (this.findAnother0(this.sudoBoard)) {
      return true;
    }
    for (var k = 1; k < 10; k++) {
      this.sudoBoard[this.index0[index][0]][this.index0[index][1]] = k.toString();
      this.getAll();
      if (this.checkAll()) {
        if (this.solve(index + 1)) {
          return true;
        }
      }
    }
    this.sudoBoard[this.index0[index][0]][this.index0[index][1]] = '0';
    return false;
  }

  // Returns a string representing the current state of the board
  board() {
    var result = "---------------------\n";
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        result += this.sudoBoard[i][j] + ' ';
        if ((j + 1) % 3 === 0 && j !== 8) {
          result += '| ';
        }
      }
      result += '\n';
      if ((i + 1) % 3 === 0 && i !== 8) {
        result += "---------------------\n";
      }
    }
    return result;
  }

  getAll() {
    this.sudoInColumn = [];

    for (var i = 0; i < this.sudoBoard.length; i++) {
      var temp = [];
      for (var j = 0; j < this.sudoBoard.length; j++) {
        temp.push(this.sudoBoard[j][i]);
      }
      this.sudoInColumn.push(temp);
    }

    this.sudoInRegion = [];
    var row = 3;
    var col = 3;
    while (row < 12) {
      while (col < 12) {
        var currentRow = row - 3;
        var currentCol = col - 3;
        var temp = [];
        for (var j = 0; j < 3; j++) {
          for (var i = 0; i < 3; i++) {
            temp.push(this.sudoBoard[currentRow][currentCol]);
            currentCol++;
          }
          currentRow++;
          currentCol -= 3;
        }
        this.sudoInRegion.push(temp);
        col += 3;
      }
      row += 3;
      col = 3;
    }
  }
  findAnother0(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (arr[i][j] === '0') {
          return false;
        }
      }
    }
  }
  find0(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (arr[i][j] === '0') {
          this.index0.push([i, j]);
        }
      }
    }
    return true;
  }
  checkAll() {
    var booleanHasil = true;
    for (var i = 0; i < this.sudoBoard.length; i++) {
      if (!this.checkSetOfArr(this.sudoInColumn[i])) {
        booleanHasil = false;
        break;
      }
      if (!game.checkSetOfArr(this.sudoInRegion[i])) {
        booleanHasil = false;
        break;
      }
      if (!this.checkSetOfArr(this.sudoBoard[i])) {
        booleanHasil = false;
        break;
      }
    }
    return booleanHasil
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var data = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n");

var data2 = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n");

for (var i = 0; i < data.length-1; i++) {
  console.log(i);
  console.log("BEFORE");
  var board_string = data[i];
  var game = new Sudoku(board_string);
  // Remember: this will just fill out what it can and not "guess"
  console.log(game.board());
  game.getAll();
  game.find0(game.sudoBoard);
  game.solve();
  console.log("AFTER");
  console.log(game.board());

}
suite.add('Sudoku set - 01', function() {
  // for (var i = 0; i < data.length-1; i++) {
    // console.log(i);
    // console.log("BEFORE");
    var board_str = data[0];
    var sudoBench1 = new Sudoku(board_str);
    // Remember: this will just fill out what it can and not "guess"
    // console.log(game.board());
    sudoBench1.getAll();
    sudoBench1.find0(sudoBench1.sudoBoard);
    sudoBench1.solve();
    // console.log("AFTER");
    // console.log(game.board());

  // }
  })
  .add('Sudoku set - 02', function(){
    // for (var i = 0; i < data2.length-1; i++) {
      // console.log(i);
      // console.log("BEFORE");
      var board_str = data2[0];
      var sudoBench2 = new Sudoku(board_str);
      // Remember: this will just fill out what it can and not "guess"
      // console.log(game.board());
      sudoBench2.getAll();
      sudoBench2.find0(sudoBench2.sudoBoard);
      sudoBench2.solve();
      // console.log("AFTER");
      // console.log(game.board());

    // }
  })
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });

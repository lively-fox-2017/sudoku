"use strict"

class Sudoku {
  constructor(board_string) {
    this.grid = board_string
    this.board = [];
  }


  createBoard (grid) {
    let k = 0
  	for (let i = 0; i < 9; i++) {
      let temp = [];
  		for (let j = 0 ; j < 9 && k < 81; j++) {
  			temp.push(parseInt(grid[k]));
        k++;
  		}
      this.board.push(temp);
  	}
    let board = this.board;
  	return board;
  }


    solveSudoku(grid = this.createBoard(this.grid) , row = 0, col = 0) {
      var cell = this.findUnassignedLocation(grid, row, col);
      //menemukan apakah kondisi sudah terpenuhi
      row = cell[0];
      col = cell[1];

      // base case: if no empty cell  
      if (row == -1) {
          console.log("solved");
          console.log(grid)
          return true;
      }

      for (var num = 1; num <= 9; num++) {

          if ( this.noConflicts(grid, row, col, num) ) {   
              grid[row][col] = num;

              if ( this.solveSudoku(grid, row, col) ) {                
                  return true;
              }

              // tandain cell kosong dengan 0    
              grid[row][col] = 0;
          }
      }
      return false
  }


  findUnassignedLocation(grid, row, col) {
      var done = false;
      var res = [-1, -1];

      while (!done) {
          if (row == 9) {
              done = true;
          } else if(grid[row][col] == 0) {
                  res[0] = row;
                  res[1] = col;
                  done = true;
              } else if(col < 8) {
                      col++;
              } else {
                  row++;
                  col = 0;
              }
      }
      return res;
  }

  noConflicts(grid, row, col, num) {
      return this.checkRow(grid, row, num) && this.checkCol(grid, col, num) && this.checkBox(grid, row, col, num);
  }

  checkRow(grid, row, num) {
      for (var col = 0; col < 9; col++)
          if (grid[row][col] == num)
              return false;

      return true;
  }
  checkCol(grid, col, num) {
      for (var row = 0; row < 9; row++)
      if (grid[row][col] == num)
          return false;

      return true;    
  }
  checkBox(grid, row, col, num) {
      row = Math.floor(row / 3) * 3;
      col = Math.floor(col / 3) * 3;
      //v = row, h = col
      for (var v = 0; v < 3; v++)
          for (var h = 0; h < 3; h++)
              if (grid[row + v][col + h] == num)
                  return false;

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
game.solveSudoku()

// console.log(game.board())

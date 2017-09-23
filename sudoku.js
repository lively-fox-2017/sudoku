"use strict"

/**
 *
 * Sudoku Solver
 *
 */

class Sudoku {

  constructor(unsolvedBoardString) {

    // Unsolved board string, you know, with zeros on 'em
    this.unsolvedBoardString = unsolvedBoardString;
    this.sudokuArray = [];
    this.solvedList = [];
    this.unsolvedList = [];

  }

  /**
   *
   * init()
   *
   * Converting this.unsolvedBoardString to an
   * array of numbers (this.sudokuArray)
   *
   */

  init() {

    let fetchNine = [];

    // Loop through this.unsolvedBoardString to get single characters
    // and add a comma per 9 characters
    for (let i = 0; i < this.unsolvedBoardString.length; i++) {

      fetchNine.push(parseInt(this.unsolvedBoardString[i]));

      if ((i + 1) % 9 === 0) {

        // Push to this.sudokuArray
        this.sudokuArray.push(fetchNine);

        // Reset fetchNine
        fetchNine = [];

      }

    }

  }

  /**
   *
   * findZeros(array, row, column)
   *
   * Find 0, if exist, return true
   *
   */

  findZeros() {

    // Rows
    for (let row = 0; row < this.sudokuArray.length; row++) {

      // Cols
      for (let col = 0; col < this.sudokuArray[row].length; col++) {

        if (this.sudokuArray[row][col] === 0) {

          return true;

        }

      }

    }

    return false;

  }

  /**
   *
   * checkRow(rowNumber, toFind)
   *
   * Check if the number's already in this row
   *
   * If yes, return true
   * If no, return false
   *
   */

  checkRow(rowNumber, toFind) {

    let arr = this.sudokuArray[rowNumber];

    // Checking, if found, return true
    if (arr.indexOf(toFind) !== -1)
      return true;

    return false;

  }


  /**
   *
   * checkCol(colNumber, toFind)
   *
   * Check if the number's already in this column
   *
   * If yes, return true
   * If no, return false
   *
   */

  checkCol(colNumber, toFind) {

    let arr = this.sudokuArray;
    let newArr = [];

    // Generate arr
    for (let i = 0; i < arr.length; i++) {

      newArr.push(arr[i][colNumber]);

    }

    // Checking, if found, return true
    if (newArr.indexOf(toFind) !== -1)
      return true;

    return false;

  }

  /**
   *
   * check3x3Box(boxNumber, toFind)
   *
   * Check if the number's already in this 3x3 box
   *
   * If yes, return true
   * If no, return false
   *
   */
  check3x3Box(boxNumber, toFind) {

    let arr3x3 = [];

    let start = 0;

    let loop = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

    if (boxNumber >= 0 && boxNumber < 3)
      start = 0;
    else if (boxNumber >= 3 && boxNumber < 6)
      start = 3;
    else if (boxNumber >= 6 && boxNumber < 9)
      start = 6;

    for (let i = start; i < (start + 3); i++) {

      for (let j = 0; j < 3; j++) {

        arr3x3.push(this.sudokuArray[i][loop[boxNumber - start][j]]);

      }

    }

    // Checking, if found, return true
    if (arr3x3.indexOf(toFind) !== -1)
      return true;

    return false;

  }

  /**
   *
   * generateBoxNumber(row, col)
   *
   * Generate box number for checking on this.solve()
   *
   */

  generateBoxNumber(row, col) {

    if (row >= 0 && row < 3) {

      if (col >= 0 && col < 3)
        return 0;
      else if (col >= 3 && col < 6)
        return 1;
      else if (col >= 6 && col < 9)
        return 2;

    } else if (row >= 3 && row < 6) {

      if (col >= 0 && col < 3)
        return 3;
      else if (col >= 3 && col < 6)
        return 4;
      else if (col >= 6 && col < 9)
        return 5;

    } else if (row >= 6 && row < 9) {

      if (col >= 0 && col < 3)
        return 6;
      else if (col >= 3 && col < 6)
        return 7;
      else if (col >= 6 && col < 9)
        return 8;

    }

  }

  /**
   *
   * solve()
   *
   * Function to solve the Sudoku
   * Returns TRUE or FALSE
   *
   */

  solve() {

    let boxNumber = 0;

    // Rows
    for (let row = 0; row < this.sudokuArray.length; row++) {

      // Cols
      for (let col = 0; col < this.sudokuArray[row].length; col++) {

        boxNumber = this.generateBoxNumber(row, col);

        // Trying to assign value of (1..9)
        for (let value = 1; value <= 9; value++) {

          // If it's 0, assign value
          if (this.sudokuArray[row][col] === 0) {

            // If passed the checkers (checkRow(), checkCol(), and check3x3Box())
            if ((!this.checkRow(row, value)) && (!this.checkCol(col, value)) && (!this.check3x3Box(boxNumber, value))) {

              this.sudokuArray[row][col] = value;

              this.solvedList.push([row, col]);

            }

          }

        }

        // If it's still 0, push it to this.unsolvedList
        if (this.sudokuArray[row][col] === 0) {

          this.unsolvedList.push([row, col]);

        }

      }

    }

    return 0;

  }

  /**
   *
   * board()
   *
   * Returns formatted output of this.sudokuArray (string)
   *
   */

  board() {

    let output = '';

    // Generate output
    for (let i = 0; i < this.sudokuArray.length; i++) {

      // Start dash
      if (i === 0)
        output += ' -------------------------------\n';

      for (let j = 0; j < this.sudokuArray.length; j++) {

        output += ' ' + this.sudokuArray[i][j] + ' ';

        if (((j + 1) % 3 === 0) && (j < this.sudokuArray[i].length - 1))
          output += ' | '

      }

      output += '\n';

      if (((i + 1) % 3 === 0) && (i < this.sudokuArray.length - 1))
        output += ' -------------------------------\n';

      // End dash
      if (i === this.sudokuArray.length - 1)
        output += ' -------------------------------';

    }

    return output;

  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];

let test = '105802000090076405200400819019007306762083090000061050007600030430020501600308900';

var game = new Sudoku(test);

// Convert unsolved string to array
game.init();


// Solve the game
game.solve();

console.log(game.board());

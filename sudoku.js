"use strict"

/**
 *
 * Sudoku Solver, input type: String
 *
 */

class Sudoku {

  constructor(unsolvedBoardString) {

    // Unsolved board string, you know, with zeros on 'em
    this.unsolvedBoardString = unsolvedBoardString;
    this.sudokuArray = [];

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
   * findZeros(arr, row, col)
   *
   * Find 0, if exist, return true
   *
   */

  findZeros(arr, row, col) {

    // Variable to inform it's done or not yet
    let done = false;

    // Variable to store result of finder
    let result = [-1, -1];

    while (!done) {

      // row 9 = last row
      if (row === 9) {

        done = true;

      } else {

        if (arr[row][col] === 0) {

          result[0] = row;
          result[1] = col;

          // Zero value found!
          done = true;

        } else {

          if (col < 8) {

            // Increment col by 1
            col += 1;

          } else {

            // Increment row by 1
            row += 1;
            col = 0;

          }

        }

      }

    }

    return result;

  }

  /**
   *
   * checkRow(arr, row, toFind)
   *
   * Check if the number's already in this row
   *
   * If yes, return true
   * If no, return false
   *
   */

  checkRow(arr, row, toFind) {

    for (let col = 0; col < 9; col++) {

      if (arr[row][col] === toFind) {

        return false;

      }

    }

    return true;

  }


  /**
   *
   * checkCol(arr, col, toFind)
   *
   * Check if the number's already in this column
   *
   * If yes, return true
   * If no, return false
   *
   */

  checkCol(arr, col, toFind) {

    for (let row = 0; row < 9; row++) {

      if (arr[row][col] === toFind) {

        return false;

      }

    }

    return true;

  }

  /**
   *
   * check3x3Box(arr, row, col, toFind)
   *
   * Check if the number's already in this 3x3 box
   *
   * If yes, return true
   * If no, return false
   *
   */
  check3x3Box(arr, row, col, toFind) {

    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    // r = row
    // c = col
    for (let r = 0; r < 3; r++) {

      for (let c = 0; c < 3; c++) {

        if (arr[row + r][col + c] === toFind) {

          return false;

        }

      }

    }

    return true;

  }

  /**
   *
   * validator(arr, row, col, value)
   *
   * Validating row, column, and 3x3 box
   * Returns TRUE if valid
   *
   */

  validator(arr, row, col, value) {

    return this.checkRow(arr, row, value) && this.checkCol(arr, col, value) && this.check3x3Box(arr, row, col, value);

  }

  /**
   *
   * solve(row, col)
   *
   * Function to solve the Sudoku
   * Returns TRUE or FALSE
   *
   */

  solve(row = 0, col = 0) {

    let cell = this.findZeros(this.sudokuArray, row, col);

    row = cell[0];
    col = cell[1];

    // If no empty cell
    if (row === -1) {

      return true;

    }

    // Try assign a number, between 1 to 9
    for (let num = 1; num <= 9; num++) {

      if (this.validator(this.sudokuArray, row, col, num)) {

        this.sudokuArray[row][col] = num;

        if (this.solve(row, col)) {

          return true;

        }

        // Mark cell as 0 (unassigned)
        this.sudokuArray[row][col] = 0;

      }

    }

    // Backtracking
    return false;

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

    let dash = ' -------------------------------\n';

    // Start dash
    output += dash;

    // Generate output
    for (let i = 0; i < this.sudokuArray.length; i++) {

      for (let j = 0; j < this.sudokuArray.length; j++) {

        output += ' ' + this.sudokuArray[i][j] + ' ';

        if (((j + 1) % 3 === 0) && (j < this.sudokuArray[i].length - 1))
          output += ' | '

      }

      output += '\n';

      if (((i + 1) % 3 === 0) && (i < this.sudokuArray.length - 1))
        output += dash;

    }

    // End dash
    output += dash;

    return output;

  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');

var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n");

// Loop all sample, (length - 1, because there's a newline at EOF)
for (let i = 0; i < board_string.length - 1; i++) {

  let game = new Sudoku(board_string[i]);

  console.log('Sample', i + 1);

  // Convert unsolved string to array
  game.init();


  // Solve the game
  game.solve();

  console.log(game.board());

}


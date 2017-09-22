"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardFill = board_string;
    this.sudoBoard = [];
    this.generateBoard();
  }
  generateBoard() {
    for (var i = 0; i < 81; i+=9) {
      var temp = [];
      for (var j = 0; j < 9;j++){
        temp.push(this.boardFill[j+i]);
      }
      this.sudoBoard.push(temp);
    }
  }
  checkRow(arr){
    for(var i =0;i<arr.length;i++){
      if(arr[i] !== "0"){
        for(var j=0;j<arr.length;j++){
          if(i == j){
            continue;
          }
          if(arr[i] === arr[j]){
            return false;
          }
        }
      }
    }
    return true;
  }
  checkCol(arr){
    for(var i =0;i<arr.length;i++){
      if(arr[i] !== "0"){
        for(var j=0;j<arr.length;j++){
          if(i == j){
            continue;
          }
          if(arr[i] === arr[j]){
            return false;
          }
        }
      }
    }
    return true;
  }
  solve() {

  }

  // Returns a string representing the current state of the board
  board() {
    return this.sudoBoard;
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
game.solve()


// // Check per Row
// console.log(game.board())
// for(var i = 0;i<game.sudoBoard.length;i++){
//   console.log('baris ke-'+i+' = ',game.checkRow(game.sudoBoard[i]));
//   console.log(game.sudoBoard[i]);
// }
// // console.log(game.checkRow(game.sudoBoard[0]));


// // Check per Col
// // get Per Column
// var sudoInColumn = [];
// for(var i=0;i<game.sudoBoard.length;i++){
//   var temp = [];
//   for(var j = 0;j<game.sudoBoard.length;j++){
//     temp.push(game.sudoBoard[j][i]);
//   }
//   sudoInColumn.push(temp);
// }
// //check per col
// for(var i = 0;i<game.sudoBoard.length;i++){
//   console.log('kolom ke-'+i+' = ',game.checkCol(sudoInColumn[i]));
//   console.log(sudoInColumn[i]);
// }

// Check per Region

// get per Region

var sudoInRegion = [];
var row = 3;
var col = 3;
while(row < 12){
  while(col < 12){
    var currentRow = row -3;
    var currentCol = col -3;
    var temp = [];
    for(var j = 0;j<3;j++){
      for(var i = 0;i<3;i++){
        temp.push(game.sudoBoard[currentRow][currentCol]);
        currentCol++;
      }
      currentRow++;
      currentCol -= 3;
    }
    sudoInRegion.push(temp);
    col +=3;
  }
  row +=3;
  col = 3;
}
console.log(sudoInRegion);
// check per region

for(var i = 0;i<game.sudoBoard.length;i++){
  console.log('kolom ke-'+i+' = ',game.checkCol(sudoInRegion[i]));
  console.log(sudoInRegion[i]);
}

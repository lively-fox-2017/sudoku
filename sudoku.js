"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardFill = board_string;
    this.sudoBoard = [];
    this.generateBoard();
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
  checkRow(arr) {
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
  checkCol(arr) {
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
  checkRegion(arr) {
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
  solve() {

  }

  // Returns a string representing the current state of the board
  board() {
    return this.sudoBoard;
  }
  getAll(){

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

function getAll(){
  sudoInColumn = [];

  for(var i=0;i<game.sudoBoard.length;i++){
    var temp = [];
    for(var j = 0;j<game.sudoBoard.length;j++){
      temp.push(game.sudoBoard[j][i]);
    }
    sudoInColumn.push(temp);
  }

  sudoInRegion = [];
  var row = 3;
  var col = 3;
  while (row < 12) {
    while (col < 12) {
      var currentRow = row - 3;
      var currentCol = col - 3;
      var temp = [];
      for (var j = 0; j < 3; j++) {
        for (var i = 0; i < 3; i++) {
          temp.push(game.sudoBoard[currentRow][currentCol]);
          currentCol++;
        }
        currentRow++;
        currentCol -= 3;
      }
      sudoInRegion.push(temp);
      col += 3;
    }
    row += 3;
    col = 3;
  }
}
// // Check per Col
// // get Per Column
var sudoInColumn = [];
// //check per col
// for(var i = 0;i<game.sudoBoard.length;i++){
//   console.log('kolom ke-'+i+' = ',game.checkCol(sudoInColumn[i]));
//   console.log(sudoInColumn[i]);
// }

// Check per Region

// get per Region

var sudoInRegion = [];


//console.log(sudoInRegion);
// check per region

// for (var i = 0; i < game.sudoBoard.length; i++) {
//   console.log('kolom ke-' + i + ' = ', game.checkRegion(sudoInRegion[i]));
//   console.log(sudoInRegion[i]);
// }

  //cari 0 dari baris
  var index0 = [];
// function fill(){
//   for(var i =0;i<9;i++){
//     for(var j=0;j<9;j++){
//       if(game.sudoBoard[i][j] === '0'){
//         for(var k =1;k<10;k++){
//           game.sudoBoard[i][j] = k.toString();
//           getAll();
//           if(checkAll()){
//
//             break;
//           }
//           else{
//             game.sudoBoard[i][j] = '0';
//           }
//         }
//       }
//     }
//   }
// }

find0(game.sudoBoard);
fill(0);
console.log(game.sudoBoard);
console.log(checkAll(game.sudoBoard));
function fill(index){
  if(index===index0.length){
    return true;
  }
  if(findAnother0(game.sudoBoard)){
    return true;
  }
  for(var k =1;k<10;k++){
    game.sudoBoard[index0[index][0]][index0[index][1]] = k.toString();
    getAll();
    if(checkAll()){
      if(fill(index+1)){
        return true;
      }
    }
  }
  game.sudoBoard[index0[index][0]][index0[index][1]] = '0';
  return false;
}

function findAnother0(arr){
  for(var i =0;i<arr.length;i++){
    for(var j=0;j<arr.length;j++){
      if(arr[i][j] === '0'){
        return false;
      }
    }
  }
}

function find0(arr){
  for(var i =0;i<arr.length;i++){
    for(var j=0;j<arr.length;j++){
      if(arr[i][j] === '0'){
        index0.push([i,j]);
      }
    }
  }
  return true;
}

function checkAll(){
  var booleanHasil = true;
  for(var i =0;i<game.sudoBoard.length;i++){
    if(!game.checkCol(sudoInColumn[i])){
      booleanHasil = false;
      break;
    }
    if(!game.checkCol(sudoInRegion[i])){
      booleanHasil = false;
      break;
    }
    if(!game.checkCol(game.sudoBoard[i])){
      booleanHasil = false;
      break;
    }
  }
  return booleanHasil
}

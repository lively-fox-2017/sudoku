"use strict"

class Sudoku {
  constructor(
    board_string,
    colChecker,
    rowChecker,
    regChecker,
    searchNum,
    searchRow,
    searchRowReg,
    searchCol,
    searchColReg)
  {
    this.data = board_string;
    this.row = [];
    this.colChecker = colChecker;
    this.rowChecker = rowChecker;
    this.regChecker = regChecker;
    this.searchNum = searchNum;
    this.searchRow = searchRow;
    this.searchRowReg = searchRowReg;
    this.searchCol = searchCol;
    this.searchColReg = searchColReg;
  }

  solve() {
    this.searchNum = 1; // nanti diloop dari 0 sd 8 / Math.random
    this.searchRow = 1; // nanti diloop dari 0 sd 8
    this.searchCol = 1; // nanti diloop dari 0 sd 8
    this.searchRowReg = 2; // nanti diloop dari 0 sd 2
    this.searchColReg = 0; // nanti diloop dari 0 sd 2 

    console.log(Math.floor(Math.random()*9+1));
    var newRow = this.row.join().split(",");
    console.log(newRow);
    for(var i = 0; i < newRow.length; i++){
      if(newRow[i] === "0"){
        for(var y = 0; y < 9; y++){
          this.searchCol = y;
          this.searchRow = y;
          // for(var n = 1; n <= 9; n++){
          //   this.searchNum = n;
          //   for(var r = 0; r < 3; r++){
          //     this.searchColReg = r;
          //     this.searchRowReg = r;
          //     while(this.rowChecker === false && this.colChecker === false && this.regChecker === false){
          //       newRow[i] = Math.floor(Math.random()*9+1);
          //       console.log(newRow[i])
          //     }
          //   }
          // }
        }
      }
    }
    console.log(this.searchNum);
    console.log(this.searchColReg);
    console.log(this.searchRowReg);  
  }

  // Returns a string representing the current state of the board
  board() {
    for(var i = 0; i < 9; i++){
      var row = [];
      for(var y = 0; y < 9; y++){
        this.row.push(this.data.split("",9));
        this.data = this.data.slice(9,this.data.length);
      }
      return this.row
    }
  }

  globalRowCheck(){
    for(var i = 0; i < this.row.length; i++){
      // console.log(this.row[this.searchRow][i]);
      if(this.searchNum.toString() === this.row[this.searchRow][i]){
        return this.rowChecker = false;
      }
    }
    return this.rowChecker = true;
  }

  globalColCheck(){
    for(var i = 0; i < this.row.length; i++){
      // console.log(this.row[i][this.searchCol])
      if(this.searchNum.toString() === this.row[i][this.searchCol]){
        return this.colChecker = false;
      }
    }
    return this.colChecker = true;
  }

  regionRowCheck(){
    var arrCheck = [];
    if(this.searchRowReg === 0 && this.searchColReg === 0){
      for(var i = 0; i < 3; i++){
        arrCheck.push(this.row[i].slice([0],3));
      }
    }
    else if(this.searchRowReg === 0 && this.searchColReg < 2){
      for(var k = 0; k < 3; k++){
        arrCheck.push(this.row[k].slice([this.searchColReg*3],6));
      }
    }
    else if(this.searchRowReg < 2 && this.searchColReg === 0){
      for(var k = this.searchRowReg*3; k < this.searchRowReg*3+3; k++){
        console.log(k);
        arrCheck.push(this.row[k].slice([this.searchRowReg*3],this.searchRowReg*3+3));
      }
    }
    else if(this.searchRowReg < 2 && this.searchColReg === 0){
      for(var k = this.searchRowReg*3; k < this.searchRowReg*3+3; k++){
        console.log(k);
        arrCheck.push(this.row[k].slice([this.searchRowReg*3],this.searchRowReg*3+3));
      }
    }
    else if(this.searchRowReg === 2 && this.searchColReg === 0){
      for(var k = this.searchRowReg*3; k < this.searchRowReg*3+3; k++){
        arrCheck.push(this.row[k].slice([this.searchRowReg*3],this.searchRowReg*3+3));
      }
    }
    else if(this.searchRowReg < 2 && this.searchColReg < 2){
      for(var j = this.searchRowReg*3; j < this.searchRowReg*3*2; j++){
        arrCheck.push(this.row[j].slice([this.searchColReg*3],6));
      }
    }
    else {
      for(var n = this.searchRowReg*3; n < this.searchRowReg*3+3; n++){
        console.log(n);
        console.log(this.searchRowReg*3+3)
        arrCheck.push(this.row[n].slice([this.searchColReg*3],this.searchRowReg*3+3));
      }
    }
    console.log(arrCheck.join());
    for(var ac = 0; ac < arrCheck.length; ac++){
      // console.log(arrCheck[ac]);
      for(var bc = 0; bc < arrCheck[ac].length; bc++){
        console.log(arrCheck[ac][bc]);
        if(this.searchNum.toString() === arrCheck[ac][bc]){
          return this.regChecker = false;
        }
      }
    }
    return this.regChecker = true
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
console.log(game.board());
console.log(game.solve());
console.log(game.globalRowCheck());
console.log(game.globalColCheck());
console.log(game.regionRowCheck());
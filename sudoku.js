"use strict"

class Sudoku {
  constructor(board_string) {
  	this.string = board_string;
    this.blok=9;
    this.arr_blok=[];
    this.arr_zero=[];
  }
  board() {
  	let counter = 0;
    for(let i=0;i<this.blok;i++){
      this.arr_blok.push([]);
      for(let j=0;j<this.blok;j++){
        this.arr_blok[i].push(this.string[counter]);
        counter++;
      }
    }    
    return this.arr_blok;
  }
  get_zero(){
  	// Simpan column dan rows yang bernilai 0
	for (var col=0;col<this.blok;col++) {
	    for (var row=0;row<this.blok;row++) {
		    if (this.arr_blok[col][row]=='0') {
	      		this.arr_zero.push([col,row])
	    	}
		}
	}
	return this.arr_zero;
  }
  solve(box = 0) {
  	if(box == this.arr_zero.length){
  		return this.arr_blok;
  	}else{
  		let col = this.arr_zero[box][0];
  		let row = this.arr_zero[box][1];
  		let num = this.arr_blok[col][row];
  		while(num <= this.blok){
			if(this.cek_box(col,row,num) && this.cek_col(col,row,num) && this.cek_row(col,row,num)){
	  			this.arr_blok[col][row]=String(num)
	  			return this.solve(box+1)
	  		}else{
	  			num++
	  		}  				
  		}
  		// back track jika ada yang bendel
    	this.arr_blok[col][row] = 0;
        return this.solve(box-1);
  	}
  }
  cek_col(col,row,num){
  	// CEK COLUMN HORIZONTAL 
    for (let row=0;row < this.arr_blok.length;row++){
      if (this.arr_blok[col][row] == num) {
        return false;
      }
    }
  	return true
  }
  cek_row(col,row,num){
  	//cek ROWS VERTIKAL 
    for (let col=0;col < this.arr_blok.length;col++){
      if (this.arr_blok[col][row]==num) {
        return false;
      }
    }
  	return true
  }
  cek_box(col,row,num){
    // CEK AREA 3x3
  	for(let i=0;i < 3;i++){
  		for(let j=0;j < 3;j++){
  			if(this.arr_blok[i+col-col%3][j+row-row%3]==num){
  				return false
  			}
  		}
  	}
  	return true
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
game.board()
game.get_zero()
console.log(game.solve())



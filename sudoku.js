"use strict"

class Sudoku {
  constructor(board_string) {
	this.str = board_string.split("");
	this.arrStr = [];
  }

  solve() {
	this.board();
	
	let angka = 1;
	let arrBacktrack = [];
	for (let i = 0; i < 9; i++) {
		let j = 0;
		while (j < 9) {
			if (angka < 10) {
				if (this.arrStr[i][j] === 0) {
					let b = this.cekBaris(i, angka);
					let c = this.cekKolom(j, angka);
					let r = this.cekRegion(i, j, angka);
					if (b && c && r) {
						this.arrStr[i][j] = angka;
						arrBacktrack.push([i, j, angka]);
						angka = 1;
						j++;
					} else {
						angka++;
					}
				} else {
					j++;
				}
			} else {
				if (arrBacktrack.length !== 0) {
					let lastIndeks = arrBacktrack.length - 1;
					if(arrBacktrack[lastIndeks][2] < 10){
						angka = arrBacktrack[lastIndeks][2] + 1;
						i = arrBacktrack[lastIndeks][0];
						j = arrBacktrack[lastIndeks][1];
					}
					
					this.arrStr[i][j] = 0;
					arrBacktrack.pop();
				} else {
					console.log("\nTidak ada penyelesaian dari puzzle ini\n");
					i = 9;
					j = 9;
				}
			}
		}
	}
	
	// Untuk nampilin perkotak;
	for (let i = 0; i < this.arrStr.length; i++) {
		for (let j = 0; j < this.arrStr.length; j++) {
			if (j === 3 || j === 7) {
				this.arrStr[i].splice(j,0,"|");
			}
			
			if (i === 2 && j === 8 || i === 5 && j === 8) {
				this.arrStr[i].push("\n")
			}
		}
		this.arrStr[i] = this.arrStr[i].join(" ");
	}
	
	console.log(this.arrStr.join("\n"));
  }

  // Returns a string representing the current state of the board
  board() {
	for (let row = 0; row < 9; row++) {
		let arrTemp = [];
		for (let col = 0; col < 9; col++) {
			arrTemp.push(parseInt(this.str[col]));
		}
		this.arrStr.push(arrTemp);
		this.str.splice(0, 9);
	}
	
	return this.arrStr;
  }
  
  cekBaris(baris, angka) {
	if(this.arrStr[baris].indexOf(angka) === -1) {
		return true;
	}
	
	return false;
  }
  
  cekKolom(kolom, angka) {
	
	for (let i = 0; i < this.arrStr.length; i++){
		if (this.arrStr[i][kolom] === angka) {
			return false;
		}
	}
	
	return true;
  }
  
  cekRegion(baris, kolom, angka){
	
	// Region 1
	if (baris < 3 && kolom < 3 ) {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (this.arrStr[row][col] === angka) {
					return false;
				}
			}
		}
		
		return true;
	}
	// Region 2
	else if (baris < 3 && kolom < 6) {
		for (let row = 0; row < 3; row++) {
			for (let col = 3; col < 6; col++) {
				if (this.arrStr[row][col] === angka) {
					return false;
				}
			}
		}
		
		return true;
	}
	// Region 3
	else if (baris < 3 && kolom < 9) {
		for (let row = 0; row < 3; row++) {
			for (let col = 6; col < 9; col++) {
				if (this.arrStr[row][col] === angka) {
					return false;
				}
			}
		}
		
		return true;
	}
	// Region 4
	else if (baris < 6 && kolom < 3) {
		for (let row = 3; row < 6; row++) {
			for (let col = 0; col < 3; col++) {
				if (this.arrStr[row][col] === angka) {
					return false;
				}
			}
		}
		
		return true;
	}
	// Region 5
	else if (baris < 6 && kolom < 6) {
		for (let row = 3; row < 6; row++) {
			for (let col = 3; col < 6; col++) {
				if (this.arrStr[row][col] === angka) {
					return false;
				}
			}
		}
		
		return true;
	}
	// Region 6
	else if (baris < 6 && kolom < 9) {
		for (let row = 3; row < 6; row++) {
			for (let col = 6; col < 9; col++) {
				if (this.arrStr[row][col] === angka) {
					return false;
				}
			}
		}
		
		return true;
	}
	// Region 7
	else if (baris < 9 && kolom < 3) {
		for (let row = 6; row < 9; row++) {
			for (let col = 0; col < 3; col++) {
				if (this.arrStr[row][col] === angka) {
					return false;
				}
			}
		}
		
		return true;
	}
	// Region 8
	else if (baris < 9 && kolom < 6) {
		for (let row = 6; row < 9; row++) {
			for (let col = 3; col < 6; col++) {
				if (this.arrStr[row][col] === angka) {
					return false;
				}
			}
		}
		
		return true;
	}
	// Region 9
	else if (baris < 9 && kolom < 9) {
		for (let row = 6; row < 9; row++) {
			for (let col = 6; col < 9; col++) {
				if (this.arrStr[row][col] === angka) {
					return false;
				}
			}
		}
		
		return true;
	}
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
game.solve();

"use strict"

class Sudoku {
  constructor(board_string) {
  	this.board_board = []
  	this.kosong = []
  	
  }

  solve(angka) {
  	let nilai = [1,2,3,4,5,6,7,8,9]
  	this.cekDataNol()
  	// console.log(this.kosong)

 	for(var i = 0; i < this.board_board.length; i++){
  		for(var j = 0; j <= i; j++){
  			if(+this.board_board[i][j] === 0 ){
  				for(var k = 0; k < nilai.length; k++){
  					if(this.cekKolom(nilai[k], i) && this.cekBaris(nilai[k], j) && this.cekArea(nilai[k] ,i, j)){
 						this.board_board[i][j] = nilai[k].toString()
  					}
  				}
  			}
  		}
  	}
  	// var limit = 9, i, row, column, value, found
  	// for(i = 0; i < this.kosong.length;){
  	// 	row = this.kosong[i][0]
  	// 	column = this.kosong[i][1]

  	// 	value = this.board_board[row][column] + 1
  	// 	found = false

  	// 	while(!found && value <= limit){
  	// 		if(this.cekDataNol())
  	// 	}
  	// }
  	
  	return this.board_board



  	// console.log(this.kosong.length)
  	
  	// return this.board_board

  	// for(var i = 0; i < )

  	// return this.board_board
  }

  data_board(){
  	let posisi = 9;
  	let arr = this.board_board
  	
  	for(var i = 0; i < board_string.length; i+=9){
  		let bagan = '';  		// console.log(i +' ' +posisi )
  		bagan = board_string.slice(i, posisi)
  		arr.push(bagan.split(''))
  		posisi += 9;
  	}
  	
  	return arr

  }

  

  // Returns a string representing the current state of the board
  board() {
  	let arr = this.board_board
	let sumBagan = 9;

	for(var i = 0; i < board_string.length; i+=9){
		let bagan = ''
		let baganArr = []
		let atas = 3, bawah = 0 
		bagan = board_string.slice(i, sumBagan)

		for(var j = 0; j < bagan.length; j+=3){
			baganArr.push(' ', bagan.slice(bawah, atas), ' ','|')
			// console.log(j +' '+sum)
			// console.log(bagan.length)
			atas +=3
			bawah +=3
		}
		baganArr.pop()
		sumBagan += 9
		arr.push(baganArr)
	}

	for(var i = 0; i < arr.length; i+=4){
		

			arr.splice(i, 0 ,[' ---------------'])
	}
	
	arr.push([' ---------------'])

	
	let arrSudo = '';

	for(var i = 0; i < arr.length; i++){

		arrSudo += arr[i].join('') + '\n'
	}
	// let arr1 = arr[1].join('')
	return arrSudo
  }

  cekKolom(cari , kolom){
  	  	return this.board_board[kolom].indexOf(cari.toString()) === -1 ? true : false
  }

  cekBaris(cari, baris){
  	let data = ''

  	for(var i = 0; i < this.board_board[baris].length; i++){
  		data += this.board_board[i][baris]
  	}
  	// console.log(data)
  	// console.log(data.indexOf(cari.toString()))
  	return data.indexOf(cari.toString()) === -1 ? true : false

  }

  cekArea(angka, baris, kolom){
  	
  	// if(area === 1){
  	// 	for(var i = 0; i < 3;i++){
  	// 		for(var j = 0; j < 3; j++){
  	// 			if(this.board_board[i][j] === angka.toString()){
  	// 				return true
  	// 			}
  	// 		}
  	// 	}
  	// 	return false
  	// }

  	let arr = ''	

  	for(var i = 0; i < 3; i++){
  		// console.log(baris+i)
  		for(var j = 0; j < 3; j++){
  			// console.log(baris%3)
  			// console.log(this.board_board[(baris+i)-(baris%3)][(kolom+j)-(kolom%3)])
  			arr += this.board_board[(baris+i)-(baris%3)][(kolom+j)-(kolom%3)]
  			
  		}

  	}
  	// return arr
  	// console.log(arr)
  	return arr.indexOf(angka.toString()) === -1 ? true : false
  		
  }




cekDataNol(){
  	// var kosong = []
  	for(var i = 0; i < this.board_board.length; i++){
  		for(var j = 0; j < this.board_board[i].length; j++){
  			if(+this.board_board[i][j] === 0){
  				this.kosong.push([i, j])

  			}
  		}
  	}
  	return this.kosong
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

console.log(game.data_board())
console.log('\n')
// console.log(game.cekDataNol())
// console.log(game.cekKolom(1, 1))

// console.log(game.cekArea(4,0,3))

console.log(game.solve())

// console.log(game.cekBaris(1, 0))

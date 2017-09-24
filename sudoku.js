"use strict"

class Sudoku {
  constructor(board_string) {
    //Ambil isi data board_string yang diambil dari file dan tampung di "this.box"
    this.box = board_string
    //Buat tampung kosong = []
    this.array = []
    this.arrKosong = []
  }


  // Returns a string representing the current state of the board
  board() {
    //buat counter untuk index yang dimasukan dari angka 0
    let count = 0;
    //Buat perulangan dari 0 sampai 8
    for (var i = 0; i < 9; i++) {
      //buat variabel tampung = []
      let temp = [];
      //Buat perulangan dimana kondisi :  j < 9 && counter < 81
      for (var j = 0; j < 9; j++) {
        //this.box masih dalam bentuk 'string' maka diubah menjadi 'integer'
        temp.push(parseInt(this.box[count]))
        //counter bertambah
        count++;
      }
      //tampung di push isi dari temp untuk jadi nested array
      this.array.push(temp)
    }
    // kemudian di tampung di variabel 'board'
    // let board = this.array;
    return this.array;
  }
// ====================================CEK BARIS=======================================
//bentuk baris membutuhkan 2 parameter [baris][kolom] sehingga yang kita cek adalah si isi barisnya
  cekBaris(baris, value) {
    //kita looping array baris berdasarkan panjangnya yaitu = 9 (0,8)
    for (let i = 0; i < this.array[baris].length; i++) {
      //kita tes apakah di baris yang sudah kita tentukan sudah berisikan angka value targetnya ?
      if (this.array[baris][i] === value) {
        //jika ada maka dia false
        return false
      }
    }
    //jika belum masih true
    return true
  }
// ======================================CEK KOLOM==============================================
//bentuk kolom membutuhkan 2 parameter [baris][kolom] sehingga yang kita cek adalah si isi kolomnya
  cekKolom(kolom,value){
    //kita looping kolom berdasarkan kolomnya yaitu 9 (0-8)
    for (let i = 0; i < this.array[kolom].length; i++) {
      //jika nilai pada kolom dan baris ditemukan targetnya
      if(this.array[i][kolom] === value){
        //Maka dia false
        return false
      }
    }
    // Jika tidak masih true
    return true
  }

// =================================CEK AREA 3X3===========================================
//bentuk area membutuhkan 3 parameter yaitu baris,kolom dan value
  cekArea(baris,kolom,value){
    // perulangan pertama untuk mengambil index "Baris"
    for (var i = 0; i < 3; i++) {
      //perulangan kedua untuk mengambil index "Kolom"
      for (var j = 0; j < 3; j++) {
        //misal [(0+0)-(0%3)] [(0+0)-(0%3)]
        // hasilnya this.array[0][0] == 2
        // console.log('ini i = '+i);
        // console.log('ini baris = '+(i+baris))
        // console.log('ini I = '+[(i+baris)-(baris%3)]);
        // console.log('ini J = '+[(j+kolom)-(kolom%3)]);
        if(this.array[(i+baris)-(baris%3)][(j+kolom)-(kolom%3)]===value){
          return false
        }
      }
    }
    return true
  }

  cariNol(){
    for (var i = 0; i < this.array.length; i++) {
      for (var j = 0; j < this.array.length; j++) {
        if(this.array[i][j] === 0){
          this.arrKosong.push([i,j])
        }
      }
    }
  }

  isiNol(){
    this.cariNol()
    let indexNol = this.arrKosong;
    let row,kol,dapat,num;
    // console.log('panjang index '+indexNol.length);
    // let random = Math.ceil(Math.random()*9);
    for (var i = 0; i < indexNol.length;) {
      // console.log('--ini row'+row);
      // console.log('--ini kol'+kol);
      row = indexNol[i][0]
      kol = indexNol[i][1]
      // console.log(row);
      //nambahin value
      num = this.array[row][kol]+1
      dapat=false;
      for (var j = num; j <= 9; j++) {
        num = j
        if(this.cekBaris(row, num) && this.cekKolom(kol,num) && this.cekArea(row,kol,num) === true){
          this.array[row][kol] = num
          dapat=true;
          i++;
          break;
        }
      }
      if (!dapat) {
        this.array[row][kol] = 0
        dapat=false;
        i--;
      }
    }
    return this.array
  }
}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt').toString().split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
console.log(game.board())
// console.log(game.cekBaris(0,2))
// console.log(game.cekKolom(0,2))
// console.log(game.cekArea(0,0,5))
// console.log(game.cariNol(0,1,3))
console.log(game.isiNol())
// console.log(game.board())

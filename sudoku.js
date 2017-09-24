"use strict"

class Sudoku {
  constructor(board_string) {
    this.data = board_string;
    this.pembanding = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.row = [];
    this.kosong = [];

  }

  solve() {
    // let data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // for (let y = 0; y < this.row.length; y++) {
    //   for (let x = 0; x < this.row.length; x++) {
    //     if (this.row[y][x] == 0) {
    //       // for (let d = 0; d < data.length; d++) {
    //       data.forEach(function (element) {
    //         // console.log(element);
    //         if (this.cekRow(y, element) && this.cekCol(x, element) && this.cekTengah(y, x, element)) {
    //           this.row[y][x] = element;
    //         }
    //       }, this);
    //       // console.log(this.cekRow(element, y) && this.cekCol(element, x) && this.cekTengah(element, y, x));

    //       // if (this.cekRow(y, data[d]) && this.cekCol(x, data[d]) && this.cekTengah(y, x, data[d])) {
    //       //   this.row[y][x] = data[d];
    //       // }
    //       // }
    //     }
    //   }

    // }
    // return this.row;
    this.cekKosong();
    let batas = 9,
      row, col, nilai, ditemukan;
    // console.log(this.kosong);
    for (let g = 0; g < this.kosong.length;) {
      row = this.kosong[g][0];
      col = this.kosong[g][1];
      //coba nilai selanjutnya
      // console.log(this.row[row][col] + 1);
      nilai = Number(this.row[row][col]) + 1;
      //setting default false
      ditemukan = false;
      //coba beberapa nilai hingga mencapai batas
      //jika ketemu
      while (!ditemukan && nilai <= batas) {
        //jika ditemukan ubah ke true
        //ubah ke nilai
        //posisi selanjutnya
        // if (this.solve(row, col, nilai))
        if (this.cekRow(row, nilai) && this.cekCol(col, nilai) && this.cekTengah(row, col, nilai)) {
          ditemukan = true;
          this.row[row][col] = nilai.toString();
          g++;
        } else {
          //jika tidak ada coba nilai selanjutnya
          nilai++;
        }
      }
      //jika nilai tidak sesuai dan melebihi batas maka kembali keposisi sebelumnya
      if (!ditemukan) {
        this.row[row][col] = 0;
        g--
      }
    }
    return this.row;
  }

  // Returns a string representing the current state of the board
  board() {
    let abc = this.data.split('');
    for (let y = 0; y < 9; y++) {
      this.row.push(abc.splice(0, 9));
    }
    // console.log(this.row);
    return this.row;
  }

  cekRow(rowNumber, search) {
    let row = this.row[rowNumber];
    // console.log(row);
    // console.log(row.indexOf(search.toString()));
    return (row.indexOf(search.toString()) === -1) ? true : false;
  }
  cekCol(colNumber, search) {
    let data = '';
    for (let a = 0; a < 9; a++) {
      data += this.row[a][colNumber];
    }
    return (data.indexOf(search.toString()) === -1) ? true : false;
  }

  cekTengah(rowNumber, colNumber, search) {
    let kaliTiga = '';
    for (let b = 0; b < 3; b++) {
      for (let c = 0; c < 3; c++) {
        // console.log(this.row[(b + rowNumber) - (rowNumber % 3)][(c + colNumber) - (colNumber % 3)]);
        kaliTiga += this.row[(b + rowNumber) - (rowNumber % 3)][(c + colNumber) - (colNumber % 3)];
      }
    }
    // console.log(kaliTiga.indexOf(search.toString()) === -1);
    return (kaliTiga.indexOf(search.toString()) === -1) ? true : false;
  }
  cekKosong() {
    for (var e = 0; e < this.row.length; e++) {
      for (var f = 0; f < this.row.length; f++) {
        if (this.row[e][f] === '0') {
          this.kosong.push([e, f]);
        }
      }
    }
    return this.kosong;
  }
  backTrack() {

  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)

// let fs = require('fs');
// let fs = Promise.promisifyAll(require('fs'));
// readFile = Promise.promisify(fs.readFile);
// let board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0];
// let game = new Sudoku(board_string);

let game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900');

// // Remember: this will just fill out what it can and not "guess"


console.log(game.board());
// console.log(game.cekKosong());
console.log(game.solve());
// console.log(game.backTrack());
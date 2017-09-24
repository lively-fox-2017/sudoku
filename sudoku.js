"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.papan = [];
    this.posisiNull = [];
  }

  solve() {

  }

  // Returns a string representing the current state of the board
  board() {
    let pisah = this.board_string.split('');
    let papan = [];
    for (let i = 0; i < pisah.length; i++) {
      this.papan.push(pisah.splice(0, 9));
    }
    return this.papan;
  }

  koordinatNull() {
    for (let i = 0; i < this.papan.length; i++) {
      for (let j = 0; j < this.papan[i].length; j++) {
        if (this.papan[i][j] == 0) {
          this.posisiNull.push([i, j]);
        }
      }
    }
    return this.posisiNull;
  }

  cekBaris(baris, nilai) {
    for (let i = 0; i < this.papan.length; i++) {
      if (this.papan[baris][i] == nilai) {
        return false;
      }
    }
    return true;
  }

  cekKolom(kolom, nilai) {
    for (let i = 0; i < this.papan.length; i++) {
      if (this.papan[i][kolom] == nilai) {
        return false;
      }
    }
    return true;
  }

  cekArea3x3(baris, kolom, nilai) {
    // Menyimpan pojok kiri atas dari papan 3x3
    let pojokBaris = 0,
        pojokKolom = 0,
        ukuranPapan = 3;

    // Mencari baris paling atas
    while (baris >= pojokBaris + ukuranPapan) {
      pojokBaris += ukuranPapan;
    }

    // Mencari kolom paling kiri
    while (kolom >= pojokKolom + ukuranPapan) {
      pojokKolom += ukuranPapan;
    }

    // Looping baris kolom
    for (let i = pojokBaris; i < pojokBaris + ukuranPapan; i++) {
      for (let j = pojokKolom; j < pojokKolom + ukuranPapan; j++) {
        if (this.papan[i][j] == nilai) {
          return false;
        }
      }
    }
    return true;
  }

  cekSemua() {
    if (this.cekBaris() && this.cekKolom && cekArea3x3) {
      return true;
    } else {
      return false;
    }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];
// var board_string = '105802000'
// var board_string = '105802005'

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
// game.solve();

console.log(game.board());
// console.log(game.koordinatNull());
console.log(game.cekBaris(0, 1));
console.log(game.cekKolom(0, 2));
console.log(game.cekArea3x3(0, 2, 9));
// console.log(game.solve());

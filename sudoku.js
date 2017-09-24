"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.dataposisi = []
    this.posisikosong = []
  }

  //solve() {}

  // Returns a string representing the current state of the board
  board() {

    var arrboard_string = board_string.toString().split('')

    var tampung = []

    for(var i = 0; i < 9; i++) {

      tampung = []

      for(var j = 0; j < 9; j++) {
        tampung.push(+arrboard_string[j])
      }

      arrboard_string.splice(0, 9)
      this.dataposisi.push(tampung)
    }

    //return this.dataposisi

  }

  cetakpapan() {
    var papan = ''
    for(var i = 0; i < 9; i++) {
      if(i == 0 || i == 3 || i == 6) {
        papan = papan + '-----------------------\n'
      }

      for(var j = 0; j < 9; j++) {
        if(j == 3 || j == 6) {
          papan = papan + ' |'
        }
        papan = papan + ' ' + this.dataposisi[i][j]
      }
      papan = papan + '\n'
    }

    papan = papan + '-----------------------\n'
    return papan
  }

  cekBaris(angka, baris) {
    for(var i = 0; i < 9; i++) {
      if(this.dataposisi[baris][i] == angka) {
        return false
      }
    }
    return true
  }

  cekKolom(angka, kolom) {
    for(var i = 0; i < 9; i++) {
      if(this.dataposisi[i][kolom] == angka) {
        return false
      }
    }
    return true
  }

  cekTiga(angka, baris, kolom) {
    if(baris < 3 && kolom < 3) {
      for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
          if(this.dataposisi[i][j] == angka) {
            return false
          }
        }
      }
      return true
    }
    else if(baris < 3 && kolom < 6) {
      for(var i = 0; i < 3; i++) {
        for(var j = 3; j < 6; j++) {
          if(this.dataposisi[i][j] == angka) {
            return false
          }
        }
      }
      return true
    }
    else if(baris < 3 && kolom < 9) {
      for(var i = 0; i < 3; i++) {
        for(var j = 6; j < 9; j++) {
          if(this.dataposisi[i][j] == angka) {
            return false
          }
        }
      }
      return true
    }
    else if(baris < 6 && kolom < 3) {
      for(var i = 3; i < 6; i++) {
        for(var j = 0; j < 3; j++) {
          if(this.dataposisi[i][j] == angka) {
            return false
          }
        }
      }
      return true
    }
    else if(baris < 6 && kolom < 6) {
      for(var i = 3; i < 6; i++) {
        for(var j = 3; j < 6; j++) {
          if(this.dataposisi[i][j] == angka) {
            return false
          }
        }
      }
      return true
    }
    else if(baris < 6 && kolom < 9) {
      for(var i = 3; i < 6; i++) {
        for(var j = 6; j < 9; j++) {
          if(this.dataposisi[i][j] == angka) {
            return false
          }
        }
      }
      return true
    }
    else if(baris < 9 && kolom < 3) {
      for(var i = 6; i < 9; i++) {
        for(var j = 0; j < 3; j++) {
          if(this.dataposisi[i][j] == angka) {
            return false
          }
        }
      }
      return true
    }
    else if(baris < 9 && kolom < 6) {
      for(var i = 6; i < 9; i++) {
        for(var j = 3; j < 6; j++) {
          if(this.dataposisi[i][j] == angka) {
            return false
          }
        }
      }
      return true
    }
    else if(baris < 9 && kolom < 9) {
      for(var i = 6; i < 9; i++) {
        for(var j = 6; j < 9; j++) {
          if(this.dataposisi[i][j] == angka) {
            return false
          }
        }
      }
      return true
    }
  }

  cariposisikosong() {
    for(var i = 0; i < 9; i++) {
      for(var j = 0; j < 9; j++) {
        var tampung = []
        if(this.dataposisi[i][j] == 0) {
          tampung.push(i)
          tampung.push(j)
          this.posisikosong.push(tampung)
        }
      }
    }
  }

  solve() {
    this.board()
    this.cariposisikosong()

    var i = 0

    while(i < this.posisikosong.length) {
      var baris = this.posisikosong[i][0]
      var kolom = this.posisikosong[i][1]
      var nilai = this.dataposisi[baris][kolom] + 1
      var status = false

      while(nilai <= 9) {
        if(this.cekBaris(nilai, baris) && this.cekKolom(nilai, kolom) && this.cekTiga(nilai, baris, kolom)) {
          i++
          this.dataposisi[baris][kolom] = nilai
          status = true
          break
        }
        else {
          nilai++
        }
      }
      if(!status) {
        this.dataposisi[baris][kolom] = 0
        i--
      }
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
//game.solve()

game.solve();
console.log(game.cetakpapan());

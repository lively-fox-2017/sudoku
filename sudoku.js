class Sudoku {
  constructor(board_string) {
    this.board_string=board_string
    //005030081902850060600004050007402830349760005008300490150087002090000600026049503
    // this.spl=this.board.split('')
    this.papanIsi=[]
  }



  // Returns a string representing the current state of the board
  board() {
    let ukuranPapan=9
    let angka=0

    for(let i=0;i<ukuranPapan;i++){
      let tempPapan=[]
      for(var j=0;j<ukuranPapan;j++){
        tempPapan.push(+this.board_string[angka]);
        angka++
      }
      this.papanIsi.push(tempPapan)
    }
    return this.papanIsi
  }

  cekKolom(barisAngka,cek){
    for(var kolom=0;kolom<9;kolom++){
      if(this.papanIsi[barisAngka][kolom]==cek){
        return false
      }
    }
    return true
  }

  cekBaris(kolomAngka,cek){
    for(let baris=0;baris<9;baris++){
      if(this.papanIsi[baris][kolomAngka]==cek){
        return false
      }
    }
    return true
  }

  cekArea(row,col,cek){//3x3
    var area=3
    var posKolom=0
    var posBaris=0

    while(row>=posBaris+area){
      posBaris+=area;
    }
    while (col>= posKolom+area) {
      posKolom+=area
    }
    for(var baris3x3=posBaris;baris3x3<posBaris+area;baris3x3++){
      for(var kolom3x3=posKolom;kolom3x3<posKolom+area;kolom3x3++){
          if(this.papanIsi[baris3x3][kolom3x3]== cek){
            return false
          }
        }
      }
    return true
  }
  cekAngka(row,col,cek){
    if(this.cekBaris(col,cek)&&
     this.cekKolom(row,cek)&&
     this.cekArea(row,col,cek)){
      return true;
    }else{
      return false
    }
  }
  solve() {
    let pjgPapan=9

    for(var row=0;row<pjgPapan;row++){
      for(var col=0;col<pjgPapan;col++){
        if(this.papanIsi[row][col]==0){
          for(var cek=0;cek<=pjgPapan;cek++){
            if(this.cekAngka(row,col,cek)){
              this.papanIsi[row][col]= cek;
              break;
            }
          }
        }
      }
    }
    return this.papanIsi
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
// var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//   .toString()
//   .split("\n")[0]
let board_string='005030081902850060600004050007402830349760005008300490150087002090000600026049503'
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.board())
console.log('=========hasil Sudoku===========');
console.log(game.solve())

// console.log(game.cekBaris(0,9));
// console.log(game.cekKolom(2,9));
// console.log(row[4]);
// console.log(col[0]);
// console.log(game.cekArea(1,0,1));
// console.log(game.cekArea(1,0,2));
// console.log(game.cekArea(1,0,3));
// console.log(game.cekArea(1,0,4));
// console.log(game.cekArea(1,0,5));
// console.log(game.cekArea(1,0,6));
// console.log(game.cekArea(1,0,7));
// console.log(game.cekArea(1,0,8));
// console.log(game.cekArea(1,0,9));

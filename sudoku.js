
"use strict"

class Sudoku {
  constructor(board_string) {
    this.numbersPosition=this.dataMapping(board_string);

  }

  dataMapping(board_string){
    let numbersPosition=[];
    let baris;
    for(let i in board_string){
      if(i%9 == 0){
        baris= baris+1||0;
        numbersPosition.push([]);
      }
      numbersPosition[baris].push(board_string[i]);
    }
    return numbersPosition;
  }

  isExistInBaris(nomor, indexBaris){
    for(let kolomInBaris in this.numbersPosition[indexBaris]){
      if (nomor==parseInt(this.numbersPosition[indexBaris][kolomInBaris])){
        return true;
      }
    }
    return false;
  }

  isExistInKolom(nomor, indexKolom){
    for(let i=0; i< this.numbersPosition.length;i++){
      if (parseInt(this.numbersPosition[i][indexKolom])==nomor){
        return true;
      }
    }
    return false;
  }

  areaSearcher(indexBaris, indexKolom){
    let pos={};
    if (indexBaris>=0&&indexBaris<3){
      pos.x=0;
    }else if(indexBaris>=3&&indexBaris<6){
      pos.x=1;
    }else if(indexBaris>=6&&indexBaris<9){
      pos.x=2;
    }

    if (indexKolom>=0&&indexKolom<3){
      pos.y=0;
    }else if(indexKolom>=3&&indexKolom<6){
      pos.y=1;
    }else if(indexKolom>=6&&indexKolom<9){
      pos.y=2;
    }

    if (pos.x==0&&pos.y==0){
      return 'area1';
    } else if(pos.x==0&&pos.y==1){
      return 'area2';
    } else if(pos.x==0&&pos.y==2){
      return 'area3';
    }

    else if(pos.x==1&&pos.y==0){
      return 'area4';
    } else if(pos.x==1&&pos.y==1){
      return 'area5';
    } else if(pos.x==1&&pos.y==2){
      return 'area6';
    }

    else if(pos.x==2&&pos.y==0){
      return 'area7';
    } else if(pos.x==2&&pos.y==1){
      return 'area8';
    } else if(pos.x==2&&pos.y==2){
      return 'area9';
    }


  }

  isExistInArea(nomor ,indexBarisAwal, indexKolomAwal, indexBarisAkhir, indexKolomAkhir){
    //let counter =0;
    for(let baris = indexBarisAwal; baris<=indexBarisAkhir;baris++ ){
      for(let kolom = indexKolomAwal; kolom<=indexKolomAkhir;kolom++){
        //console.log('baris : ',baris);
        //console.log('kolom : ',kolom);
        if(parseInt(this.numbersPosition[baris][kolom])==nomor){
          //console.log('ada');
          return true;
        //  counter++;
        //  if (counter>2){
        //    return true;
        //  }
        }
      }
    }
    return false;
  }

  isExistInLittleSquare(nomor, indexBaris, indexKolom){
    //
    let area=this.areaSearcher(indexBaris, indexKolom);
    switch (area) {
      case 'area1':
        return this.isExistInArea(nomor,0,0,2,2)
        break;
      case 'area2':
        return this.isExistInArea(nomor,0,3,2,5)
        break;
      case 'area3':
        return this.isExistInArea(nomor,0,6,2,8)
        break;
      case 'area4':
        return this.isExistInArea(nomor,3,0,5,2)
        break;
      case 'area5':
        return this.isExistInArea(nomor,3,3,5,5)
        break;
      case 'area6':
        return this.isExistInArea(nomor,3,6,5,8)
        break;
      case 'area7':
        return this.isExistInArea(nomor,6,0,8,2)
        break;
      case 'area8':
        return this.isExistInArea(nomor,6,3,8,5)
        break;
      case 'area9':
        return this.isExistInArea(nomor,6,6,8,8)
        break;
      default:

    }
    //console.log(area);
  }

  isAvailable(nomor, indexBaris, indexKolom){
    let existInBaris = this.isExistInBaris(nomor, indexBaris);
    let existInKolom = this.isExistInKolom(nomor, indexKolom);
    let existInSquare = this.isExistInLittleSquare(nomor, indexBaris, indexKolom);
    if( !existInBaris&&!existInKolom&&!existInSquare){
      return true;
    }
    return false;
  }

  numberGuesser(indexBaris, indexKolom){
    let rng = Math.round(Math.random()*8)+1;
    while(!this.isAvailable(rng, indexBaris, indexKolom)){
      console.log(rng);
      rng = Math.round(Math.random()*8)+1;
    }
    //console.log(indexBaris);
    //console.log(indexKolom);
    //console.log(rng);
    console.log(this.isAvailable(rng,indexBaris,indexKolom));
    return rng;
  }

  solve() {
    //console.log(this.isExistInBaris(3,0));
    //console.log(this.isExistInKolom(6,0));
    console.log(this.isExistInLittleSquare(3,6,7));
    this.numbersPosition[1][2]=this.numberGuesser(1,2);
    for(let baris in this.numbersPosition){
      for(let kolom in this.numbersPosition[baris]){
        if(this.numbersPosition[baris][kolom]==0){
          this.numbersPosition[baris][kolom]=this.numberGuesser(baris,kolom);
        }
      }
    }

  }

  // Returns a string representing the current state of the board
  board() {
    let result='';
    for(let baris in this.numbersPosition){
      if(baris%3==0){
        result+='-----------------------\n';
      }
      for(let kolom in this.numbersPosition[baris]){
        result+=`${this.numbersPosition[baris][kolom]} `
        if((kolom+1)%3==0){
          result+=`| `;

        }
        //result
      }
      result+='\n'
    }
    result+='-----------------------\n'
    return result
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

console.log(game.board())

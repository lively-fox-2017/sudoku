"use strict"

class Sudoku {
    constructor(board_string) {
        this.board_string = board_string
        this.layout = []
        this.angkaNol = []
    }

    solve() {

        /* solve release 4 */
        let inputAngka = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        for (let x = 0; x < 9; x++) {
            for (let c = 0; c < 9; c++) {
                //console.log(this.layout[x][c])
                if (this.layout[x][c] == 0) { // = number
                    for (let i = 0; i < inputAngka.length; i++) {
                        // console.log(this.rowCheck(x, inputAngka[i]))
                        // console.log(this.colCheck(c, inputAngka[i]))
                        // console.log(this.areacheck(x, c, inputAngka[i]))
                        if (this.rowCheck(x, inputAngka[i]) && this.colCheck(c, inputAngka[i]) && this.areacheck(x, c, inputAngka[i])) {
                            this.layout[x][c] = inputAngka[i]
                        }

                    }
                }
            }
        }
        //console.log(this.layout)
        return this.layout

        /*release 5 masih error */
        // this.ngecekNol()
        // let batas = 9,
        //     row, col, nilai, ditemukan;
        // console.log(this.angkaNol.length)
        // for (var i = 0; i < this.angkaNol.length;) {
        //     row = this.angkaNol[i][0]
        //     col = this.angkaNol[i][1]
        //     nilai = Number(this.layout[row][col]) + 1
        //     ditemukan = false
        //     console.log(row)
        //     while (!ditemukan && nilai <= batas) {
        //         if (this.rowCheck(row, nilai) && this.colCheck(col, nilai) && this.areacheck(row, col, nilai)) {
        //             ditemukan = true
        //             this.layout[row][col] = nilai.toString()
        //             i++
        //         } else {
        //             nilai++ // jika ga ada nyari nilai selanjutnya
        //         }
        //     }

        //     if (!ditemukan) {
        //         this.layout[row][col] = 0
        //         i--
        //     }
        // }
        // return this.layout
    }

    ngecekNol() { // cek nol > push // berdasarkan index row col
        console.log(this.layout)
        for (var i = 0; i < this.layout.length; i++) {
            for (var j = 0; j < this.layout.length; j++) {
                if (this.layout[i][j] === '0') {
                    this.angkaNol.push([i, j])
                }
            }
        }
        //console.log(this.angkaNol)
        return this.angkaNol
    }

    // Returns a string representing the current state of the board

    layout9x9() {
        // layout 9x9
        let newArr = this.board_string.split('')
            //console.log(newArr)
        for (let i = 0; i < 9; i++) {
            this.layout.push(newArr.splice(0, 9))
        }
        //console.log(this.layout)
        return this.layout
    }

    board() {
        // layout board line 3x3
        let line = ''
        for (let i = 0; i < 9; i++) {
            if (i === 0) {
                line += '---------------------\n'
            }
            for (let j = 0; j < 9; j++) {
                line += this.layout[i][j] + ' '
                if (j === 2 || j === 5) {
                    line += '| '
                }
            }
            line += '\n'
            if ((i + 4) % 3 === 0) {
                line += '---------------------\n'
            }
        }
        return line
    }

    // check row, colom & area51

    rowCheck(rowIndex, searchRow) {
        let row = this.layout[rowIndex]
            //console.log((row.indexOf(searchRow.toString())===-1))
        return (row.indexOf(searchRow.toString()) === -1) ? true : false
    }

    colCheck(colIndex, searchCol) {
        let row = this.layout9x9()
            //console.log(row[0][0], row[1][0], row[2][0], row[3][0], row[4][0], row[5][0], row[6][0], row[7][0], row[8][0])
        let col = []
        for (let c = 0; c < row[0].length - 1; c++) {
            col.push(row[c][colIndex - 1])
        }

        return (col.indexOf(searchCol.toString()) === -1) ? true : false
    }


    areacheck(row, col, search) {
        // area 3x3
        let area51 = ''
            //console.log(search)
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                //console.log(this.layout[(i + row) - (row % 3)][(j + col) - (col % 3)])
                area51 += this.layout[(i + row) - (row % 3)][(j + col) - (col % 3)]
            }
        }
        //console.log(area51)

        // cek area 3x3
        return (area51.indexOf(search.toString()) === -1) ? true : false

        // let counter = 0
        // for (let j = 0; j < area51.length; j++) {
        //     //console.log(area51[j])
        //     if (area51[j].indexOf(search) !== -1) {
        //         counter++
        //     }
        // }
        // //console.log(counter)
        // return (counter > 0) ? false : true
    }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)

var fs = require('fs')
    // var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    //     .toString()
    //     .split("\n")[0]


var game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')

// Remember: this will just fill out what it can and not "guess"
//game.board()
game.colCheck(2, 4)
game.rowCheck(1, 4)
game.areacheck(1, 1, 8)
game.layout9x9()
game.ngecekNol()
game.solve()
game.board()



// console.log(game.rowCheck(1, 4))
// console.log(game.colCheck(1, 5))
// console.log(game.areacheck(0, 0, 8))
// console.log(game.ngecekNol())
console.log(game.board())
    //console.log(game.solve())
"use strict"

class Sudoku {
    constructor(board_string) {
        this.board_string = board_string
        this.layout = []
    }

    solve() {
        //console.log(this.board())
    }

    // Returns a string representing the current state of the board

    layout9x9() {
        // layout 9x9
        for (var r = 0; r < this.board_string.length; r++) {
            var row = []
            for (var c = 0; c < 9; c++) {
                row.push(this.board_string[c + r])
            }
            this.layout.push(row)
        }
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
        let row = this.layout9x9()

        let rowKe = row[rowIndex - 1]
        console.log(rowKe)
        let counter = 0

        for (let j = 0; j < rowKe.length; j++) {
            console.log(rowKe[j])
            if (rowKe[j].indexOf(searchRow) !== -1) {
                counter++
            }
        }
        console.log(counter)
        return (counter > 0) ? false : true
    }

    colCheck(colIndex, searchCol) {
        let row = this.layout9x9()
            //console.log(row[0][0], row[1][0], row[2][0], row[3][0], row[4][0], row[5][0], row[6][0], row[7][0], row[8][0])
        let col = []
        for (let c = 0; c < row[0].length - 1; c++) {
            col.push(row[c][colIndex - 1])
        }

        let counter = 0
        console.log(col)
        for (let j = 0; j < col.length; j++) {
            console.log(col[j])
            if (col[j].indexOf(searchCol) !== -1) {
                counter++
            }
        }
        console.log(counter)
        return (counter > 0) ? false : true
    }

    area51(noArea) {
        let row = this.layout9x9()
        if (noArea === 1) { return `${row[0][0]} ${row[0][1]} ${row[0][2]} ${row[1][0]} ${row[1][1]} ${row[1][2]} ${row[2][0]} ${row[2][1]} ${row[2][2]}` }
        if (noArea === 2) { return `${row[0][3]} ${row[0][4]} ${row[0][5]} ${row[1][3]} ${row[1][4]} ${row[1][5]} ${row[2][3]} ${row[2][4]} ${row[2][5]}` }
        if (noArea === 3) { return `${row[0][6]} ${row[0][7]} ${row[0][8]} ${row[1][6]} ${row[1][7]} ${row[1][8]} ${row[2][6]} ${row[2][7]} ${row[2][8]}` }
        if (noArea === 4) { return `${row[3][0]} ${row[3][1]} ${row[3][2]} ${row[4][0]} ${row[4][1]} ${row[4][2]} ${row[5][0]} ${row[5][1]} ${row[5][2]}` }
        if (noArea === 5) { return `${row[3][3]} ${row[3][4]} ${row[3][5]} ${row[4][3]} ${row[4][4]} ${row[4][5]} ${row[5][3]} ${row[5][4]} ${row[5][5]}` }
        if (noArea === 6) { return `${row[3][6]} ${row[3][7]} ${row[3][8]} ${row[4][6]} ${row[4][7]} ${row[4][8]} ${row[5][6]} ${row[5][7]} ${row[5][8]}` }
        if (noArea === 7) { return `${row[6][0]} ${row[6][1]} ${row[6][2]} ${row[7][0]} ${row[7][1]} ${row[7][2]} ${row[8][0]} ${row[8][1]} ${row[8][2]}` }
        if (noArea === 8) { return `${row[6][3]} ${row[6][4]} ${row[6][5]} ${row[7][3]} ${row[7][4]} ${row[7][5]} ${row[8][3]} ${row[8][4]} ${row[8][5]}` }
        if (noArea === 9) { return `${row[6][6]} ${row[6][7]} ${row[6][8]} ${row[7][6]} ${row[7][7]} ${row[7][8]} ${row[8][6]} ${row[8][7]} ${row[8][8]}` }
    }

    areacheck(areaIndex, search) {
        console.log(this.area51(areaIndex))
        let counter = 0
        for (let j = 0; j < this.area51(areaIndex).length; j++) {
            console.log(this.area51(areaIndex)[j])
            if (this.area51(areaIndex)[j].indexOf(search) !== -1) {
                counter++
            }
        }
        console.log(counter)
        return (counter > 0) ? false : true
    }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)

//var fs = require('fs')
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
//     .toString()
//     .split("\n")[0]


var game = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900')

// Remember: this will just fill out what it can and not "guess"
//game.board()
game.colCheck(2, 4)
game.rowCheck(1, 4)
game.areacheck(1, 1)
game.area51()
game.layout9x9()
game.solve()


console.log(game.rowCheck(1, 1))
console.log(game.colCheck(1, 1))
console.log(game.areacheck(1, 4))
    //console.log(game.solve())
console.log(game.board())
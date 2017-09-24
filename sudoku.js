"use strict"

class Sudoku {
	constructor(puzzle) {
		this.puzzle = puzzle;
		this.logicBoard = null;
		this.boardRow = 9;
		this.boardCol = 9;
		this.loopCycle = 0; // remove this
	}

	// set the board!
	// logicBoard for easier processing (2D array)
	init() {
		this.logicBoard = this.board();
	}

	// for solving the puzzle!
	solve(isUsingRecursion) {
		// find a number that fits, one at a time
		// used in bt()
		const findNum = (row, col, startingNum) => {
			const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

			for (let i = startingNum - 1; i < nums.length; i++) {
				this.logicBoard[row][col] = nums[i];

				// no duplicates in row, column, and region?
				if (this.checkRow(row) && this.checkCol(col) && this.checkReg(row, col)) {
					// reset board value on position [row][col], do not modify board here
					this.logicBoard[row][col] = 0;
					return nums[i];
				}

				// reset board value on position [row][col], do not modify board here
				this.logicBoard[row][col] = 0;
			}

			return false;
		}

		// find zero's position one at a time
		// used in bt()
		const findZero = () => {
			for (let i = 0; i < this.boardRow; i++) {

				for (let j = 0; j < this.boardCol; j++) {

					if (this.logicBoard[i][j] === 0) {
						return [i, j];
					}
				}
			}

			return false;
		}

		// modify the board
		// used in bt()
		const modifyBoard = (row, col, val) => this.logicBoard[row][col] = val;

		// backtrack implementation using recursion for solving the puzzle
		const bt = (solvedIdx, solvedVal, startingNum) => {
			// current processed position (where the value is zero)
			const currentIndex = findZero();

			// if no zero left
			if (!currentIndex) return;
			
			// find a number that fits in current position
			const foundNum = findNum(...currentIndex, startingNum);
			
			if (foundNum) {
				// modify the number at current position to foundNum
				modifyBoard(...currentIndex, foundNum);

				// add the number to the collection of solved number--solvedVal
				// add the position to the collection of solved index--solvedIdx
				solvedVal.push(foundNum);
				solvedIdx.push(currentIndex);

				// go find another position to process
				// and the number that fits (starting from 1 to 9 again)
				// and make sure it remember values and positions solved
				return bt(solvedIdx, solvedVal, 1);
			} else {
				// if there is no number found ... putar balik, Bang!
				
				// cut the last solvedIdx and solvedValue elements
				// and store it in the prevIdx and prevValue variables
				let prevIndex = solvedIdx.splice(-1)[0];
				let prevValue = solvedVal.splice(-1)[0];

				// set the last processed board's position to zero
				modifyBoard(...prevIndex, 0);

				// find another number at the last processed board's position
				// starting from the last value found + 1
				return bt(solvedIdx, solvedVal, prevValue + 1);
			}
		}

		// loop implementation for solving the puzzle
		const loop = () => {
			let startingNum = 1;
			let solvedIdx = [];
			let solvedVal = [];
			this.loopCycle = 0 // remove this

			while (true) {
				this.loopCycle += 1; // remove this
				let curIdx = findZero();
				if (!curIdx) break;
				let foundNum = findNum(...curIdx, startingNum);

				if (foundNum) {
					solvedVal.push(foundNum);
					solvedIdx.push(curIdx);
					startingNum = 1;
					modifyBoard(...curIdx, foundNum);
				} else {
					let prevIndex = solvedIdx.splice(-1)[0];
					startingNum = solvedVal.splice(-1)[0] + 1;
					modifyBoard(...prevIndex, 0);
				}
			}
		}

		// small but powerful
		isUsingRecursion ? bt([], [], 1) : loop();
	}

	// format the puzzle into a 2D (row, col) array for easier processing
	board() {
		const input = this.puzzle.split('');
		let board = [];

		for (let i = 0; i < this.boardRow; i++) {
			let row = [];

			for (let j = 0; j < this.boardCol; j++) {
				let el = Number(...input.splice(0, 1));

				row.push(el);
			}

			board.push(row);
		}

		return board;
	}

	// format 2D array board into a (relatively) proper board 
	// for display (string)
	printBoard() {
		let beautifiedBoard = '';

		for (let i = 0; i < this.boardRow; i++) {
			const shouldPrintLine = (i + 1) % 3 === 0 && (i + 1) !== 9;
			let beautifiedRow = '';
			let lineBelow = '';

			for (let j = 0; j < this.boardCol; j++) {
				const shouldPrintBorder = (j + 1) % 3 === 0  && (j + 1) !== 9;
				const el = this.logicBoard[i][j];

				beautifiedRow += shouldPrintBorder ? ' ' + el + ' :' : ' ' + el + ' ';
				lineBelow += shouldPrintBorder ? '---:' : '---'
			}

			beautifiedBoard += shouldPrintLine ? beautifiedRow + '\n' + lineBelow + '\n' : beautifiedRow + '\n';
		}

		return beautifiedBoard 	// remove the last line break
							.split('\n')
							.filter(line => line !== '')
							.join('\n');
	}

	// find duplicate in an array
	findDuplicates(arr) {
		for (let i = 0; i < arr.length; i++) {

			for (let j = i + 1; j < arr.length; j++) {
				let notZero = arr[i] !== 0 || arr[j] !== 0;

				if (arr[i] === arr[j] && notZero) return false;
			}
		}

		return true;
	}

	// find duplicate in a row using findDuplicates(arr);
	checkRow(rowNum) {
		let nthRow = this.logicBoard[rowNum];

		return this.findDuplicates(nthRow);
	}

	// find duplicate in a column using findDuplicates(arr);
	checkCol(colNum) {
		let nthCol = [];

		for (let i = 0; i < this.boardRow; i++) {

			nthCol.push(this.logicBoard[i][colNum]);
		}

		return this.findDuplicates(nthCol);
	}

	// find duplicate in a 3 x 3 grid using findDuplicates(arr);
	checkReg(row, col) {
		// finding where a certain position (row, col) belongs in a 3 x 3 grid
		// return [row_min, row_max, col_min, col_max]
		const reg = ((row, col) => {
			if (row < 3 && col < 3) 						return [0, 3, 0, 3];
			if (row < 3 && col >= 3 && col < 6) 			return [0, 3, 3, 6];
			if (row < 3 && col >= 6 && col < 9) 			return [0, 3, 6, 9];
			if (row >= 3 && row < 6 && col < 3) 			return [3, 6, 0, 3];
			if (row >= 3 && row < 6 && col >= 3 && col < 6) return [3, 6, 3, 6];
			if (row >= 3 && row < 6 && col >= 6 && col < 9) return [3, 6, 6, 9];
			if (row >= 6 && row < 9 && col < 3) 			return [6, 9, 0, 3];
			if (row >= 6 && row < 9 && col >= 3 && col < 6) return [6, 9, 3, 6];
			if (row >= 6 && row < 9 && col >= 6 && col < 9) return [6, 9, 6, 9];
		})(row, col);

		let nthReg = [];

		for (let i = reg[0]; i < reg[1]; i++) {
			for (let j = reg[2]; j < reg[3]; j++) {

				nthReg.push(this.logicBoard[i][j]);
			}
		}

		return this.findDuplicates(nthReg);
	}
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
const fs = require('fs');
const sample1 = 'set-01_sample.unsolved.txt';
const sample2 = 'set-02_project-euler_50-easy-puzzles.txt';

// go run like you stole something!
((config) => {
	const board_string = fs
						.readFileSync(config.sample)
  						.toString()
  						.split("\n");

	for (let i = 0; i < board_string.length; i++) {
		const game = new Sudoku(board_string[i]);
		let t0, t1;

		game.init();

		console.log(
			'PROBLEM SET:', i + 1
		);

		if (config.displayPuzzle) console.log(
			'===========PUZZLE==========='	+ '\n' +
			game.printBoard()				+ '\n' +
			'===========++++++===========' 	+ '\n'
			);

		t0 = new Date().getTime();

		game.solve(config.useRecursion);

		console.log(
			'==========SOLUTION=========='	+ '\n' +
			game.printBoard() 				+ '\n' +
			'==========++++++++=========='
		);

		t1 = new Date().getTime();

		if (config.displayPerformanceMetrics) {
			if (!config.useRecursion) console.log('LOOP CYCLE:', game.loopCycle, 'times');
			console.log('TIME TO SOLVE THE PUZZLE:', t1 - t0 + 'ms', '\n');
		}
	}
})({
	sample: sample2,
	displayPuzzle: true,
	displayPerformanceMetrics: false,
	useRecursion: false	// use loop
});

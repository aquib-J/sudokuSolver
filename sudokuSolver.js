function solver(string){
    
   function queryParser(str){ 
    let arr = str.split('');
    let finalArr = [];
    for (let i = 0; i < arr.length; i = i + 9) {
        let tempArr = [];
        for (let j = i; j < i + 9; j++) {
            tempArr.push(Number(arr[j]));
        }
        finalArr.push(tempArr);
    }
    return finalArr;
}

function solveBoard(arrBoard) {
    let emptyPoint = nextEmptyPoint(arrBoard);
    let y = emptyPoint[0];
    let x = emptyPoint[1];

    // to check if the game is solvable or not,we shouldn't even try if it's not.

    if (!isValidSudoku(arrBoard)) return arrBoard;

    // if nothing empty, it's solved
    if (y === -1) {
        return arrBoard;
    };

    let possArr = possibleArr(y, x, arrBoard);

    for (let k = 0; k < possArr.length && nextEmptyPoint(arrBoard)[0] !== -1; k++) {
        arrBoard[y][x] = possArr[k];
        solveBoard(arrBoard);
    }

    // if no possible value leads to a solution reset this value 
    if (nextEmptyPoint(arrBoard)[0] !== -1) arrBoard[y][x] = 0;

    return arrBoard;
}

function nextEmptyPoint(arrBoard) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (arrBoard[i][j] === 0) return [i, j];
        }
    }
    return [-1, -1];
}

function possibleArr(y, x, arrBoard) {
    let possArr = [];
    let row = [];
    let col = [];
    let quad = [];
    let k = 0;
    let l = 0;
    if (y <= 2) k = 0;
    else if (y <= 5) k = 3;
    else k = 6;
    if (x <= 2) l = 0;
    else if (x <= 5) l = 3;
    else l = 6;

    for (let i = 0; i < 9; i++) {
        row.push(arrBoard[i][x]);
    }
    for (let j = 0; j < 9; j++) {
        col.push(arrBoard[y][j]);
    }
    for (let i = k; i < k + 3; i++) {
        for (let j = l; j < l + 3; j++) {
            quad.push(arrBoard[i][j]);
        }
    }

    for (let n = 1; n < 10; n++) {
        if (row.indexOf(n) === -1 && col.indexOf(n) === -1 && quad.indexOf(n) === -1) {
            possArr.push(n);
        }
    }
    return possArr;
}

//  below function is called from isValidSudoku which is called just once at the top of the Solve function 

function gridChecker_3by3(y, x, arrBoard) {
    let gridArr = [];
    for (let i = y; i < y + 3; i++) {
        for (let j = x; j < x + 3; j++) {
            if (gridArr.indexOf(arrBoard[i][j]) === -1 || arrBoard[i][j] === 0) {
                gridArr.push(arrBoard[i][j]);
            } else {
                return false;
            }
        }
    }
    return true;
}

function isValidSudoku(arrBoard) {
    if (!gridChecker_3by3(0, 0, arrBoard)) return false;
    if (!gridChecker_3by3(0, 3, arrBoard)) return false;
    if (!gridChecker_3by3(0, 6, arrBoard)) return false;

    if (!gridChecker_3by3(3, 0, arrBoard)) return false;
    if (!gridChecker_3by3(3, 3, arrBoard)) return false;
    if (!gridChecker_3by3(3, 6, arrBoard)) return false;

    if (!gridChecker_3by3(6, 0, arrBoard)) return false;
    if (!gridChecker_3by3(6, 3, arrBoard)) return false;
    if (!gridChecker_3by3(6, 6, arrBoard)) return false;

    for (let i = 0; i < arrBoard.length; i++) {
        let rowNumbers = [];
        for (let j = 0; j < arrBoard.length; j++) {
            if (rowNumbers.indexOf(arrBoard[i][j]) === -1 || arrBoard[i][j] === 0) {
                rowNumbers.push(arrBoard[i][j]);
            } else {
                return false;
            }
        }
    }

    for (let i = 0; i < arrBoard.length; i++) {
        let colNumbers = [];
        for (let j = 0; j < arrBoard.length; j++) {
            if (colNumbers.indexOf(arrBoard[j][i]) === -1 || arrBoard[j][i] === 0) {
                colNumbers.push(arrBoard[j][i]);
            } else {
                return false;
            }
        }
    }
    return true;
}




let board = queryParser(string);

return solveBoard(board);



}




module.exports=solver;
// in the process of refractoring to debug what happened, solved the problem and no longer need this file, but it is here to help me reference the problem in the future, should the need ever arise

let startingBoard = [[null, null, null], [null, 'o', null], [null, null, null]];
let player = 'o';
let ai = 'x';
let empty = null;

const Board = function (currentBoard, depthCount) {
    this.currentBoard = currentBoard;
    this.depthCount = depthCount;
}


/* #region   */
function isMovesLeft(validMovesBoard) {
    for (let r = 0; r < validMovesBoard.length; r++) {
        for (let c = 0; c < validMovesBoard[r].length; c++) {
            if (!validMovesBoard[r][c]) return true;
        }
    }
    return false;
}

function evaluate(evalBoard){
    console.log(evalBoard)
    // check rows
    for (let r = 0; r < evalBoard.length; r++) {
        if (evalBoard[r][0] === evalBoard[r][1] && evalBoard[r][0] === evalBoard[r][2]) {
            if (evalBoard[r][0] === player) {
                return -10;
            } else if (evalBoard[r][0] === ai) {
                return 10;
            }
        }
    }

    // check columns
    for (let c = 0; c < 3; c++) {
        if (evalBoard[0][c] === evalBoard[1][c] && evalBoard[0][c] === evalBoard[2][c]) {
            if (evalBoard[0][c] === player) {
                return -10;
            } else if (evalBoard[0][c] === ai) {
                return 10;
            }
        }
    }

    // check diagonals
    if (evalBoard[0][0]===evalBoard[1][1] && evalBoard[1][1]===evalBoard[2][2]) 
    { 
        if (evalBoard[0][0]=== player) 
            return -10; 
        else if (evalBoard[0][0]===ai) 
            return 10; 
    } 

    if (evalBoard[0][2]===evalBoard[1][1] && evalBoard[1][1]===evalBoard[2][0]) 
    { 
        if (evalBoard[0][2]===player) {
            return -10; 
        }
        else if (evalBoard[0][2]===ai) {
            return 10; 
        }
    } 

    return 0
}

function minimax(minimaxBoard, depth, isMaximizer) {
    debugger;
    console.log(depth)
    let score = evaluate(minimaxBoard);
    // check score. If not 0, return result - depth
    if (score === 10) {
        return (score - depth);
    } else if (score === -10) {
        return (score + depth);
    }
    if(!isMovesLeft(minimaxBoard)){return 0};

    if (!isMaximizer) {
        let best = 1000;

        for (let r = 0; r < minimaxBoard.length; r++) {
            for (let c = 0; c < minimaxBoard[r].length; c++) {
                if (!minimaxBoard[r][c]) {
                    let passedBoard = new Board (minimaxBoard, depth)
                    passedBoard.currentBoard[r][c] = player;
                    best = Math.min(best, minimax(passedBoard.currentBoard, (passedBoard.depthCount + 1), !isMaximizer));
                }
            }
        }
        return best;
    } else {
        let best = -1000;

        for (let r = 0; r < minimaxBoard.length; r++) {
            for (let c = 0; c < minimaxBoard[r].length; c++) {
                if (!minimaxBoard[r][c]) {
                    let passedBoard = new Board (minimaxBoard, depth)
                    passedBoard.currentBoard[r][c] = ai;
                    best = Math.max(best, minimax(passedBoard.currentBoard, (passedBoard.depthCount + 1), !isMaximizer));
                }
            }
        }
        return best;
    }
}

/* #endregion */

$('.board-space').on('click', function () {
    const $b = $(this);
    if (board[$b.attr('data-row')][$b.attr('data-col')] === 0) {
        $b.html('<p class="board-content">O');
        board[$b.attr('data-row')][$b.attr('data-col')] = player;
        console.log(board)

        let currentState = gameState(board);
        if (currentState === -10) {
            return console.log('player wins')
        } else if (currentState === 10) {
            return console.log('computer wins')
        }

        let moveID = '#';
        let aiMove = findBestMove(board);
        console.log(aiMove)

        moveID += aiMove.row;
        moveID += aiMove.col;

        board[aiMove.row][aiMove.col] = ai;
        console.log(board);
        $(moveID).html('<p class="board-content">X');
    }
});
let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let player = -1;
let ai = 1;


function gameState(board) {
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

    return 0;
}

function isMovesLeft(board) {
    // checks for any available moves
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c] === 0) return true;
        }
    }
    // console.log('no moves')
    return false;
}

function findBestMove(board) {
    let bestVal = -1000;

    let bestMove = {
        row: -1,
        col: -1
    }

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c] === 0) {
                board[r][c] = ai;

                let moveVal = minimax(board, 0, true);

                board[r][c] = 0;

                if (moveVal > bestVal) {
                    bestMove.row = r;
                    bestMove.col = c;
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove;
}

function minimax(board, depth, isMax) {
    // console.log(depth, isMax)
    
    let score = gameState(board);
    if (score === 10){
        return score - depth};
    if (score === -10){
        return score + depth};
    if (!isMovesLeft(board)){
        return 0;
    }

    if (isMax) {
        let best = -1000;

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === 0) {
                    board[r][c] = player;

                    best = Math.max(best, minimax(board, depth + 1, !isMax));

                    board[r][c] = 0;
                }
            }
        }

        return best;
    } else {
        let best = 1000;

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === 0) {
                    board[r][c] = ai;

                    best = Math.min(best, minimax(board, depth + 1, !isMax));

                    board[r][c] = 0;
                }
            }
        }
        return best;
    }
}

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
        // console.log(aiMove)
    
        moveID += aiMove.row;
        moveID += aiMove.col;
    
        board[aiMove.row][aiMove.col] = ai;
        // console.log(board);
        $(moveID).html('<p class="board-content">X');
    
        currentState = gameState(board);
        if (currentState === -10) {
            return console.log('player wins')
        } else if (currentState === 10) {
            return console.log('computer wins')
        }

    }
});
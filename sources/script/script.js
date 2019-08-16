let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let player = -1;
let ai = 1;

startGame();
function startGame() {
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    // board[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 3)] = ai;
    $('#cmodal').hide('fast');
    redraw();
}

function gameState(board) {
    // console.log(board)
    // check rows
    for (let r = 0; r < board.length; r++) {
        if (board[r][0] === board[r][1] && board[r][0] === board[r][2]) {
            if (board[r][0] === player) {
                return -10;
            } else if (board[r][0] === ai) {
                return 10;
            }
        }
    }

    // check columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] === board[1][c] && board[1][c] === board[2][c]) {
            if (board[0][c] === player) {
                return -10;
            } else if (board[0][c] === ai) {
                return 10;
            }
        }
    }

    // check diagonals
    if (board[0][0]===board[1][1] && board[1][1]===board[2][2]) 
    { 
        if (board[0][0]=== player) {
            return -10; 
        }
        else if (board[0][0]===ai) {
            return 10; 
        }
    } 

    if (board[0][2]===board[1][1] && board[1][1]===board[2][0]) 
    { 
        if (board[0][2]===player) {
            return -10; 
        } else if (board[0][2]===ai) {
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

                let moveVal = minimax(board, 1, true);

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
        let best = 1000;

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === 0) {
                    board[r][c] = player;

                    best = Math.min(best, minimax(board, depth + 1, !isMax));

                    board[r][c] = 0;
                }
            }
        }

        return best;
    } else {
        let best = -1000;

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === 0) {
                    board[r][c] = ai;

                    best = Math.max(best, minimax(board, depth + 1, !isMax));

                    board[r][c] = 0;
                }
            }
        }
        return best;
    }
}

$('.board-space').on('click', function () {
    redraw();
    const $b = $(this);
    if (board[$b.attr('data-row')][$b.attr('data-col')] === 0) {
        board[$b.attr('data-row')][$b.attr('data-col')] = player;
        
        let currentState = gameState(board);
        if (currentState === -10) {
            showModal('You win!')
            return console.log('player wins')
        }
        let aiMove = findBestMove(board);
        if (aiMove.col === -1 || aiMove.row === -1) {
            showModal('DRAW!')
            return console.log('draw')
        }
        redraw();
        // console.log(aiMove)
        board[aiMove.row][aiMove.col] = ai;
        console.log(board);
        redraw();
        currentState = gameState(board);
        if (currentState === 10) {
            showModal('Computer Wins')
            return console.log('computer wins')
        }
        
        redraw();
    }


});

function redraw(){
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            let fieldID = '#' + r + c;
            let $field = $(fieldID);
            if (board[r][c] === player) {
                $field.html('<p class="board-content">O');
                $field.attr('disabled', true);
            } else if (board[r][c] === ai) {
                $field.html('<p class="board-content">X');
                $field.attr('disabled', true);
            } else {
                $field.empty();
                $field.attr('disabled', false);
            }
        }
    }
}

function showModal(text) {
    $('#result').text(text);
    $('#cmodal').show('fast');
}

$('#play').on('click', startGame);
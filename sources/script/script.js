let board = [[0,0,0], [0,0,0], [0,0,0]]
let player = -1;
let ai = 1;


function gameState(board) {
    if (!isMovesLeft(board)) return false;

    // checks each row
    board.forEach(element => {
        if(element.every(val => val === element[0])){
            if (element[0] === player) {
                return -10;
            } else return 10;
        };
    });

    // checks each column
    for (let i = 0; i < board[0].length; i++) {
        if (board[0][i] === board[1][i] && board[0][i] === board[2][i]){
            if (board[0][i] === player) {
                return -10;
            } else return 10;
        };
    }

    // checks diagonals
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2]){
        if (board[0][0] === player) {
            return -10
        } else return 10;
    };
    if (board[0][2] === board[1][1] && board[0][0] === board[2][0]){
        if (board[0][0] === player) {
            return -10
        } else return 10;
    };

    return 0;
}

function isMovesLeft(board){
    // checks for any available moves
    board.forEach(element => {
       if(element.includes(0)) return true;
    });
    return false;
}

function findBestMove(board){
    let bestVal = 1000;

    let bestMoveRow = -1;
    let bestMoveCol = -1;    

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (!board[r][c]) {
                board[r][c] = ai;

                let moveVal = minimax(board, 0, true);

                board[r][c] = 0;
            }
        }
    }

}

function minimax(board, depth, isMax) {
    let score = gameState(board);

    if (score === 10 || score === -10) return score;

    
    if (isMax) {
        let best = -1000;

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (!board[r][c]) {
                    board[r][c] = ai;
    
                    best = Math.max(best, minimax(board, depth+1, !isMax));

                    board[r][c] = 0;
                }
            }
        }

        return best;
    } else {
        let best = 1000;

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (!board[r][c]) {
                    board[r][c] = player;
    
                    best = Math.min(best, minimax(board, depth+1, !isMax));

                    board[r][c] = 0;
                }
            }
        }
        return best;
    }
}

$('.board-space').on('click', function () {
    const $b = $(this);
    board[$b.attr('data-row')][$b.attr('data-col')] = player;
    console.log(board)
    $b.html('<p class="board-content">O');
});
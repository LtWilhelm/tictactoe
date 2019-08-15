let board = [[0,0,0], [0,0,0], [0,0,0]]
let player = -1;
let ai = 1;


function gameState(board) {
    if (!isMovesLeft(board)) return false;

    // checks each row
    board.foreach(element => {
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
    board.foreach(element => {
       if(element.includes(0)) return true;
    });
    return false;
}

function findBestMove(board){
    let bestMove = null;
    
}

function minimax(board, depth) {
    let score = gameState(board);

    if (score === 10 || score === -10) return score;

    const best = -1000;
    
    board.foreach(row => {
        row.foreach(col => {
            
        });
    });
}

$('.board-space').on('click', function () {
    const $b = $(this);
    board[$b.attr('data-row')][$b.attr('data-col')] = -1;
    console.log(board)
    $b.html('<p class="board-content">O');
});
// global variables
var board = [];
var player1 = '<span class="player1"></span>';
var player2 = '<span class="player2"></span>';
var currentPlayer = player1;
var player1wins = 0;
var player2wins = 0;

function createBoard(){
    // 2d board array
    board = [
        [0,0,0,0,0,0,0], // 0
        [0,0,0,0,0,0,0], // 1
        [0,0,0,0,0,0,0], // 2
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ];

    //board[row][col]

    // string to hold HTML output
    var html = '<table>';

    // create row of buttons
    html += '<thead><tr>';
    for(let col = 0; col < board[0].length; col++){
        html += '<td><button class="dropBtn" data-col="' + col + '">&darr;</button></td>';
    }
    html += '</tr></thead>';

    // loop through rows
    html += '<tbody>';
    for(let row = 0; row < board.length; row++){
        html += '<tr>';
        for(let col = 0; col < board[row].length; col++){
            html += '<td><span class="space"></span></td>';
        }

        html += '</tr>';
    }
    html += '</tbody>';

    html += '</table>';

    // output table using $.html()
    $('#board').html(html);

    // add click events
    $('#board .dropBtn').on('click', drop);
}

function drop(){
    // "this" is whatever called the function
    var col = $(this).attr('data-col');
    var col = $(this).data('col'); // only works if "data-" prefix is used

    for(let row = board.length - 1; row >= 0 ; row--){
        // check if spot is available
        if(board[row][col] === 0){
            // set board to current player
            board[row][col] = currentPlayer;

            // update table in the DOM
            putPiece(row, col);

            // check for a win
            check4win();

            // change to next player
            changePlayer();

            // disable button
            if(row === 0) {
                $(this).attr('disabled', 'disabled');
            }

            // exit loop
            break;
        }
    }
}

function putPiece(row, col){
    var delayMs = 50; // ms
    // loop for rows above final piece
    for(let i = 0; i <= row; i++){
        $('#board tbody tr:eq(' + i + ') td:eq(' + col + ') .space')
            .html(currentPlayer)
            .find('span')
            .fadeOut(0)
            .delay(delayMs * i)
            .fadeIn(0)
            .delay(delayMs)
            .fadeOut(0);

        // if final destination
        if(row === i){
            $('#board tbody tr:eq(' + i + ') td:eq(' + col + ') .space')
                .find('span')
                .fadeIn(0);
        }
    }

}

function changePlayer(){
    //                  (condition)         ? true value : false value
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    $('#currentPlayer').html(currentPlayer);
}

function check4win(){
    // check for horizontal win
    for(let row = 0; row < board.length; row++){
        for(let col = 0; col < board[row].length - 3; col++){
            if(board[row][col] === currentPlayer &&
                board[row][col+1] === currentPlayer &&
                board[row][col+2] === currentPlayer &&
                board[row][col+3] === currentPlayer ){
                // output winner and end
                endGame();
                return;
            }
        }
    }

    // check for vertical win
    for(let row = 0; row < board.length - 3; row++){
        for(let col = 0; col < board[row].length; col++){
            if(board[row][col] === currentPlayer &&
                board[row+1][col] === currentPlayer &&
                board[row+2][col] === currentPlayer &&
                board[row+3][col] === currentPlayer ){
                // output winner and end
                endGame();
                return;
            }
        }
    }

    // check for downward diagonal win
    for(let row = 0; row < board.length - 3; row++){
        for(let col = 0; col < board[row].length - 3; col++){
            if(board[row][col] === currentPlayer &&
                board[row+1][col+1] === currentPlayer &&
                board[row+2][col+2] === currentPlayer &&
                board[row+3][col+3] === currentPlayer ){
                // output winner and end
                endGame();
                return;
            }
        }
    }

    // check for upward diagonal win
    for(let row = 3; row < board.length; row++){
        for(let col = 0; col < board[row].length - 3; col++){
            if(board[row][col] === currentPlayer &&
                board[row-1][col+1] === currentPlayer &&
                board[row-2][col+2] === currentPlayer &&
                board[row-3][col+3] === currentPlayer ){
                // output winner and end
                endGame();
                return;
            }
        }
    }
}

function reset(){
    createBoard();
    $('#winner').html('');
}

function endGame(){
    $('#winner').html(currentPlayer + " WINS!!!");
    $('.dropBtn').attr('disabled', 'disabled');

}

// run when document is loaded
$(document).ready(function(){
    createBoard();

    $('#newGame').on('click', reset);
});
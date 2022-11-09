/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 let testing = false;
 
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 let currPlayer = 1; // active player: 1 or 2
 let isGameEnded = false;

 /** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
    // set "board" to empty HEIGHT x WIDTH matrix array
    //this can also be used to start a new game
    board = Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => null));
    finishGame(false)
}

/** makeHtmlBoard: make HTML table and row of column tops. */

const  makeHtmlBoard = () => {
    // get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.getElementById('board')
    htmlBoard.innerHTML = ''

    // TODO: add comment for this code
    //create the top row to handle the event propagation
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);

    //dynamically creates the row cells and generate the unique id for each one
    for (let x = 0; x < WIDTH; x++) {
        const headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }

    //append the created top row to the board 
    htmlBoard.append(top);

    // this code loops through the bidimensional array and place the game cells into the board
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell);
        }
        htmlBoard.append(row);
    }
}

/** lockBoard: This will lock the UI of the board after a game has ended */
const lockBoard = () => {
    const top = document.getElementById('column-top');
    top.classList.add('locked')
    top.removeEventListener('click', handleClick);
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {

    for (let i = board.length -1; i >= 0; i--) {
        if (board[i][x] === null) {
            return i
        }
    }

    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
    // make a div and insert into correct table cell
    const td = document.getElementById(`${y}-${x}`)
    const div = document.createElement('div')

    div.classList.add('piece', currPlayer == 1 ? 'p1' : 'p2')

    td.append(div)
}

/** endGame: announce game end */

const endGame = (msg = 'Game has ended') => {
    !testing && alert(msg)
    finishGame(true)
    lockBoard()
}
/** finishGame: change isGameEnded variable according to received parameter */
const finishGame = (ended = false) => {
    isGameEnded = ended
}

/** updateBoard: place the player numnber into x,y coordinate board array */
const updateBoard = (y, x) => {
    board[y][x] = currPlayer
}

/** switchPlayers: Switchs current active player number  */

const switchPlayers = () => {
    currPlayer = currPlayer == 1 ? 2 : 1
}

/** handleClick: handle click of column top to play piece */
const handleClick = (evt) => {
    //guard clause to prevent the game to continue after is ended
    if(isGameEnded) {
        return
    }    
    
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    placeInTable(y, x);
    //update in-memory board
    updateBoard(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // check if all cells in board are filled; if so call, call endGame
    board.every(arr => arr.every(cell => cell !== null)) && endGame('Game has ended in Tie')

    // switch players
    // switch currPlayer 1 <-> 2
    switchPlayers()
}

const colorWinningCells = (cells) => {
    cells.forEach( ([y, x]) => {
        const cell = document.getElementById(`${y}-${x}`);
        const piece = cell.querySelector('.piece')
        piece.classList.add('winner')
    });
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
    const _win = (cells) => {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer


        //add a modification to add a class to the winning cells
        const result =  cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );

        if(result) {
            colorWinningCells(cells)
        }

        return result
    }

    // read and understand this code. Add comments to help you.

    //iterates over the array height
    for (let y = 0; y < HEIGHT; y++) {
        //iterates over the array rows
        for (let x = 0; x < WIDTH; x++) {
            //try to find a match in horizontal
            let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            //try to find a match in vertical
            let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            //try to find a match in Diagonal to the right
            let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            //try to find a match in Diagonal to the left
            let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();
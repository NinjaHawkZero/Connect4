/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

//Y is height, X is width, Y is the row, X is the cell

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //Create 6 array rows, each with 7 undefined items, push into board array
  for (let y = 0; y < HEIGHT; y++) {   
    board.push(Array.from({ length: WIDTH }));
  }
}

console.log(board)
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  //Create table row element
  let top = document.createElement("tr");
  //Add id with value column-top
  top.setAttribute("id", "column-top");
  //Add event listener, upon click, call handleClick function
  top.addEventListener("click", handleClick);

  //For every x (7 columns)
  for (var x = 0; x < WIDTH; x++) {
    //Create a cell element
    let headCell = document.createElement("td");
    //Add an id, assigned with an x value, which correllates to the index it was created in
    headCell.setAttribute("id", x);
    //Append each cell to the "top" row
    top.append(headCell);
  }
  //Add row with 7 cells to top of board
  htmlBoard.append(top);

  // TODO: add comment for this code
  //For every y (6 rows)
  for (var y = 0; y < HEIGHT; y++) {
    //Create table row element
    const row = document.createElement("tr");
    //For every x (7 columns)
    for (var x = 0; x < WIDTH; x++) {
      //Create 7 cell elements for each row
      const cell = document.createElement("td");
      //Set id attributes for every cell, correllating to the y, x indexs in which they were created
      cell.setAttribute("id", `${y}-${x}`);
      //Append cell to row
      row.append(cell);
    }
    //Append row to board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //Given the x (column) loop from bottom row
  for (let y = HEIGHT - 1; y >= 0; y--) {
    //Return highest y (row) that's empty
    if (!board[y][x]) {
      return y;
    }
  }
  //Otherwise return null
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
//Pass index coordinates of cell
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //Create div, add piece class
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  //Get cell with index coordinates and append piece to position
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //Loop through, define variables with cell paths to winning
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //Call win function on each possible path to determine if a win has been made
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

//Assign values for player1 and player2. Used globally
const p1Val = 1;
const p2Val = 2;

/*
    creatGameboard() encapsulates all gameboard functions within the gameboard object 
    -Gameboard represents the 3x3 board itself within a 2D array
    -Each cell contains a value of 0, 1, or 2. 
    -0 represents unused cells. 1 and 2 represent players 1 and 2 respectively.
*/

function createGameboard(){

    //Allow the game design to be reused if necessary (for connect 4, etc.)
    const rows = 3;
    const cols = 3;
    const board = [];

    for (let i = 0; i < rows ;i++){
        board.push([]);
        for (let j = 0; j < cols; j++){
            board[i].push(0);
        }
    };

    const resetBoard = () => {
        //Loop to create the 2D gameboard. Initialize to 0s.
        for (let i = 0; i < rows ;i++){
            for (let j = 0; j < cols; j++){
                board[i][j] = 0;
            }
        }
    }

    //Function to place a tile, given the position and player. Called in the controller.
    //Returns true if successfully updated board. Returns false if the selected tile is already in use.
    const placeTile = (row, col, playerVal) => {
        if (getTile(row, col) === 0){
            board[row][col] = playerVal;
            return true;
        }
        return false;
    };

    //Function to access the val at a tile. 
    //Returns either 0, 1, or 2 if a valid indice is entered. Returns -1 if an invalid indice is given.
    const getTile = (row, col) => {
        isValidRow = (row > -1 && row < rows);
        isValidCol = (col > -1 && col < cols);

        if(!(isValidRow && isValidCol)){
            return -1;
        }

        return board[row][col];
    };

    //Function to check for empty tiles. If no empty tiles, the game is over. Returns true if there are empty tiles, false if not.
    const hasEmptyTiles = () => {
        //Loop through all tiles. Return true if a tile value equals 0.
        for (let i = 0; i < rows ;i++){
            for (let j = 0; j < cols; j++){
                if (board[i][j] === 0){
                    return true;
                }
            }
        }

        return false;
    }

    //Function to print the board to the console for testing
    const printBoard = () => {
        for(i = 0; i < rows; i++){
            console.log(board[i]);
        }
    };

    //Function to return the 2D board array
    const getBoard = () => {
        return board;
    }

    return {
        resetBoard,
        placeTile,
        getTile,
        hasEmptyTiles,
        printBoard,
        getBoard
    };
}







/*
    gameController() tracks the game state (whose turn it is, win cons, etc.)
    -
    -
*/
const SUCCESSFUL_ROUND = 0;
const UNSUCCESSFUL_ROUND = -1;
const GAME_WON = 1;
const GAME_TIE = 2;

function gameController(){

    //Turn tracker to identify whose turn it currently is. Initialized at player 1's turn
    let currentPlayerTurn = p1Val;

    //Create the gameboard object
    const board = createGameboard();

    //Function to reset game state. Sets currentPlayerTurn to p1Val & clears all tiles (set to a val of 0).
    const resetGame = () => {
        currentPlayerTurn = p1Val;
        board.resetBoard();
    }

    //Function to play a single round. Called each time a tile is selected. 
    //If the tile is already in use, returns -1. 
    //If tile is not in use, returns true and proceeds to next turn (updates currentPlayerTurn)
    const playRound = (row, col) => {

        //Place tile on gameboard. If placeTile returns false, return false.
        //If placeTile is successful (true), update currentPlayerTurn.
        if(!board.placeTile(row, col, currentPlayerTurn)){
            return UNSUCCESSFUL_ROUND;
        };

        
        if(checkWin(row,col)){
            return GAME_WON;
        }

        if(checkTie()){
            return GAME_TIE;
        }
        
       
        //If currentPlayerTurn == 1, changes to 2. If currentPlayerTurn ==2, changes to 1
        currentPlayerTurn = (currentPlayerTurn % 2) + 1;   

        board.printBoard();
        return SUCCESSFUL_ROUND;
    };

    //Function to check win conditions. Must be called each time a tile is placed successfully
    //Does not loop through the full array. Only checks the singular tile.
    //Takes row, col as args to check only relevant tiles around the newly placed tile
    const checkWin = (row, col) => {
        board.printBoard;

        //Store the value of the tile that is being checked
        origVal = board.getTile(row, col);

        //Loop and check all adjacent tiles
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++){
            for (colOffset = -1; colOffset <= 1; colOffset++){
                let currRow = row + rowOffset;
                let currCol = col + colOffset;

                rowWithinBounds = (currRow > -1) && (currRow < 3);
                colWithinBounds = (currCol > -1) && (currCol < 3);

                //Skip the input tile. Make sure the row and column are within valid indices
                if (!(rowOffset == 0 && colOffset == 0) && colWithinBounds && rowWithinBounds){
                    console.log("Entered loop. Cuurrent value of currRow : " + currRow + ".  Current Value of currCol :  " + currCol);
                    let adjVal = board.getTile(currRow, currCol);
                    console.log("Current value of adjVal: " + adjVal);
                    if (adjVal == origVal){
                        let nextTilePos = board.getTile(currRow + rowOffset, currCol + colOffset);    //Check value at next tile in the sequence in the positive direction
                        let nextTileNeg = board.getTile(row - rowOffset, col - colOffset);    //Check value at next tile in the sequence in the negative direction
                        console.log("checking next pos tile: " + nextTilePos);
                        console.log("checking next neg tile: " + nextTileNeg);

                        //If there are three tiles in a row, return true
                        if (nextTilePos == origVal || nextTileNeg == origVal){
                            console.log("Game over! Player " + origVal + " has won!")
                            resetGame();
                            return true;
                        }
                    }
                }
            }
        }

        return false;   //If no matches, return false
    };

    //Function to check for a tie. Uses hasEmptyTiles() from the gameboard.
    const checkTie = () => {

        if(board.hasEmptyTiles()){
            return false;
        }

        console.log("Game over! Game has ended in a tie.");
        resetGame();
        return true;
    }

    const printBoard = () => {
        board.printBoard();
    }

    const getActivePlayer = () => {
        return currentPlayerTurn;
    }

    return {
        resetGame,
        playRound,
        checkWin,
        checkTie,
        printBoard,
        getBoard: board.getBoard,
        getActivePlayer,
    };
}






/*
    *Set up the gameboard html using javascript
    *Generate divs within the html grid.
*/
function screenController(){

    const game = gameController();
    const board = game.getBoard();


    let htmlBoard = document.querySelector("#gameboard");

    //Function to set the screen display initially. Adds buttons with eventlisteners
    const resetScreen = () =>{

        //Create the buttons within the html grid
        board.forEach((row, rowInd) => {
            row.forEach((col, colInd)  => {
                const tileButton = document.createElement("button");
                tileButton.classList.add("tile")
                tileButton.dataset.row = rowInd;
                tileButton.dataset.col = colInd;
                //Add event listener to tiles. When clicked, call playRound in the gameController.
                //Must convert dataset attributes to int. They are defaultly set to strings in js
                tileButton.addEventListener("click", () => {
                    const row = parseInt(tileButton.dataset.row);
                    const col = parseInt(tileButton.dataset.col);
                    
                    const roundResult = game.playRound(row,col);
                    switch(roundResult) {
                        case SUCCESSFUL_ROUND: 
                            tileButton.textContent = game.getActivePlayer();
                            switchRoundDisplay();
                            break;
                        case UNSUCCESSFUL_ROUND:
                            break;
                        case GAME_TIE:
                            tileButton.textContent = game.getActivePlayer();
                            displayTie();
                            break;
                        case GAME_WON:
                            tileButton.textContent = game.getActivePlayer();
                            displayWin();
                            break;
                    }
                })
    
                htmlBoard.appendChild(tileButton);
            })
        })
    }

    headerTile = document.querySelector("#player-tile");
    headerPlayer = document.querySelector("#player-number")

    //Function to switch the display to show whose turn it is
    const switchRoundDisplay = () => {
        if(game.getActivePlayer() === p1Val){
            headerTile.textContent = "X"
            headerPlayer.textContent = p1Val + "'s turn";
        } else {
            headerTile.textContent = "O"
            headerPlayer.textContent = p2Val + "'s turn";
        }
    }

    //Function to adjust the screen display in case of a tie game
    const displayTie = () => {

    }

    //Function to adjust screen display in case of a won game
    const displayWin = () => {

    }

    resetScreen();
    
}

screenController();
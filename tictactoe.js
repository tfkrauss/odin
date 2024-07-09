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

    //Loop to create the 2D gameboard. Initialize to 0s.
    for (let i = 0; i < rows ;i++){
        board.push([]);
        for (let j = 0; j < cols; j++){
            board[i].push(0);
        }
    };



    //Function to place a tile, given the position and player. Called in the controller.
    //Returns true if successfully updated board. Returns false if the selected tile is already in use.
    const placeTile = (row, col, playerVal) => {
        if (getTile(row, col) === 0){
            board[row][col] = playerVal;
            return true;
        }
        return false;
    };

    //Function to access the val at a tile. Returns either 0, 1, or 2.
    const getTile = (row, col) => {
        return board[row][col];
    };

    //Function to print the board to the console for testing
    const printBoard = () => {
        for(i = 0; i < rows; i++){
            console.log(board[i]);
        }
    };

    return {
        placeTile,
        getTile,
        printBoard
    };
}


/*
    gameController() tracks the game state (whose turn it is, win cons, etc.)
    -
    -
*/

function gameController(){



    //Create a turn tracker to identify whose turn it currently is.
    //Begins the game on player 1s turn
    let currentPlayerTurn = p1Val;

    //Create the gameboard object
    const board = createGameboard();

    //create function to play a single round. Called each time a tile is selected. 
    //If the tile is already in use, returns false. 
    //If tile is not in use, returns true and proceeds to next turn (updates currentPlayerTurn)
    const playRound = (row, col) => {

        //Place tile on gameboard. If placeTile returns false, return false.
        //If placeTile is successful (true), update currentPlayerTurn.
        if(!board.placeTile(row, col, currentPlayerTurn)){
            return false;
        };

        //Check win status if a new tile is placed
        checkWin(row, col);

        //If currentPlayerTurn == 1, changes to 2. If currentPlayerTurn ==2, changes to 1
        currentPlayerTurn = (currentPlayerTurn % 2) + 1;   

        board.printBoard();
        return true;
    };

    //function to check win conditions. Called everytime a tile is placed.
    //Takes row, col as args to check only relevant tiles around the newly placed tile
    const checkWin = (row, col) => {
        
    };

    return {
        playRound,
        checkWin,
    };
}
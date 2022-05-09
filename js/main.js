// Constants
const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3,4,5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4 ,6]
] // nested arrays for every winning combination

// Variables
const cellElements = document.querySelectorAll('[data-cell') // selects all 9 cells
const board = document.getElementById('board') // selects the div containing our board
const winningMessage = document.getElementById('winningMessage') // selects the div that will show the winning/tie message on the webpage
const winningMessageText = document.querySelector('[data-winning-message-text]') // selects the div where the winning/tie message will be inserted into the DOM
const restartButton = document.getElementById('restartButton') // selects the restart button 
let oTurn //let's us know who's turn it is. True = O's turn // False = X's turn

// function call that starts the game
startGame();

//function that starts the game
function startGame(){
    oTurn = false // player X goes first
    cellElements.forEach(cell => { //loops through each cell 
        cell.classList.remove(X_CLASS) 
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick) // resets the board for each new game
        cell.addEventListener('click', handleClick, { once: true }) //only fire this EL and click event once - cell will not fire again once clicked so you won't be able to override a previous entry
    })
    setBoardHoverClass() // function call that enables the X or O to appear when hovering over a cell depending upon who's turn it is. Initial hover will be X class since oTurn is set to false
    winningMessage.classList.remove('show') // reverse the state of everything that's happened
}

// function that handles the click events
function handleClick(e){
    const cell = e.target // stores the cell that is clicked on
    const currentClass = oTurn ? O_CLASS : X_CLASS 
    placeMark(cell, currentClass) // function call that places the X or O in it's respective cell
    //check for Win
    if (checkWin(currentClass)){ // function call that checks to see if there is a winner
        endGame(false); // function call that ends the game
        //check for tie
    } else if(isTie()){ // function call that checks to see if the game ends in a tie
        endGame(true);
    } //switch turns only if there is no winner and the game is not a tie
    swapTurns() // function call that swaps turns
    setBoardHoverClass() // function call that enables the X or O to appear when hovering over a cell depending upon who's turn it is. Must be called AFTER the swapTurns() function so the X or O will appear based on who's turn it currently is
}

// function that places the X or O in it's respective cell
function placeMark(cell, currentClass){
    cell.classList.add(currentClass); 
}

// function that swaps player X's and O's turn
function swapTurns(){
    oTurn = !oTurn;
}

// function that allows the hover state to alternate after each turn
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(oTurn){ // adds O class if it is O's turn
        board.classList.add(O_CLASS) 
    } // adds X class if it is X's turn
        board.classList.add(X_CLASS)
}

// function that checks if there is a winner
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => { // loops over each winning combo to check if some are met by the current combo. This returns true if any of the values are true
        return combination.every(index => { // loops through each index to check if all (or every) value in that combo have the same class
            return cellElements[index].classList.contains(currentClass) // checks if the current class if in all 3 of the elements inside the combo
        })
    })
}

// function that ends the game
function endGame(tie){
    if(tie){
        winningMessageText.innerText = 'Tie Game - try again.' // inserts the winning message into the DOM
    } else { 
        winningMessageText.innerText = `${oTurn ? "O's" : "X's"} Wins!` // inserts the winning message into the DOM
    }
    winningMessage.classList.add('show') // displays the winning message on the webpage
}

// function that runs if there is a tie
function isTie(){
    return [...cellElements].every(cell => { // destructures the cellElements into an array so that we can use the .every() method. This method checks to make sure that every cell is filled with either an X OR O class
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS) // checks the class in each cell
    })
}

restartButton.addEventListener('click', startGame) // EL that calls the startGame() function
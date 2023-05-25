// Target elements needing functionality
let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
// Target the Class 'box' items and create an Array with the results
let boxes = Array.from(document.getElementsByClassName('box'));

// Create needed variables
const O_Player = "O";
const X_Player = "X";
let currentPlayer = X_Player;
// This creates an array of spaces and fills them with 'null' values to initialize the board
let spaces = Array(9).fill(null);

// Add eventListener to each box, and call the boxClicked method that determins what happens when a cell is clicked
const startGame = () =>
{
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e)
{
    // Target the clicked cell's ID
    const id = e.target.id;
    // If the box clicked's ID is null, proceed - This ensures a specific cell is not overwritten / or entered twice
    // Also check to see if there was a winner, so cells cannot be clicked after a winner is declared
    if (!spaces[id] && playerHasWon()==false)
    {
        // Set that cell to the current player, X or O
        spaces[id] = currentPlayer;
        // Display the text of that cell in the specified location
        e.target.innerText = currentPlayer;

        // Run the playerHasWon method to see if new clicked box has won the game
        if (playerHasWon() !== false)
        {
            playerText.innerText = `${currentPlayer} has won!`
            let winning_spaces = playerHasWon();

            console.log(winning_spaces);
            console.log("Press Restart to continue!");
            return;
        }
        // If the current player is = X_Player, change it to O_Player, otherwise change it to X_Player   
        currentPlayer = currentPlayer == X_Player ? O_Player : X_Player
        // Change the displayed player turn
        playerText.innerText = `Player ${currentPlayer}'s turn`
    }
}

// The following commented-out code was taken from a Youtube video I saw, but as I don't 
// fully understand the code syntax of using it in the playerHasWon method, I am ommitting it from my project
//
// Create array of winning combinations to compare the gameboard to
// const winningCombinations =
// [
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]
// ]

// This method compares the entries of all possible winning combinations and returns a winning combination
// Otherwise it returns false
function playerHasWon ()
{
    if (spaces[0] && (spaces[0] == spaces[1] && spaces[0] == spaces[2]))
    {
        return [0,1,2];
    }
    else if (spaces[3] && (spaces[3] == spaces[4] && spaces[3] == spaces[5]))
    {
        return [3,4,5];
    }
    else if (spaces[6] && (spaces[6] == spaces[7] && spaces[6] == spaces[8]))
    {
        return [6,7,8];
    }
    else if (spaces[0] && (spaces[0] == spaces[3] && spaces[0] == spaces[6]))
    {
        return [0,3,6];
    }
    else if (spaces[1] && (spaces[1] == spaces[4] && spaces[1] == spaces[7]))
    {
        return [1,4,7];
    }
    else if (spaces[2] && (spaces[2] == spaces[5] && spaces[2] == spaces[8]))
    {
        return [2,5,8];
    }
    else if (spaces[0] && (spaces[0] == spaces[4] && spaces[0] == spaces[8]))
    {
        return [0,4,8];
    }
    else if (spaces[2] && (spaces[2] == spaces[4] && spaces[2] == spaces[6]))
    {
        return [2,4,6];
    }
    else 
    {
        return false;
    }

    // This for-of loop puts each entry of winningCombinations into an array that's the condition
    // It then runs an if-statement to see if the values of spaces match that winningComination array
    // It continues this process until it reaches the end of the winningCombinations array
    //
    // for (const condition of winningCombinations)
    // {
    //     let [a, b, c] = condition;

    //     if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c]))
    //     {
    //         return [a,b,c];
    //     }
    // }
}
// Add eventListener to the restart button
restartBtn.addEventListener('click', restart)

function restart()
{
    // Refill the cells with a value of null
    spaces.fill(null);
    // Use the forEach method to cycle through each 'box' and reset the innerText to display nothing
    boxes.forEach( box =>
        {
            box.innerText = '';
        })
    //Reset the currentPlayer to X
    currentPlayer = X_Player;
    playerText.innerText = `Player X's turn`
}

startGame()
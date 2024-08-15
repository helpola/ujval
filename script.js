const board = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X';
let gameState = Array(9).fill("");

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== "" || !isGameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        alert(`${currentPlayer} has won!`);
        isGameActive = false;
    } else if (!gameState.includes("")) {
        alert("It's a draw!");
        isGameActive = false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    return roundWon;
};

const restartGame = () => {
    gameState = Array(9).fill("");
    board.forEach(cell => cell.textContent = "");
    currentPlayer = 'X';
    isGameActive = true;
};

board.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

let isGameActive = true;

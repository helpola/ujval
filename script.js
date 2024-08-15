const cells = document.querySelectorAll('.cell');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let singlePlayerMode = false;

function drawBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.className = 'cell';
        if (board[index] === 'X') {
            cell.classList.add('x');
        } else if (board[index] === 'O') {
            cell.classList.add('o');
        }
    });
}

function handleCellClick(event) {
    const index = Array.from(cells).indexOf(event.target);

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    drawBoard();
    handleResultValidation();
    if (singlePlayerMode && currentPlayer === 'O') {
        setTimeout(computerPlay, 500);
    }
}

function handleResultValidation() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        alert(`${currentPlayer} wins!`);
        return;
    }

    if (!board.includes('')) {
        gameActive = false;
        alert("It's a draw!");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function computerPlay() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = 'O';
    drawBoard();
    handleResultValidation();
}

function restartGame() {
    currentPlayer = 'X';
    board.fill('');
    gameActive = true;
    drawBoard();
}

function startSinglePlayer() {
    singlePlayerMode = true;
    restartGame();
}

function startMultiplayer() {
    singlePlayerMode = false;
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('restart-button').addEventListener('click', restartGame);
document.getElementById('singleplayer-btn').addEventListener('click', startSinglePlayer);
document.getElementById('multiplayer-btn').addEventListener('click', startMultiplayer);

drawBoard();

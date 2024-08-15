// script.js
const cells = document.querySelectorAll('.cell');
const winnerPopup = document.getElementById('winner-popup');
const winnerMessage = document.getElementById('winner-message');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');

let currentPlayer = 'x';
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].classList.contains(currentPlayer) &&
            cells[b].classList.contains(currentPlayer) &&
            cells[c].classList.contains(currentPlayer)) {
            return true;
        }
    }
    return false;
}

function handleClick(event) {
    if (!gameActive || event.target.classList.contains('x') || event.target.classList.contains('o')) return;
    
    event.target.classList.add(currentPlayer);
    if (checkWin()) {
        const winnerName = currentPlayer === 'x' ? player1NameInput.value || 'Player 1' : player2NameInput.value || 'Player 2';
        winnerMessage.textContent = `${winnerName} Wins!`;
        winnerPopup.classList.remove('hidden');
        gameActive = false;
    } else if ([...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
        winnerMessage.textContent = 'It\'s a Tie!';
        winnerPopup.classList.remove('hidden');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
}

function resetGame() {
    cells.forEach(cell => cell.classList.remove('x', 'o'));
    winnerPopup.classList.add('hidden');
    currentPlayer = 'x';
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

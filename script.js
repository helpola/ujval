// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const winnerPopup = document.getElementById('winner-popup');
    const winnerName = document.getElementById('winner-name');
    
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
                cell.classList.add('x'); // You can alternate between 'x' and 'o'
                checkForWinner(); // Function to check if there's a winner
            }
        });
    });

    function checkForWinner() {
        // Implement logic to determine the winner
        // For demonstration, we'll just show the popup
        winnerName.textContent = 'Player 1'; // Replace with actual player
        winnerPopup.classList.remove('hidden');
    }
});

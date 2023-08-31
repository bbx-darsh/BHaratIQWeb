const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameActive = true;

const cells = document.querySelectorAll('.cell');

function handleCellClick(cell) {
    const currentCellValue = cell.getAttribute('data-cell');
    if (currentCellValue || !gameActive) return;

    cell.setAttribute('data-cell', currentPlayer);
    cell.textContent = currentPlayer;
    
    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    
    if (checkDraw()) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            cells[a].getAttribute('data-cell') &&
            cells[a].getAttribute('data-cell') === cells[b].getAttribute('data-cell') &&
            cells[a].getAttribute('data-cell') === cells[c].getAttribute('data-cell')
        ) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return [...cells].every(cell => cell.getAttribute('data-cell') !== '');
}

function resetGame() {
    cells.forEach(cell => {
        cell.removeAttribute('data-cell');
        cell.textContent = '';
    });
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
}

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('cell')) {
        handleCellClick(event.target);
    }
});

resetBtn.addEventListener('click', resetGame);

status.textContent = `Player ${currentPlayer}'s turn`;

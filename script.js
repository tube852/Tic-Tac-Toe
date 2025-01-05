const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;

// Generate the board
function createBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    cellElement.dataset.index = index;
    cellElement.textContent = cell || "";
    cellElement.addEventListener("click", handleMove);
    boardElement.appendChild(cellElement);
  });
}

// Handle a player's move
function handleMove(event) {
  const index = event.target.dataset.index;
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  checkWinner();
  createBoard();
}

// Check for a winner or draw
function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusElement.textContent = `Player ${board[a]} wins!`;
      isGameOver = true;
      return;
    }
  }

  if (!board.includes(null)) {
    statusElement.textContent = "It's a draw!";
    isGameOver = true;
  } else {
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Reset the game
resetButton.addEventListener("click", () => {
  board = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  statusElement.textContent = "Player X's turn";
  createBoard();
});

// Initialize the game
createBoard();
statusElement.textContent = "Player X's turn";

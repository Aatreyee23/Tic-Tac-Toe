document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    }

    function checkDraw() {
        return board.every(cell => cell !== "");
    }

    function updateStatus() {
        const winner = checkWinner();
        const winnerMessage = document.getElementById("winnerMessage");
        const winnerModal = document.getElementById("winnerModal");

        if (winner) {
            status.textContent = `Player ${winner} wins!`;
            winnerMessage.textContent = `Player ${winner} wins!`;
            winnerModal.style.display = "block";
        } else if (checkDraw()) {
            status.textContent = "It's a draw!";
            alert("It's a draw!");
        } else {
            status.textContent = `Current Player: ${currentPlayer}`;
        }
    }

    document.getElementById("resetBtn").addEventListener("click", function() {
        resetGame();
        document.getElementById("winnerModal").style.display = "none";
    });

    document.querySelector(".close").addEventListener("click", function() {
        document.getElementById("winnerModal").style.display = "none";
    });


    function showModal(message) {
        const modal = document.getElementById("winnerModal");
        const modalMessage = document.getElementById("modalMessage");
        modalMessage.textContent = message;
        modal.style.display = "block";
    }

    function closeModal() {
        const modal = document.getElementById("winnerModal");
        modal.style.display = "none";
    }

    function handleCellClick(index) {
        if (board[index] === "" && !checkWinner() && !checkDraw()) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatus();
        }
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        cells.forEach(cell => cell.textContent = "");
        updateStatus();
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    resetBtn.addEventListener("click", resetGame);

    updateStatus();
});

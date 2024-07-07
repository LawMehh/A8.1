document.addEventListener("DOMContentLoaded", function() {
    const chessboard = document.getElementById("chessboard");
    const startButton = document.getElementById("startButton");
    const clearButton = document.getElementById("clearButton");

    // Initial placement of pieces on the board
    const pieces = [
        '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
        '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
        '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'
    ];

    let selectedPiece = null;

    // Function to initialize the chessboard
    function startGame() {
        chessboard.innerHTML = ''; // Clear the chessboard
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement("div");
                square.className = "square";
                square.dataset.index = row * 8 + col; // Store the index of the square
                square.innerHTML = pieces[row * 8 + col]; // Place the piece (if any) on the square
                
                // Apply correct color
                if ((row + col) % 2 === 0) {
                    square.classList.add('light');
                } else {
                    square.classList.add('dark');
                }
                
                chessboard.appendChild(square);
            }
        }
    }

    // Function to clear the chessboard
    function clearBoard() {
        chessboard.innerHTML = ''; // Clear the chessboard
    }

    // Add event listener for the start button
    startButton.addEventListener("click", startGame);

    // Add event listener for the clear button
    clearButton.addEventListener("click", clearBoard);

    // Handle click events on the chessboard
    chessboard.addEventListener("click", function(event) {
        const target = event.target;
        const index = target.dataset.index;

        // Select a piece if one is not already selected
        if (!selectedPiece && target.innerHTML) {
            selectedPiece = { piece: target.innerHTML, index };
            target.classList.add("selected");
        } 
        // Move the selected piece to the new square
        else if (selectedPiece && target !== selectedPiece) {
            chessboard.children[selectedPiece.index].innerHTML = "";
            target.innerHTML = selectedPiece.piece;
            selectedPiece = null;

            // Remove the selected class from all squares
            document.querySelectorAll(".square").forEach(square => square.classList.remove("selected"));
        }
    });
});

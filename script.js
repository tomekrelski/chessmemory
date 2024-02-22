// Function to fetch JSON data
async function fetchOpeningsData() {
    try {
        const response = await fetch('chessopenings.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching openings data:', error);
    }
}

// Function to populate dropdown with opening names
function populateDropdown(openingsData) {
    const dropdownMenu = document.getElementById('openingList');
    const blackMemoryTestButton = document.getElementById('blackMemoryTestButton');
    const whiteMemoryTestButton = document.getElementById('whiteMemoryTestButton');
    const bothMemoryTestButton = document.getElementById('bothMemoryTestButton');

    openingsData.openings.forEach(opening => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('dropdown-item');
        button.textContent = opening.name;
        button.addEventListener('click', () => {
            document.getElementById('learnButton').textContent = `Learn Opening ${opening.name}`;
            blackMemoryTestButton.textContent = `Black Memory Test ${opening.name}`;
            whiteMemoryTestButton.textContent = `White Memory Test ${opening.name}`;
            bothMemoryTestButton.textContent = `White & Black Memory Test ${opening.name}`;
        });
        li.appendChild(button);
        dropdownMenu.appendChild(li);
    });
}

// Function to show moves for the selected opening
function showMovesForOpening(opening) {
    const moves = opening.moves;
    let moveText = "Moves:\n";
    moveText += "White: " + moves.white.join(" ") + "\n";
    moveText += "Black: " + moves.black.join(" ") + "\n";
    alert(moveText);
}

// Function to check if the entered moves match the moves for the selected opening
function checkMovesForOpening(opening, player) {
    let enteredMoves;
    if (player === "Both") {
        const whiteMoves = prompt("Enter the White moves separated by spaces (e.g., e4 Nf6 Bb5):");
        const blackMoves = prompt("Enter the Black moves separated by spaces (e.g., e5 Nc6 d4):");
        enteredMoves = whiteMoves + " " + blackMoves;
    } else {
        enteredMoves = prompt(`Enter the ${player} moves separated by spaces (e.g., e4 Nf6 Bb5):`);
    }
    const enteredMovesArray = enteredMoves.split(" ").map(move => move.trim());
    const moves = opening.moves;
    const expectedMoves = player === "White" ? moves.white : player === "Black" ? moves.black : moves.white.concat(moves.black);

    let isCorrect = true;
    if (enteredMovesArray.length !== expectedMoves.length) {
        isCorrect = false;
    } else {
        for (let i = 0; i < enteredMovesArray.length; i++) {
            if (enteredMovesArray[i] !== expectedMoves[i]) {
                isCorrect = false;
                break;
            }
        }
    }

    if (isCorrect) {
        alert("Correct moves!");
    } else {
        alert("Wrong moves. Please try again.");
    }
}

// Main function

async function main() {
    const openingsData = await fetchOpeningsData();
    populateDropdown(openingsData);

    // Adding click event listener to the Learn Opening button
    document.getElementById('learnButton').addEventListener('click', () => {
        const currentOpening = document.getElementById('learnButton').textContent.replace("Learn Opening ", "");
        if (currentOpening === "Learn Opening") {
            alert("Please choose an opening first.");
        } else {
            // Find the selected opening and show its moves
            const opening = openingsData.openings.find(o => o.name === currentOpening);
            showMovesForOpening(opening);
        }
    });

    // Adding click event listener to the Black Memory Test button
    document.getElementById('blackMemoryTestButton').addEventListener('click', () => {
        const currentOpening = document.getElementById('learnButton').textContent.replace("Learn Opening ", "");
        if (currentOpening === "Learn Opening") {
            alert("Please choose an opening first.");
        } else {
            // Find the selected opening and check entered moves for black player
            const opening = openingsData.openings.find(o => o.name === currentOpening);
            checkMovesForOpening(opening, "Black");
        }
    });

    // Adding click event listener to the White Memory Test button
    document.getElementById('whiteMemoryTestButton').addEventListener('click', () => {
        const currentOpening = document.getElementById('learnButton').textContent.replace("Learn Opening ", "");
        if (currentOpening === "Learn Opening") {
            alert("Please choose an opening first.");
        } else {
            // Find the selected opening and check entered moves for white player
            const opening = openingsData.openings.find(o => o.name === currentOpening);
            checkMovesForOpening(opening, "White");
        }
    });

    // Adding click event listener to the White & Black Memory Test button
    document.getElementById('bothMemoryTestButton').addEventListener('click', () => {
        const currentOpening = document.getElementById('learnButton').textContent.replace("Learn Opening ", "");
        if (currentOpening === "Learn Opening") {
            alert("Please choose an opening first.");
        } else {
            // Find the selected opening and check entered moves for both players
            const opening = openingsData.openings.find(o => o.name === currentOpening);
            checkMovesForOpening(opening, "Both");
        }
    });

}

// Call the main function
main();

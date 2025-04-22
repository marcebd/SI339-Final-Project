const gridSize = 12;
const mazeGrid = document.getElementById("maze-grid");
const mazeStatus = document.getElementById("maze-status");
const mazeVictory = document.getElementById("maze-victory");

let player = { row: 0, col: 0 };

const blockers = new Set([
  "1,1", "1,2", "1,3", "2,3", "3,3", "4,3", "4,2", "4,1", "5,1", "6,1",
  "5,5", "6,5", "7,5", "8,5", "9,5", "10,5", "10,6", "10,7", "9,7",
  "3,8", "4,8", "5,8", "6,8", "7,8", "8,8", "8,9", "8,10", "7,10", "6,10",
  "2,10", "2,11", "2,9", "0,6", "1,6", "2,6"
]);

// Button text variations for blockers
const buttonTexts = [
  "Click", "Submit", "Send", "OK", "Cancel", "Next", "Back", "Menu", 
  "Save", "Delete", "Edit", "View", "Close", "Open", "Start"
];

function createMaze() {
  mazeGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  mazeGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      const key = `${row},${col}`;
      cell.classList.add("maze-cell");
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);

      const button = document.createElement("button");
      button.classList.add("maze-button");
      
      if (key === "11,11") {
        button.classList.add("goal-button");
        button.innerHTML = '👑<br>Queen';
        cell.classList.add("goal");
      } else if (key === "0,0") {
        button.classList.add("player-button");
        button.innerHTML = '🧑';
        cell.classList.add("player");
      } else if (blockers.has(key)) {
        button.classList.add("blocker-button");
        // Get random button text
        button.textContent = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
        cell.classList.add("block");
      } else {
        button.classList.add("path-button");
        button.innerHTML = '-';
        cell.classList.add("path");
      }
      
      // Prevent button clicks from moving the player
      button.addEventListener('click', (e) => e.preventDefault());
      cell.appendChild(button);
      mazeGrid.appendChild(cell);
    }
  }
}

function updatePlayerPosition(newRow, newCol) {
  const newKey = `${newRow},${newCol}`;
  if (newRow < 0 || newCol < 0 || newRow >= gridSize || newCol >= gridSize || blockers.has(newKey)) {
    mazeStatus.textContent = "⛔ That button is blocking your path!";
    return;
  }

  const oldCell = document.querySelector(".player");
  if (oldCell) {
    oldCell.classList.remove("player");
    const oldButton = oldCell.querySelector("button");
    oldButton.classList.remove("player-button");
    oldButton.innerHTML = '-';
  }

  player.row = newRow;
  player.col = newCol;

  const newCell = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
  newCell.classList.add("player");
  const newButton = newCell.querySelector("button");
  newButton.classList.add("player-button");
  newButton.innerHTML = '🧑';

  if (newKey === "11,11") {
    mazeGrid.style.display = "none";
    mazeStatus.style.display = "none";
    mazeVictory.classList.remove("hidden");
    mazeVictory.classList.add("visible");
  } else {
    mazeStatus.textContent = `Navigate through the buttons using arrow keys`;
  }
}

document.addEventListener("keydown", (e) => {
  if (!mazeVictory.classList.contains("visible")) {
    const { row, col } = player;
    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        e.preventDefault();
        updatePlayerPosition(row - 1, col);
        break;
      case "ArrowDown":
      case "s":
      case "S":
        e.preventDefault();
        updatePlayerPosition(row + 1, col);
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        e.preventDefault();
        updatePlayerPosition(row, col - 1);
        break;
      case "ArrowRight":
      case "d":
      case "D":
        e.preventDefault();
        updatePlayerPosition(row, col + 1);
        break;
    }
  }
});

createMaze();

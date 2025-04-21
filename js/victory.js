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

function getPositionDescription(row, col) {
  return `Row ${row + 1}, Column ${col + 1} of ${gridSize}`;
}

function createMaze() {
  // Set up maze container with proper ARIA attributes
  mazeGrid.setAttribute('role', 'application');
  mazeGrid.setAttribute('aria-label', 'Maze Game - Use arrow keys to navigate');
  mazeGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  mazeGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  // Add keyboard instructions
  const instructions = document.createElement('div');
  instructions.setAttribute('role', 'note');
  instructions.className = 'sr-only';
  instructions.textContent = 'Use arrow keys or W, A, S, D keys to move through the maze. Avoid blocked paths and reach the Queen at the bottom right.';
  mazeGrid.parentNode.insertBefore(instructions, mazeGrid);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      const key = `${row},${col}`;
      cell.classList.add("maze-cell");
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('aria-label', getPositionDescription(row, col));

      // Only create buttons for player, goal, and blockers
      if (key === "11,11" || key === "0,0" || blockers.has(key)) {
        const button = document.createElement("button");
        button.classList.add("maze-button");
        
        if (key === "11,11") {
          button.classList.add("goal-button");
          button.innerHTML = '👑<br>Queen';
          button.setAttribute('aria-label', 'Queen\'s location - Goal');
          cell.classList.add("goal");
          cell.setAttribute('aria-label', `Goal: ${getPositionDescription(row, col)}`);
        } else if (key === "0,0") {
          button.classList.add("player-button");
          button.innerHTML = '🧑';
          button.setAttribute('aria-label', 'Player current position');
          cell.classList.add("player");
          cell.setAttribute('aria-label', `Player at ${getPositionDescription(row, col)}`);
        } else if (blockers.has(key)) {
          button.classList.add("blocker-button");
          const buttonText = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
          button.textContent = buttonText;
          button.setAttribute('aria-label', `Blocked path: ${buttonText} button`);
          cell.classList.add("block");
          cell.setAttribute('aria-label', `Blocked at ${getPositionDescription(row, col)}`);
        }
        
        // Prevent button clicks from moving the player
        button.addEventListener('click', (e) => e.preventDefault());
        cell.appendChild(button);
      } else {
        // For path cells, just add the path class without a button
        cell.classList.add("path");
        cell.setAttribute('aria-label', `Open path at ${getPositionDescription(row, col)}`);
      }
      
      mazeGrid.appendChild(cell);
    }
  }

  // Add description of maze layout
  const mazeDescription = document.createElement('div');
  mazeDescription.setAttribute('role', 'note');
  mazeDescription.className = 'sr-only';
  mazeDescription.textContent = `The maze is ${gridSize} by ${gridSize}. You start at the top left. The Queen is at the bottom right. Various buttons block your path.`;
  mazeGrid.parentNode.insertBefore(mazeDescription, mazeGrid);
}

function updatePlayerPosition(newRow, newCol) {
  const newKey = `${newRow},${newCol}`;
  if (newRow < 0 || newCol < 0 || newRow >= gridSize || newCol >= gridSize || blockers.has(newKey)) {
    mazeStatus.textContent = "⛔ That path is blocked!";
    return;
  }

  const oldCell = document.querySelector(".player");
  if (oldCell) {
    oldCell.classList.remove("player");
    oldCell.setAttribute('aria-label', `Open path at ${getPositionDescription(parseInt(oldCell.dataset.row), parseInt(oldCell.dataset.col))}`);
    const oldButton = oldCell.querySelector("button");
    if (oldButton) {
      oldButton.remove();
    }
  }

  player.row = newRow;
  player.col = newCol;

  const newCell = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
  newCell.classList.add("player");
  newCell.setAttribute('aria-label', `Player at ${getPositionDescription(newRow, newCol)}`);
  
  const playerButton = document.createElement("button");
  playerButton.classList.add("maze-button", "player-button");
  playerButton.innerHTML = '🧑';
  playerButton.setAttribute('aria-label', 'Player current position');
  newCell.appendChild(playerButton);

  if (newKey === "11,11") {
    mazeGrid.style.display = "none";
    mazeStatus.style.display = "none";
    mazeVictory.classList.remove("hidden");
    mazeVictory.classList.add("visible");
    mazeVictory.focus();
  } else {
    const distanceToGoal = Math.abs(11 - newRow) + Math.abs(11 - newCol);
    mazeStatus.textContent = `You are ${distanceToGoal} steps away from the Queen. ${getPositionDescription(newRow, newCol)}`;
  }
}

document.addEventListener("keydown", (e) => {
  if (!mazeVictory.classList.contains("visible")) {
    const { row, col } = player;
    let moved = false;

    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        e.preventDefault();
        updatePlayerPosition(row - 1, col);
        moved = true;
        break;
      case "ArrowDown":
      case "s":
      case "S":
        e.preventDefault();
        updatePlayerPosition(row + 1, col);
        moved = true;
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        e.preventDefault();
        updatePlayerPosition(row, col - 1);
        moved = true;
        break;
      case "ArrowRight":
      case "d":
      case "D":
        e.preventDefault();
        updatePlayerPosition(row, col + 1);
        moved = true;
        break;
    }

    // Announce available moves after each movement
    if (moved) {
      announceAvailableMoves(player.row, player.col);
    }
  }
});

function announceAvailableMoves(row, col) {
  const moves = [];
  if (row > 0 && !blockers.has(`${row-1},${col}`)) moves.push("up");
  if (row < gridSize-1 && !blockers.has(`${row+1},${col}`)) moves.push("down");
  if (col > 0 && !blockers.has(`${row},${col-1}`)) moves.push("left");
  if (col < gridSize-1 && !blockers.has(`${row},${col+1}`)) moves.push("right");
  
  const moveAnnouncement = document.createElement('div');
  moveAnnouncement.setAttribute('role', 'status');
  moveAnnouncement.className = 'sr-only';
  moveAnnouncement.textContent = `Available moves: ${moves.join(", ")}`;
  mazeGrid.parentNode.appendChild(moveAnnouncement);
  
  // Remove the announcement after it's been read
  setTimeout(() => moveAnnouncement.remove(), 1000);
}

createMaze();

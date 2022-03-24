$(document).ready();

let player_x_markings = [];
let player_o_markings = [];

let currentPlayerTurn = "X"; // example: "playerX" or playerO

const winning_combinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [7, 5, 3],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

$(".grid-cell").on("click", function (eventObject) {
  const clickedDiv = eventObject.target;
  const gridNum = Number(clickedDiv.getAttribute("grid-num"));
  renderPlayerChoice(clickedDiv);
  validateChoice(gridNum);
});

function validateChoice(gridNum) {
  playerMarkChoice(gridNum);
  const hasPlayerWon = checkWinningCombinations();
  // If winning combination found, log a string letting the player know that they've won.
  if (hasPlayerWon === true) {
    renderPlayerWin();
    endGame();
  } else {
    if (checkDraw()) {
      renderDraw();
      endGame();
    } else {
      switchPlayers();
      renderPlayerTurn();
    }
  }
}
// 1. Function that will take a grid number selection, starting with player X turn.
// 2. Add that number to player_x_markings array

function playerMarkChoice(gridNum) {
  if (currentPlayerTurn === "X") {
    player_x_markings.push(gridNum);
  }
  if (currentPlayerTurn === "O") {
    player_o_markings.push(gridNum);
  }
}

function checkDraw() {
  if (player_x_markings.length + player_o_markings.length === 9) {
    return true;
  }
}

function checkWinningCombinations() {
  let result;
  winning_combinations.forEach(function (childArray) {
    if (result === true) {
      return;
    }
    result = childArray.every(function (element) {
      if (currentPlayerTurn === "X") {
        return player_x_markings.includes(element);
      }
      if (currentPlayerTurn === "O") {
        return player_o_markings.includes(element);
      }
    });
  });
  return result;
}

function renderPlayerWin() {
  $(".game-result").text(`Player ${currentPlayerTurn} wins!`);
}

function renderDraw() {
  $(".game-result").text(`The game is a draw!`);
}

//Function to switch player turns.

function switchPlayers() {
  currentPlayerTurn = currentPlayerTurn === "X" ? "O" : "X";
}

function renderPlayerTurn() {
  $(".player-turn").text(currentPlayerTurn);
}

$("#restart").click(restartGame);

function restartGame() {
  // empty arrays
  player_x_markings = [];
  player_o_markings = [];
  // default player turn
  currentPlayerTurn = "X";
  renderPlayerTurn();
  // empty inner html text
  $(".grid-cell").text("");
  $(".game-result").text("");
  $(".grid-cell").removeClass("disable-game");
}

function endGame() {
  $(".grid-cell").addClass("disable-game");
}

function renderPlayerChoice(clickedDiv) {
  const $clickedDiv = $(clickedDiv);
  if ($clickedDiv.text() === "") {
    $clickedDiv.text(currentPlayerTurn);
    $clickedDiv.addClass("disable-game");
  }
}

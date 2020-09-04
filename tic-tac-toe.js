let player = "X";
let squareValues = ["", "", "", "", "", "", "", "", ""];
let winner = "";
let stopProp = false;

function saveGame() {
  window.localStorage.setItem("squareValues", squareValues);
  window.localStorage.setItem("winner", winner);
  window.localStorage.setItem("player", player);
}

window.addEventListener("DOMContentLoaded", (event) => {
  if (window.localStorage.getItem("player")) {
    squareValues = window.localStorage.getItem("squareValues").split(",");
    player = window.localStorage.getItem("player");
    winner = window.localStorage.getItem("winner");
    squareValues.forEach(function (element, i) {
      playerLowercase = element.toLowerCase();
      if (element !== "") {
        const img = document.createElement("img");
        img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${element.toLowerCase()}.svg`;
        document.getElementById(`square-${i}`).appendChild(img);
      }
    });
    document.getElementById("game-status").innerHTML = winner;
  }
  const board = document.getElementById(`tic-tac-toe-board`);
  const checkWinner = (squareValues) => {
    for (let i = 0; i < squareValues.length; i += 3) {
      // rows
      const el1 = squareValues[i];
      const el2 = squareValues[i + 1];
      const el3 = squareValues[i + 2];
      if (el1 !== "" && el1 === el2 && el2 === el3) {
        winner = `Winner: ${el1}`;
        stopProp = true;
      }
    }
    for (let i = 0; i < 3; i += 1) {
      // columns
      const el1 = squareValues[i];
      const el2 = squareValues[i + 3];
      const el3 = squareValues[i + 6];
      if (el1 !== "" && el1 === el2 && el2 === el3) {
        winner = `Winner: ${el1}`;
        stopProp = true;
      }
    }
    for (let i = 0; i < 3; i += 1) {
      // columns
      const el1 = squareValues[i];
      const el2 = squareValues[i + 3];
      const el3 = squareValues[i + 6];
      if (el1 !== "" && el1 === el2 && el2 === el3) {
        winner = `Winner: ${el1}`;
        stopProp = true;
      }
    }
    if (
      squareValues[4] !== "" &&
      ((squareValues[0] === squareValues[4] &&
        squareValues[4] === squareValues[8]) ||
        (squareValues[2] === squareValues[4] &&
          squareValues[4] === squareValues[6]))
    ) {
      winner = `Winner: ${squareValues[4]}`;
      stopProp = true;
      console.log(stopProp);
    }
    if (!squareValues.includes("") && winner === "") {
      winner = "None! Tied you losers!";
    }
    document.getElementById("game-status").innerHTML = winner;
  };

  board.addEventListener("click", (event) => {
    if (stopProp) {
      return;
    } else {
      const playerLowercase = player.toLowerCase();
      const targetId = event.target.id;
      const squareIndex = Number.parseInt(targetId[targetId.length - 1]);
      if (squareValues[squareIndex] !== "") {
        return;
      } else {
        const img = document.createElement("img");
        img.setAttribute(
          "src",
          `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${playerLowercase}.svg`
        );
        img.setAttribute("id", player);
        event.target.appendChild(img);
      }
      squareValues[squareIndex] = player;
      if (player === "X") {
        player = "O";
      } else {
        player = "X";
      }
      checkWinner(squareValues);
      saveGame();
    }
  });
});
document.querySelector(".actions").addEventListener("click", (event) => {
  if (event.target.innerText === "New Game" && winner !== "") {
    localStorage.clear();
    location.reload();
  }
  if (event.target.innerText === "Give Up" && winner === "") {
    winner = player === "X" ? `Winner: O` : `Winner: X`;
    document.getElementById("game-status").innerHTML = winner;
    stopProp = true;
    window.localStorage.setItem("winner", winner);
    document.querySelector(".actions").addEventListener("click", (event) => {
      if (event.target.innerText === "New Game" && winner !== "") {
        localStorage.clear();
        location.reload();
      }
    });
  }
});

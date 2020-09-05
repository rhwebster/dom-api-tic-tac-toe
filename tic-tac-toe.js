let player = "X";
let squareValues = ["", "", "", "", "", "", "", "", ""];
let winner = "";
let stopProp = false;
const board = document.getElementById(`tic-tac-toe-board`);
let giveUpButton = document.getElementById('give-up');
let newGameButton = document.getElementById('new-game');
giveUpButton.disabled = false;
newGameButton.disabled = false;

function saveGame() {
  window.localStorage.setItem("squareValues", squareValues);
  window.localStorage.setItem("winner", winner);
  window.localStorage.setItem("player", player);
}

function getRandomInt(n) {
  return Math.floor(Math.random() * Math.floor(n))
}

const checkWinner = () => {
  for (let i = 0; i < 9; i += 3) {
    // rows
    const el1 = squareValues[i];
    const el2 = squareValues[i + 1];
    const el3 = squareValues[i + 2];
    if (el1 !== "" && el1 === el2 && el2 === el3) {
      winner = `Winner: ${el1}`;
      giveUpButton.disabled = true;
      newGameButton.disabled = false
      // stopProp = true;
    }
  }
 
  for (let i = 0; i < 3; i += 1) {
    // columns
    const el1 = squareValues[i];
    const el2 = squareValues[i + 3];
    const el3 = squareValues[i + 6];
    if (el1 !== "" && el1 === el2 && el2 === el3) {
      winner = `Winner: ${el1}`;
      giveUpButton.disabled = true;
      newGameButton.disabled = false
      // stopProp = true;
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
    giveUpButton.disabled = true;
    newGameButton.disabled = false
    // stopProp = true;
    console.log(stopProp);
  }
  if (!squareValues.includes("") && winner === "") {
    winner = "Winner: None";
    console.log('Tied suckers!')
    giveUpButton.disabled = true;
    newGameButton.disabled = false;
  }
  document.getElementById("game-status").innerHTML = winner;
};

function computerPlays() {
  let computerSpace = getRandomInt(9)
  
  if (squareValues[computerSpace] === '') {
    const img = document.createElement("img");
    img.src = `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${player.toLowerCase()}.svg`;
    document.getElementById(`square-${computerSpace}`).appendChild(img);
    squareValues[computerSpace] = player
    
    if (player === "X") {
      player = "O";
    } else {
      player = "X";
    }

    checkWinner()
    document.getElementById("game-status").innerHTML = winner;
    saveGame();
    return;
  } else {
    computerPlays();
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  const isEmpty = el => el === '';
  
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

  if (Math.random() >= .5 && squareValues.every(isEmpty)) {
    setTimeout(computerPlays, 500)
  }

  
 
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

      checkWinner();
      saveGame();

      if (event.target.id.startsWith('square-') && winner === '') {
        setTimeout(computerPlays, 1000)
      }
    }
  });
});

document.querySelector(".actions").addEventListener("click", (event) => {
  if (event.target.id === "new-game" && winner !== "") {
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

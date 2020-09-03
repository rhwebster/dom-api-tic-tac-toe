let squareValues = ["", "", "", "", "", "", "", "", ""];
window.addEventListener("DOMContentLoaded", (event) => {
  const board = document.getElementById(`tic-tac-toe-board`);
  let count = 0;
  let player = null;
  let ifEmptyFunc;

  const addPlayerSymbol = (element, squareIndex) => {
    if (ifEmptyFunc && count % 2 !== 0) {
      player = "X";
      const img = document.createElement("img");
      img.setAttribute(
        "href",
        "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg"
      );
      img.setAttribute("id", "X");
      element.appendChild(img);
      squareValue[squareIndex] = player;
    } else if (ifEmptyFunc && count % 2 === 0) {
      player = "O";
      const img = document.createElement("img");
      img.setAttribute(
        "href",
        "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"
      );
      img.setAttribute("id", "O");
      element.appendChild(img);
      squareValue[squareIndex] = player;
    }
  };
  board.addEventListener("click", (event) => {
    count++;
    const target = event.target.id;
    const squareIndex = Number.parseInt(target[target.length - 1]);
    ifEmptyFunc = (ifEmpty = (element, squareIndex) => {
      if (squareValues[squareIndex] === "") {
        return true;
      } else {
        return false;
      }
    })();
    addPlayerSymbol(event.target, squareIndex);
  });
});

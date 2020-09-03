window.addEventListener("DOMContentLoaded", (event) => {
    const board = document.getElementById(`tic-tac-toe-board`);
    let count = 0
    let player
    board.addEventListener('click', (event) => {
        count++
        addPlayerSymbol(event.target)
    });

    const ifEmpty = (element) => {}
    const addPlayerSymbol = element => {
        if (ifEmpty(element) && (count % 2 !== 0)) {
            player = 'X';
            const img = document.createElement('img');
            img.setAttribute('href', 'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg');
            img.setAttribute('id', 'X');
            element.appendChild(img);
        } 
    }
})

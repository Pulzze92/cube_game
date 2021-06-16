let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);

function startGame() {
    isGameStarted = true;
    $game.style.backgroundColor = '#fff';
    $start.classList.add('hide');

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent);
        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);
    renderBox();
}

function endGame() {
    isGameStarted = false;
}

function handleBoxClick(e) {
    if (!isGameStarted) {
        return;
    }
    if (e.target.dataset) {
        renderBox();
        score++;
    }
}

function renderBox() {
    $game.innerHTML = '';
    let box = document.createElement('div');
    let boxSize = getRandom(30, 100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLength = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLength) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
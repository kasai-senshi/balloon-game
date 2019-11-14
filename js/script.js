const body = document.body;
const totalShadow = document.querySelector('.total-shadow');
const startBtn = document.querySelector('.start-game-button');
const colors = ['red', 'green', 'blue', 'yellow', 'violet'];
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
let score = document.querySelectorAll('.score');
let num = 0;
const total = 100;
let gameOver = false;
let currentBalloon = 0;

// Generate balloon
function createBalloon() {
    let div = document.createElement('div');
    // random color
    let rand = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[rand];
    // coming out of a random position
    rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;

    // append balloon
    body.appendChild(div);
    animateBalloon(div);
}

// Balloon animation
function animateBalloon(elem) {
    let pos = 0;
    // Float to top at differen pace
    let random = Math.floor(Math.random() * 6 - 3);
    // Every 10 popped balloons, the speed increases
    let interval = setInterval(frame, 12 - (num / 10) + random);
    // Move balloon by frames
    function frame() {
        // if balloon reaches the top
        if (pos >= (windowHeight + 200) && (document.querySelector('[data-number="' + elem.dataset.number + '"]')) !== null) {
            // stop animation
            clearInterval(interval);
            gameOver = true;
        } else {
            pos++;
            // animate
            elem.style.top = windowHeight - pos + 'px';
        }
    }
}

// DeleteBalloon
function deleteBalloon(elem) {
    elem.remove();
    num++
    updateScore();
}

// Update Score
function updateScore() {
    score.forEach(element => {
        element.textContent = num;
    });
}

// Pop balloon
body.addEventListener('click', (event) => {
    if (event.target.classList.contains('balloon')) {
        deleteBalloon(event.target);
        playPop();
    }
});
// Pop Audio
function playPop() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
    audio.volume = 0.5;
}

// Start Game
function startGame() {
    restartGame();
    let timeout = 0;
    let loop = setInterval(() => {
        timeout = Math.floor(Math.random() * 600 - 100);
        if (!gameOver && num !== total) {
            createBalloon();
        } else if (num !== total) {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block';
        } else {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';
        }
    }, 800 + timeout);
};

// Reset Game
function restartGame() {
    let balloons = document.querySelectorAll('.balloon');

    balloons.forEach(element => {
        element.remove();
    });
    gameOver = false;
    num = 0;
    updateScore();
}

// Accept new game
document.querySelector('.restart').addEventListener('click', () => {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
});
// Cancel new game
document.querySelector('.end-game').addEventListener('click', () => {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
});

// Background music autoplay workaround
startBtn.addEventListener('click', () => {
    startGame();
    document.querySelector('.bg-music').play();
    document.querySelector('.bg-music').volume = 0.25;
    document.querySelector('.start-game-window').style.display = 'none';
});

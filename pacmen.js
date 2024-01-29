var pos = 0;
const pacArray = [
    ['images/PacMan1.png', 'images/PacMan2.png'],
    ['images/PacMan3.png', 'images/PacMan4.png']
];

var active = false;
var interval = null;
var pacMen = [];

function setToRandom(scale) {
    return {
        x: Math.floor(Math.random() * scale),
        y: Math.floor(Math.random() * scale)
    }
}

function makePac() {
    let pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;
    let velocity = setToRandom(30);
    velocity.x += 10;
    velocity.y += 10;
    let position = setToRandom(Math.min(pageWidth, pageHeight));
    let imgStyle = 0;
    let direction = 0;
    let game = document.getElementById('game');
    let element = document.createElement('img');
    element.style.position = 'absolute';
    element.src = pacArray[direction][imgStyle];
    element.width = 100;
    element.style.left = position.x;
    element.style.top = position.y;

    game.appendChild(element);
    return {
        position,
        velocity,
        element,
        imgStyle,
        direction,
    }
}

function makeOne() {
    pacMen.push(makePac())
}

function run() {                
    pacMen.forEach((item) => {
        checkPageBounds(item)
        item.imgStyle = (item.imgStyle + 1) % 2;
        item.element.src = pacArray[item.direction][item.imgStyle];
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.element.style.left = item.position.x + "px";
        item.element.style.top = item.position.y + "px";
    })
}

function checkPageBounds(item) {
    let pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;
    let imgWidth = item.element.width;
    let imgHeight = item.element.height;
    if (item.position.x >= pageWidth - imgWidth - item.velocity.x) {
        item.direction = 1
        item.velocity.x = -item.velocity.x
        item.position.x = pageWidth - imgWidth
    }
    if (item.position.x < -item.velocity.x) {
        item.direction = 0
        item.velocity.x = -item.velocity.x
        item.position.x = 0
    }

    if (item.position.y >= pageHeight - imgHeight - item.velocity.y) {
        item.velocity.y = -item.velocity.y
        item.position.y = pageHeight - imgHeight
    }
    if (item.position.y < -item.velocity.y) {
        item.velocity.y = -item.velocity.y
        item.position.y = 0
    }
}

function checkRun() {
    let button = document.getElementById("startBtn")
    if (active === true) {
        active = false
        button.innerHTML = "Start Game"
        button.style.backgroundColor = "green"
        clearInterval(interval)
    } else {
        active = true
        button.innerHTML = "Pause Game"
        button.style.backgroundColor = "red"
        interval = setInterval(run, 100)
        run()
    }
}
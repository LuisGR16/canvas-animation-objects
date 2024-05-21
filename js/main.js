const coordenadas = document.getElementById("coord__details");
const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = "300";
const window_width = "500";

canvas.height = window_height;
canvas.width = window_width;
canvas.style.backgroundColor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

class Circle {
    constructor(x, y, radius, color, text, backcolor, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.backcolor = backcolor;
        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.backcolor;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 20px cursive";
        context.fillStyle = "white";
        context.fillText(this.text, this.posX, this.posY);
        context.closePath();
    }

    update(context) {
        this.draw(context);

        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        let row = document.getElementById(`circle-${this.text}`);
        row.cells[1].innerText = Math.floor(this.posX);
        row.cells[2].innerText = Math.floor(this.posY);
    }
}

let circles = [];

function createCircles(n) {
    circles = [];
    coordenadas.innerHTML = '';

    for (let i = 0; i < n; i++) {
        let randomRadius = Math.floor(Math.random() * 30 + 20);
        let randomX = Math.random() * window_width;
        let randomY = Math.random() * window_height;
        let randomBackcolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() + ")";
        let randomStrokecolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() + ")";
        let randomSpeed = Math.random() * 3 + 1;

        randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
        randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

        let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomSpeed);
        circles.push(miCirculo);

        let newRow = document.createElement('tr');
        newRow.setAttribute('id', `circle-${i + 1}`);
        newRow.innerHTML = `
            <td>${i + 1}</td>
            <td>${Math.floor(randomX)}</td>
            <td>${Math.floor(randomY)}</td>
        `;
        coordenadas.appendChild(newRow);
    }
}

function updateCircles() {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach((circle) => {
        circle.update(ctx);
    });
}

rangeInput.addEventListener('input', () => {
    rangeValue.textContent = rangeInput.value;
    createCircles(rangeInput.value);
});

createCircles(rangeInput.value);
updateCircles();

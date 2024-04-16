let moveToX = 0;
let moveToY = 0;
let currentImage = '';
let currentScale = 1;
let colors = ['#ffffff'];

function clearCanvas() {
  const canvas = document.getElementById('myCanvas');

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearMove() {
  moveToX = 0;
  moveToY = 0;
}

function clearScale() {
  currentScale = 1;
}

// functions to draw images
function drawCircle(x = 0, y = 0) {
  currentImage = 'circle';

  if (!x && !y) clearMove();

  clearCanvas();
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.scale(currentScale, currentScale);

  let gradient = ctx.createLinearGradient(200 + x, x, 500 + y, y);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors.length > 1 ? colors[1] : colors[0]);

  ctx.beginPath();
  ctx.arc(400 + x, 200 + y, 150, 0, 2 * Math.PI);
  ctx.lineWidth = 4;
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.stroke();
}

function drawRectangle(x = 0, y = 0) {
  currentImage = 'rectangle';

  if (!x && !y) clearMove();

  clearCanvas();
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  ctx.scale(currentScale, currentScale);

  let gradient = ctx.createLinearGradient(200 + x, x, 500 + y, y);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors.length > 1 ? colors[1] : colors[0]);

  ctx.fillStyle = gradient;
  ctx.fillRect(200 + x, 100 + y, 500, 300);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(200 + x, 100 + y);
  ctx.lineTo(200 + x, 400 + y);
  ctx.stroke();
  ctx.lineTo(700 + x, 400 + y);
  ctx.stroke();
  ctx.lineTo(700 + x, 100 + y);
  ctx.stroke();
  ctx.closePath();
  ctx.stroke();
}

function drawSquare(x = 0, y = 0) {
  currentImage = 'square';

  if (!x && !y) clearMove();

  clearCanvas();
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  ctx.scale(currentScale, currentScale);

  let gradient = ctx.createLinearGradient(300 + x, 600, 100 + y, 200);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors.length > 1 ? colors[1] : colors[0]);

  ctx.fillStyle = gradient;
  ctx.fillRect(300 + x, 100 + y, 300, 300);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(300 + x, 100 + y);
  ctx.lineTo(300 + x, 400 + y);
  ctx.stroke();
  ctx.lineTo(600 + x, 400 + y);
  ctx.stroke();
  ctx.lineTo(600 + x, 100 + y);
  ctx.stroke();
  ctx.closePath();
  ctx.stroke();
}

function drawTriangle(x = 0, y = 0) {
  currentImage = 'triangle';

  if (!x && !y) clearMove();

  clearCanvas();
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.scale(currentScale, currentScale);

  let gradient = ctx.createLinearGradient(400 + x, 100 + y, 0, 200);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors.length > 1 ? colors[1] : colors[0]);

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(400 + x, 100 + y);
  ctx.lineTo(600 + x, 400 + y);
  ctx.stroke();
  ctx.lineTo(200 + x, 400 + y);
  ctx.stroke();
  ctx.lineTo(400 + x, 100 + y);
  ctx.lineWidth = 4;
  ctx.stroke();
}

// function to move images
function move(event) {
  if (!currentImage) return alert('É necessário escolher uma imagem antes de tentar movê-la');
  const movement = event.target.className;

  switch (movement) {
    case 'btUp':
      moveToY -= 10;
      break;
    case 'btLeft':
      moveToX -= 10;
      break;
    case 'btRight':
      moveToX += 10;
      break;
    case 'btDown':
      moveToY += 10;
      break;
  }

  return {
    circle: drawCircle,
    rectangle: drawRectangle,
    square: drawSquare,
    triangle: drawTriangle,
  }[currentImage](moveToX, moveToY);
}

// functions to paint scale
function paint(event) {
  if (!currentImage) return alert('É necessário escolher uma imagem antes de escolher a cor');
  colors = [event.target.className];

  return {
    circle: drawCircle,
    rectangle: drawRectangle,
    square: drawSquare,
    triangle: drawTriangle,
  }[currentImage](moveToX, moveToY);
}

function gradient(event) {
  if (!currentImage) return alert('É necessário escolher uma imagem antes de escolher a cor');
  colors = [...event.target.className.split('-')];

  return {
    circle: drawCircle,
    rectangle: drawRectangle,
    square: drawSquare,
    triangle: drawTriangle,
  }[currentImage](moveToX, moveToY);
}

/*
(x', y')=((cos do angulo - sen do angulo)/(cos do angulo * sen do angulo))*(x/y)
*/

// functions to change scale
function zoom(event) {
  if (!currentImage)
    return alert('É necessário escolher uma imagem antes de tentar aumentá-la ou diminuí-la');

  const element = event.target.className;
  switch (element) {
    case 'btIn':
      if (currentScale < 1) currentScale = 1;
      currentScale = Number((currentScale + 0.1).toFixed(1));
      break;
    case 'btOut':
      if (currentScale > 1) currentScale = 1;
      currentScale = Number((currentScale - 0.1).toFixed(1));
      break;
  }

  return {
    circle: drawCircle,
    rectangle: drawRectangle,
    square: drawSquare,
    triangle: drawTriangle,
  }[currentImage](moveToX, moveToY);
}

function findCenter() {
  const length = shape.points.length;
  const xv = shape.points.reduce((acc, p) => acc + p.x, 0) / length;
  const yv = shape.points.reduce((acc, p) => acc + p.y, 0) / length;

  return { x: xv, y: yv };
}


function rotatePoint(px, py, centerX, centerY, degrees) {
  let radians = degrees * Math.PI / 180;
  
  let cos = Math.cos(radians);
  let sin = Math.sin(radians);

  let nx = (cos * (px - centerX)) - (sin * (py - centerY)) + centerX;
  let ny = (sin * (px - centerX)) + (cos * (py - centerY)) + centerY;

  return {x: nx, y: ny};
}

function rotateShape(degrees) {
  if (!shape || shape.name === 'circle') {
    return;
  }

  let center = findCenter();
  let { points, name } = shape;

  const vertices = points.map(p => rotatePoint(p.x, p.y, center.x, center.y, degrees));
  draw({ points: vertices, name });
}

let currentImage = null;
let colors = ['#ffffff'];
const defaultImage = {
  square: {
    name: 'square',
    points: [
      { x: 300, y: 100 },
      { x: 300, y: 400 },
      { x: 600, y: 400 },
      { x: 600, y: 100 },
    ],
  },
  rectangle: {
    name: 'rectangle',
    points: [
      { x: 200, y: 100 },
      { x: 200, y: 400 },
      { x: 700, y: 400 },
      { x: 700, y: 100 },
    ],
  },
  triangle: {
    name: 'triangle',
    points: [
      { x: 600, y: 400 },
      { x: 200, y: 400 },
      { x: 400, y: 100 },
    ],
  },
  circle: { name: 'circle', x: 400, y: 200, radius: 150 },
};

// functions globals
function clearAllCanvas() {
  if (!currentImage) return alert('É necessário escolher uma imagem antes de tentar removê-la');
  document.getElementById(`${currentImage.name}-options`).style.display = 'none';

  clearCanvas();
  clearMove();
  clearScale();
  currentImage = null;
}

function clearCanvas() {
  document.getElementById('myCanvas').innerHTML = document.createElement('canvas');
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1000, 500);
}

function clearMove() {
  moveToX = 0;
  moveToY = 0;
}

function clearScale() {
  currentScale = 1;
}

function color() {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  const { points } = currentImage;

  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));

  // Cria um gradiente que cobre a forma horizontalmente do ponto mais à esquerda/baixo ao mais à direita/cima
  let gradient = ctx.createLinearGradient(minX, maxY, maxX, minY);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors.length > 1 ? colors[1] : colors[0]);

  return gradient;
}

// functions to draw images
function drawCircle() {
  const { x, y, radius } = currentImage;

  console.log(currentImage);

  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  let gradient = ctx.createRadialGradient(x, y, radius, x, y, 0);
  colors.forEach((color, index) => gradient.addColorStop(index, color));

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = 'black';
  ctx.stroke();
}

function drawRectangle() {
  const { points } = currentImage;

  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  const gradient = color();
  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((vertex) => {
    ctx.lineTo(vertex.x, vertex.y);
  });
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'black';
  ctx.closePath();
  ctx.stroke();
}

function drawTriangle() {
  const { points } = currentImage;

  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  const gradient = color();
  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((vertex) => {
    ctx.lineTo(vertex.x, vertex.y);
  });
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'black';
  ctx.closePath();
  ctx.stroke();
}

const functionsDraw = {
  circle: drawCircle,
  rectangle: drawRectangle,
  square: drawRectangle,
  triangle: drawTriangle,
};

function draw(event) {
  const image = event.target.className.split('bt');

  if (currentImage) document.getElementById(`${currentImage.name}-options`).style.display = 'none';

  currentImage = defaultImage[image[1].toLowerCase()];
  document.getElementById(`${currentImage.name}-options`).style.display = 'grid';

  clearCanvas();
  clearMove();
  clearScale();

  return functionsDraw[image[1].toLowerCase()]();
}

// function to move images
function move(event) {
  if (!currentImage) return alert('É necessário escolher uma imagem antes de tentar movê-la');

  clearScale();
  clearCanvas();

  const movement = event.target.className;
  let moveToX = 0;
  let moveToY = 0;

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

  if (currentImage.name === 'circle')
    currentImage = {
      ...currentImage,
      x: currentImage.x + moveToX,
      y: currentImage.y + moveToY,
      radius: currentImage.radius,
    };
  else
    currentImage.points = currentImage.points.map((p) => ({ x: p.x + moveToX, y: p.y + moveToY }));

  return functionsDraw[currentImage.name]();
}

// functions to color image
function paint(event) {
  if (!currentImage) return alert('É necessário escolher uma imagem antes de escolher a cor');

  clearScale();

  colors = [event.target.className];
  return functionsDraw[currentImage.name]();
}

function gradient(event) {
  if (!currentImage) return alert('É necessário escolher uma imagem antes de escolher a cor');

  clearScale();

  colors = [...event.target.className.split('-')];
  return functionsDraw[currentImage.name]();
}

// function to change scale

function zoomPoint(px, py, centerX, centerY, scale) {
  let dx = px - centerX;
  let dy = py - centerY;
  return {
    x: centerX + dx * scale,
    y: centerY + dy * scale,
  };
}

function zoom(event) {
  if (!currentImage)
    return alert('É necessário escolher uma imagem antes de tentar aumentá-la ou diminuí-la');

  let currentScale = 1;

  clearCanvas();
  clearMove();

  const element = event.target.className;
  switch (element) {
    case 'btIn':
      currentScale = Number((currentScale + 0.1).toFixed(1));
      break;
    case 'btOut':
      currentScale = Number((currentScale - 0.1).toFixed(1));
      break;
  }

  let { points } = currentImage;

  const length = points.length;
  const centerX = points.reduce((acc, p) => acc + p.x, 0) / length;
  const centerY = points.reduce((acc, p) => acc + p.y, 0) / length;
  let center = { x: centerX, y: centerY };

  if (currentImage.name === 'circle')
    currentImage = {
      ...currentImage,
      radius: currentImage.radius * currentScale,
    };
  else
    currentImage.points = points.map((point) =>
      zoomPoint(point.x, point.y, center.x, center.y, currentScale)
    );

  return functionsDraw[currentImage.name]();
}

// functions to change rotate
function rotatePoint(px, py, centerX, centerY, degrees) {
  let radians = (degrees * Math.PI) / 180;

  let cos = Math.cos(radians);
  let sin = Math.sin(radians);

  let nx = cos * (px - centerX) - sin * (py - centerY) + centerX;
  let ny = sin * (px - centerX) + cos * (py - centerY) + centerY;

  return { x: nx, y: ny };
}

function rotate(event) {
  if (!currentImage) return alert('É necessário escolher uma imagem antes de tentar rotacioná-la');

  if (currentImage.name === 'circle')
    return alert(
      'A função rotacionar não se aplica para um círculo, uma vez que ele é esférico e não é possível visualizar a sua rotação'
    );

  let degrees = document.getElementById('degrees').value || 45;

  if (event.target.className === 'btRotateLeft') degrees = -degrees;

  clearScale();
  clearMove();
  clearCanvas();

  let { points } = currentImage;

  const length = points.length;
  const centerX = points.reduce((acc, p) => acc + p.x, 0) / length;
  const centerY = points.reduce((acc, p) => acc + p.y, 0) / length;
  let center = { x: centerX, y: centerY };

  currentImage.points = points.map((p) =>
    rotatePoint(
      Math.trunc(p.x),
      Math.trunc(p.y),
      Math.trunc(center.x),
      Math.trunc(center.y),
      degrees
    )
  );

  functionsDraw[currentImage.name]();
}

// function to change points
function changePoints(event) {
  if (!currentImage)
    return alert('É necessário escolher uma imagem antes de tentar aumentá-la ou diminuí-la');

  clearCanvas();

  const newValue = event.target;
  const image = newValue.id.split('-');

  if (newValue.value > 1000 && image.includes('x')) {
    document.getElementById(newValue.id).value = 1000;
    newValue.value = 1000;
    alert('O valor máximo para x é 1000');
  }

  if (newValue.value > 500 && image.includes('y')) {
    document.getElementById(newValue.id).value = 500;
    newValue.value = 500;
    alert('O valor máximo para y é 500');
  }

  switch (image[0]) {
    case 'circle':
      currentImage[image[1]] = newValue.value;
      break;
    case 'square':
    case 'rectangle':
    case 'triangle':
      currentImage.points[image[2]][image[1]] = newValue.value;
      break;
  }

  return functionsDraw[image[0]]();
}

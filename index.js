
function clearCanvas(){
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// functions to draw images
function drawCircle(){
  clearCanvas()
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(400, 200, 150, 0, 2 * Math.PI);
  ctx.lineWidth = 4;
  ctx.stroke();
}

function drawRectangle(){
  clearCanvas()
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
 
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(200, 100);
  ctx.lineTo(200, 400);
  ctx.stroke();
  ctx.lineTo(700, 400);
  ctx.stroke();
  ctx.lineTo(700, 100);
  ctx.stroke();
  ctx.closePath();
  ctx.stroke();
}

function drawSquare(){
  clearCanvas()
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
 
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(300, 100);
  ctx.lineTo(300, 400);
  ctx.stroke();
  ctx.lineTo(600, 400);
  ctx.stroke();
  ctx.lineTo(600, 100);
  ctx.stroke();
  ctx.closePath();
  ctx.stroke();
}

function drawTriangle(){
  clearCanvas()
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
 
  ctx.beginPath();
  ctx.moveTo(400, 100);
  ctx.lineTo(600, 400);
  ctx.stroke();
  ctx.lineTo(200, 400);
  ctx.stroke();
  ctx.lineTo(400, 100);
  ctx.lineWidth = 4;
  ctx.stroke();
}

// functions to change images
function zoom(){
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
  // ctx.scale(3,3)
}

function moveToLeft(){
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");

  ctx.moveTo(20,20);
}

function moveToRight(){

}



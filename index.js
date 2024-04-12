
let moveToX = 0;
let moveToY = 0;

function clearCanvas(){
  const canvas = document.getElementById('myCanvas');
  canvas.classList.remove("circle");
  canvas.classList.remove("rectangle");
  canvas.classList.remove("square");
  canvas.classList.remove("triangle");

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearMove(){
  moveToX=0;
  moveToY=0;
}

function clearColor(){}

// functions to draw images
function drawCircle(x=0,y=0){
  if(!x && !y) clearMove();

  clearCanvas()
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
  canvas.classList.add("circle");

  ctx.beginPath();
  ctx.arc(400+x, 200+y, 150, 0, 2 * Math.PI);
  ctx.lineWidth = 4;
  ctx.stroke();


}

function drawRectangle(x=0, y=0, isPaint=true, isGradient=false){
  if(!x && !y) clearMove(); 
  
  clearCanvas();
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
  canvas.classList.add("rectangle");

  if(isGradient){
    let gradient = ctx.createLinearGradient(200+x, 0, 500+y, 0);
    gradient.addColorStop(0, "black");
    // gradient.addColorStop(0.5, "white");
    gradient.addColorStop(1, "white");
    ctx.fillRect(200+x, 100+y, 500, 300);
    ctx.fillStyle = gradient;
  } else if(isPaint){
    let gradient = ctx.createLinearGradient(200+x, 0, 500+y, 0);
    gradient.addColorStop(0, "cyan");
    gradient.addColorStop(1, "cyan");
    ctx.fillRect(200+x, 100+y, 500, 300);
    ctx.fillStyle = gradient;
  }

  
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(200+x, 100+y);
  ctx.lineTo(200+x, 400+y);
  ctx.stroke();
  ctx.lineTo(700+x, 400+y);
  ctx.stroke();
  ctx.lineTo(700+x, 100+y);
  ctx.stroke();
  ctx.closePath();
  ctx.stroke();
}

function drawSquare(x=0,y=0){
  if(!x && !y) clearMove(); 

  clearCanvas();
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
  canvas.classList.add("square");
 
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(300+x, 100+y);
  ctx.lineTo(300+x, 400+y);
  ctx.stroke();
  ctx.lineTo(600+x, 400+y);
  ctx.stroke();
  ctx.lineTo(600+x, 100+y);
  ctx.stroke();
  ctx.closePath();
  ctx.stroke();
}

function drawTriangle(x=0,y=0){
  if(!x && !y) clearMove(); 

  clearCanvas()
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
  canvas.classList.add("triangle");
 
  ctx.beginPath();
  ctx.moveTo(400+x, 100+y);
  ctx.lineTo(600+x, 400+y);
  ctx.stroke();
  ctx.lineTo(200+x, 400+y);
  ctx.stroke();
  ctx.lineTo(400+x, 100+y);
  ctx.lineWidth = 4;
  ctx.stroke();
}

// functions to move images
function moveToLeft(){
  const draw = document.getElementById('myCanvas').className;
  moveToX -= 10;

  switch(draw){
     case "circle":
      drawCircle(moveToX, moveToY);
      break;
     case "rectangle":
      drawRectangle(moveToX, moveToY);
      break;
     case "square":
      drawSquare(moveToX, moveToY);
      break;
     case "triangle":
      drawTriangle(moveToX, moveToY);
      break;
  }
}

function moveToRight(){
  const draw = document.getElementById('myCanvas').className;
  moveToX += 10;

  switch(draw){
     case "circle":
      drawCircle(moveToX, moveToY);
      break;
     case "rectangle":
      drawRectangle(moveToX, moveToY);
      break;
     case "square":
      drawSquare(moveToX, moveToY);
      break;
     case "triangle":
      drawTriangle(moveToX, moveToY);
      break;
  }
}

function moveToUp(){
  const draw = document.getElementById('myCanvas').className;
  moveToY -= 10;

  switch(draw){
     case "circle":
      drawCircle(moveToX, moveToY);
      break;
     case "rectangle":
      drawRectangle(moveToX, moveToY);
      break;
     case "square":
      drawSquare(moveToX, moveToY);
      break;
     case "triangle":
      drawTriangle(moveToX, moveToY);
      break;
  }
}

function moveToDown(){
  const draw = document.getElementById('myCanvas').className;
  moveToY += 10;

  switch(draw){
     case "circle":
      drawCircle(moveToX, moveToY);
      break;
     case "rectangle":
      drawRectangle(moveToX, moveToY);
      break;
     case "square":
      drawSquare(moveToX, moveToY);
      break;
     case "triangle":
      drawTriangle(moveToX, moveToY);
      break;
  }
}

// functions to paint scale
function paint(){
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
  // ctx.scale(3,3)
}

function gradient(){
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
  // ctx.scale(3,3)
}

/*
(x', y')=((cos do angulo - sen do angulo)/(cos do angulo * sen do angulo))*(x/y)
*/

// functions to change scale
function zoom(){
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext("2d");
  // ctx.scale(3,3)
}

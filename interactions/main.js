var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/*
//square

c.fillstyle = 'rgba(255, 0, 0, 0.4)';
c.fillRect(100, 100, 100, 100);
c.fillstyle = 'rgba(0, 255, 0, 0.4)';
c.fillRect(500, 100, 100, 100);
c.fillstyle = 'rgba(0, 0, 255, 0.4)';
c.fillRect(300, 250, 100, 100);


//line
c.beginPath();
c.moveTo(550, 350);
c.lineTo(800, 600);
c.strokeStyle = "blue";
c.stroke();
*/

//circle
/*
c.beginPath();
c.arc(300, 300, 10, 0, Math.PI * 2, false);
c.stroke();
c.fillStyle = "red"
*/
/*

//multiple circles
for (var i = 0; i < 400; i++) {
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;
  c.beginPath();
  c.arc(x, y, 10, 0, Math.PI * 2, false);
  c.stroke();
  c.strokeStyle='rgba('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
}
*/

var mouse = {
  x: undefined,
  y: undefined
}
var maxRad = 60;
//var minRad = 8;

var colorArray = [
   '#DB4549',
   '#2E3853',
   '#3E6A91',
   '#A3C9D3',
   '#DBDCD6',
];
//mouseevent
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})
//canvas size
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;

  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
//draw the circle
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    /*c.shadowBlur = 28;
    c.shadowColor = "white";*/
  }
  //Bounce off edges
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interaction

    //Mouse distance hover
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRad) {
        this.radius += 4;
      }
    }
    //size if not hoverring
    else if(this.radius > this.minRadius){
      this.radius -= 1;
    }
    this.draw();
  }
}

var circleArray = [];
//reset on resize
function init() {

  circleArray = [];
  //randomize eveything
  for (var i = 0; i < 600; i++) {
    var radius = (Math.random() + 0.2) * 8;
    //position
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    //velocity
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

init();
//animation

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }


/* c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = "blue";
  c.stroke();


 if (x + radius > innerWidth || x - radius < 0){
    dx = -dx;
  }
  if (y + radius > innerHeight || y - radius < 0){
    dy = -dy;
  }

  x += dx;
  y += dy;
*/
}
animate();




console.log(canvas);

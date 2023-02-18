var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var startX = 100;
var startY = canvas.height - 50;
var endX = canvas.width - 100;
var endY = canvas.height - 50;
var projectileRadius = 10;
var angleInput = document.getElementById("angle");
var velocityInput = document.getElementById("velocity");
var angle = Math.PI / 4;
var velocity = 50;

function drawScene(ctx, x, y) {
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
  ctx.fillStyle = "green";
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
  ctx.beginPath();
  ctx.arc(startX, startY, projectileRadius, 0, Math.PI * 2, true);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(endX, endY, projectileRadius, 0, Math.PI * 2, true);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawProjectile(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, projectileRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    for (var i = 0; i <= endX - startX; i += 5) {
      var dx = i;
      var dy = calculateTrajectory(dx, angle, velocity);
      ctx.lineTo(startX + dx, startY - dy);
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.closePath();
  }
  
  function calculateTrajectory(x, theta, v) {
    var g = 9.8;
    var y = x * Math.tan(theta) - (g * x * x) / (2 * v * v * Math.cos(theta) * Math.cos(theta));
    return y;
  }
  
  function update() {
    angle = parseFloat(angleInput.value) * Math.PI / 180;
    velocity = parseFloat(velocityInput.value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScene(ctx);
    drawProjectile(ctx, 0, 0);
  }
  
  angleInput.addEventListener("change", update);
  velocityInput.addEventListener("change", update);
  
  drawScene(ctx);
  drawProjectile(ctx, 0, 0);
  
  function startAnimation() {
    var angle = parseFloat(angleInput.value) * Math.PI / 180;
    var velocity = parseFloat(velocityInput.value);
    var x = 0;
    var y = 0;
    var dx = 5;
    var dy = calculateTrajectory(dx, angle, velocity);
  
    function animate() {
      x += dx;
      y -= dy;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawScene(ctx);
      drawProjectile(ctx, x, y);
      if (y < canvas.height) {
        requestAnimationFrame(animate);
      }
    }
  
    animate();
  }
  
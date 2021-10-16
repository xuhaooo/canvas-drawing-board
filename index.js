const canvas = document.getElementById("canvas");

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

const context = canvas.getContext("2d");
context.fillStyle = "pink";

canvas.onmousemove = e => {
  context.fillRect (e.clientX-5, e.clientY-5, 10, 10);
}



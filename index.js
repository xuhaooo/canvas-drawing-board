const canvas = document.getElementById("canvas");

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

let drawing = false

const context = canvas.getContext("2d");
context.fillStyle = "pink";

canvas.onmousedown = e => {
  drawing = true
  context.fillRect (e.clientX-5, e.clientY-5, 10, 10);
}
canvas.onmousemove = e => {
  if(drawing){
    context.fillRect (e.clientX-5, e.clientY-5, 10, 10);
  }
}
canvas.onmouseup = () => {
  drawing = false
}


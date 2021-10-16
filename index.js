const canvas = document.getElementById("canvas");

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

let drawing = false

const context = canvas.getContext("2d")
context.fillStyle = "black"

canvas.onmousedown = e => {
  drawing = true
  context.beginPath()
  context.arc(e.clientX, e.clientY, 10, 0, 2 * Math.PI)
  context.stroke()
  context.fill()
}
canvas.onmousemove = e => {
  if(drawing){
    context.beginPath()
    context.arc(e.clientX, e.clientY, 10, 0, 2 * Math.PI)
    context.stroke()
    context.fill()
  }
}
canvas.onmouseup = () => {
  drawing = false
}


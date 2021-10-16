const canvas = document.querySelector("#canvas");

canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight


const context = canvas.getContext("2d")
context.fillStyle = "black"

let drawing = false

const isTouchDevice = 'ontouchstart' in document.documentElement
if(isTouchDevice){
  
} else {
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
  
}



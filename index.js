const canvas = document.querySelector("#canvas");

minmax()
window.onresize = () => {
  minmax()
}

const context = canvas.getContext("2d")

let using = false
let last

const isTouchDevice = 'ontouchstart' in document.documentElement
if(isTouchDevice){
  canvas.ontouchstart = e => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    last = [x, y]
  }
  canvas.ontouchmove = e => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    drawLine(last[0], last[1], x, y)
    last = [x, y]
  }
} else {
  canvas.onmousedown = e => {
    if(eraserEnabled){
      using = true
      context.clearRect(e.clientX-15, e.clientY-15, 30, 30)
    } else {
      using = true
      last = [e.clientX, e.clientY]
    }
  }
  canvas.onmousemove = e => {
    if(eraserEnabled){
      if(using){
        context.clearRect(e.clientX-15, e.clientY-15, 30, 30)
      }
    } else {
      if(using){
        drawLine(last[0], last[1], e.clientX, e.clientY)
        last = [e.clientX, e.clientY]
      }
    }
  }
  canvas.onmouseup = () => {
    using = false
  }
}


function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.fillStyle = "black"
  context.lineWidth = 8
  context.lineCap = 'round'
  context.lineTo(x2, y2)
  context.stroke()
}

function minmax(){
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
}


let eraserEnabled = false
eraser.onclick = () => {
  eraserEnabled = !eraserEnabled
}
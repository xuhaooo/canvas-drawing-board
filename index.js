let myCanvas = document.querySelector("#canvas");
let actions = document.querySelector('.actions')
let eraser = document.querySelector("#eraser");
let brush = document.querySelector("#brush");
let context = myCanvas.getContext("2d")
let using = false
let eraserEnabled = false
let last = null

autoSetCanvasSize(myCanvas)

let isTouchDevice = 'ontouchstart' in document.documentElement
if(isTouchDevice){
  listenToTouch(myCanvas)
} else {
  listenToMouse(myCanvas)
}

eraser.onclick = () => {
  eraserEnabled = true
  actions.className = 'actions active'
}
brush.onclick = () => {
  eraserEnabled = false
  actions.className = 'actions'
}

function listenToTouch(canvas){
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
}

function listenToMouse(canvas){
  canvas.onmousedown = e => {
    using = true
    if(eraserEnabled){
      context.clearRect(e.clientX-15, e.clientY-15, 30, 30)
    } else {
      last = [e.clientX, e.clientY]
    }
  }
  canvas.onmousemove = e => {
    if(!using){ return }
    if(eraserEnabled){
      context.clearRect(e.clientX-15, e.clientY-15, 30, 30)
    } else {
      drawLine(last[0], last[1], e.clientX, e.clientY)
      last = [e.clientX, e.clientY]
    }
  }
  canvas.onmouseup = () => {
    using = false
  }
}


function autoSetCanvasSize(canvas){
  setCanvasSize()
  window.onresize = () => {
    setCanvasSize()
  }
  function setCanvasSize(){
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
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
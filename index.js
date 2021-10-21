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

pencil.onclick = () => {
  eraserEnabled = false
  pencil.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = () => {
  eraserEnabled = true
  eraser.classList.add('active')
  pencil.classList.remove('active')
}

red.onclick = () => {
  context.strokeStyle = "red"
  red.classList.add('active')
  yellow.classList.remove('active')
  blue.classList.remove('active')
}
yellow.onclick = () => {
  context.strokeStyle = "yellow"
  yellow.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = () => {
  context.strokeStyle = "blue"
  blue.classList.add('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
}


function listenToTouch(canvas){
  canvas.ontouchstart = e => {
    using = true
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    if(eraserEnabled){
      context.clearRect(x-15, y-15, 30, 30)
    }else{
      last = [x, y]
    }
  }
  canvas.ontouchmove = e => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    if(!using){ return }
    if(eraserEnabled){
      context.clearRect(x-15, y-15, 30, 30)
    } else {
      drawLine(last[0], last[1], x, y)
      last = [x, y]
    }
  }
  canvas.ontouchend = () => {
    using = false
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
  context.lineWidth = 8
  context.lineCap = 'round'
  context.lineTo(x2, y2)
  context.stroke()
}


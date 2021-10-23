let myCanvas = document.querySelector("#canvas");
let actions = document.querySelector('.actions')
let eraser = document.querySelector("#eraser");
let brush = document.querySelector("#brush");
let context = myCanvas.getContext("2d")
let using = false
let eraserEnabled = false
let last = null
let lineWidth = 5

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
trash.onclick = () => {
  context.clearRect(0, 0, myCanvas.width, myCanvas.height)
}
download.onclick = () => {
  let url = myCanvas.toDataURL('image/png')
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '画作'
  a.target = '_blank'
  a.click()
}

document.addEventListener('click', e => {
  if(e.target !== thickness){
    thicks.classList.remove('active')
  }
})
thickness.onclick = () => {
  thicks.classList.add('active')
}
thick1.onclick = () => {
  lineWidth = 3
  thick1.classList.add('active')
  findSibling(thick1).map(item => item.classList.remove('active'))
}
thick2.onclick = () => {
  lineWidth = 8
  thick2.classList.remove('active')
  findSibling(thick2).map(item => item.classList.remove('active'))
}
thick3.onclick = () => {
  lineWidth = 15
  thick3.classList.add('active')
  findSibling(thick3).map(item => item.classList.remove('active'))
}

document.onclick = e => {
  if(e.target !== color){
    colors.classList.remove('active')
  }
}
color.onclick = () => {
  colors.classList.add('active')
}
black.onclick = () => {
  context.strokeStyle = "black"
  black.classList.add('active')
  findSibling(black).map(item=>item.classList.remove('active'))
}
red.onclick = () => {
  context.strokeStyle = "red"
  red.classList.add('active')
  findSibling(red).map(item=>item.classList.remove('active'))
}
orange.onclick = () => {
  context.strokeStyle = "orange"
  orange.classList.add('active')
  findSibling(orange).map(item=>item.classList.remove('active'))
}
yellow.onclick = () => {
  context.strokeStyle = "yellow"
  yellow.classList.add('active')
  findSibling(yellow).map(item=>item.classList.remove('active'))
}
green.onclick = () => {
  context.strokeStyle = "green"
  green.classList.add('active')
  findSibling(green).map(item=>item.classList.remove('active'))
}
cyan.onclick = () => {
  context.strokeStyle = "cyan"
  cyan.classList.add('active')
  findSibling(cyan).map(item=>item.classList.remove('active'))
}
blue.onclick = () => {
  context.strokeStyle = "blue"
  blue.classList.add('active')
  findSibling(blue).map(item=>item.classList.remove('active'))
}
purple.onclick = () => {
  context.strokeStyle = "purple"
  purple.classList.add('active')
  findSibling(purple).map(item=>item.classList.remove('active'))
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
  context.lineWidth = lineWidth
  context.lineCap = 'round'
  context.lineTo(x2, y2)
  context.stroke()
}

function findSibling(tag) {
  let parent = tag.parentNode
  let children = parent.children
  let siblings = []
  for(let i=0; i<=children.length-1;i++){
    if(children[i]===tag){
      continue
    }
    siblings[siblings.length] = children[i]
  }
  return siblings
}
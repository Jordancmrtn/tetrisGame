document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startButton = document.querySelector('#startButton')
  const width = 10
  let nextRandom = 0
  let timerId

  //Les tetrominos
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  //Choisis un tétromino au hasard parmis le [] theTetrominoes
  let random = Math.floor(Math.random()*theTetrominoes.length)

  //Le tetrominos actuel
  let current = theTetrominoes[random][currentRotation]

  //dessine the tetromino
  function draw(){
    current.forEach( index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  //enlève the tetromino
  function undraw(){
    current.forEach( index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  //Tetromino descend toute les secondes.
  timerId = setInterval(moveDown, 1000)

  function controls(e){
    if(e.keyCode === 37){
      moveLeft()
    } else if(e.keyCode === 38){
      rotate()
    } else if (e.keyCode === 39){
      moveRight()
    } else if (e.keyCode === 40){
      moveDown()
    }
  }
  document.addEventListener('keyup', controls)

  function moveDown(){
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  function freeze(){
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      random = nextRandom
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
    }
  }

  function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if (!isAtLeftEdge){
      currentPosition -= 1
    }
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition += 1
    }

    draw()
  }

  function moveRight(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === width -1)

    if (!isAtLeftEdge){
      currentPosition += 1
    }
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition -= 1
    }

    draw()
  }

  function rotate(){
    undraw()
    currentRotation ++
    if(currentRotation === current.length){
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

  //Voir le prochain Tetromino dans la miniGrid

  const displaySquares = document.querySelectorAll('.miniGrid div')
  const displayWidth = 4
  let displayIndex = 0


  const upNextTetromino = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0, displayWidth, displayWidth+1, displayWidth*2+1],
    [1, displayWidth, displayWidth+1, displayWidth+2],
    [0, 1, displayWidth, displayWidth+1],
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
  ]

  //Montre le tetramino dans la miniGrid
  function displayShape(){
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    upNextTetromino[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }


  //ajouter la fonctionnalité au button
  startButton.addEventListener('click', () => {
    if (timerId){
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      displayShape()
    }
  })











})
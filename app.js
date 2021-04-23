const grid = document.querySelector('.grid')
const score = document.querySelector('.score')
const lives = document.querySelector('.lives')
const startButon = document.querySelector('.start')
const resetButon = document.querySelector('.reset')
const count = document.querySelector('.count')
const gameOver = document.querySelector('.gameOver')
const audioPlayer = document.querySelector('audio')
const width = 9
const height = 9
let currentScore = 0
let currentLives = 3
let playerPosition = 76
let aliensPosition = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33]
const cells = []
let game = false

score.innerHTML = ''
lives.innerHTML = ''
currentScore.innerHTML = ''
resetButon.innerHTML = ''

resetButon.addEventListener('click', () => {
  reset()
})

function reset() {
  location.reload()
}

startButon.addEventListener('click', () => {

  count.style.display = 'block'
  setTimeout(() => {
    count.innerHTML = '2'
  }, 1000)

  setTimeout(() => {
    count.innerHTML = '1'
  }, 2000)
  setTimeout(() => {
    count.innerHTML = 'GO'
  }, 3000)
  startButon.style.display = 'none'
  setTimeout(() => {
    game = true
    startGame()
    count.style.display = 'none'
  }, 4000)

})


//     game = true

function startGame() {
  resetButon.innerHTML = 'restart'
  lives.innerHTML = 'Lives: 3'
  score.innerHTML = 'Score: 0'
  // Grid 
  for (let i = 0; i < width ** 2; i++) {
    const div = document.createElement('div')
    grid.appendChild(div)
    // div.innerHTML = i
    div.style.width = `${100 / width}%`
    div.style.height = `${100 / width}%`
    div.classList.add('cells')
    cells.push(div)
  }

  // starting pposition for the player
  cells[playerPosition].classList.add('player')

  // starting position aliens
  aliensPosition.forEach((indexNumber) => {
    cells[indexNumber].classList.add('alien')
  })

  // Player moves and shooting acorns
  document.addEventListener('keydown', (e) => {
    const key = e.key
    if (key === 'ArrowUp') {
      audioPlayer.src = './sounds/acons.wav'
      audioPlayer.play()
      shootingAcorns()
    } else if (key === 'ArrowRight' && playerPosition !== (width ** 2 - 1)) {
      audioPlayer.src = './sounds/walk.wav'
      audioPlayer.play()
      cells[playerPosition].classList.remove('player')
      playerPosition += 1
      cells[playerPosition].classList.add('player')
    }
    else if (key === 'ArrowLeft' && playerPosition !== ((width ** 2) - height)) {
      audioPlayer.src = './sounds/walk.wav'
      audioPlayer.play()
      cells[playerPosition].classList.remove('player')
      playerPosition -= 1
      cells[playerPosition].classList.add('player')
    }
  })

  function bombs() {
    const radnomIndex = Math.floor(Math.random() * aliensPosition.length)
    const randomAliensPosition = aliensPosition[radnomIndex]
    let randomAliensPosition2 = randomAliensPosition + height
    if (cells[randomAliensPosition2].classList.contains('alien')) {
      randomAliensPosition2 += height
      console.log(randomAliensPosition2)
    }
    const intervalIdIce = setInterval(() => {

      console.log(randomAliensPosition2)
      if (randomAliensPosition2 < width ** 2) {
        cells[randomAliensPosition2].classList.remove('ice')
        console.log(randomAliensPosition2)
        randomAliensPosition2 += height
        if (randomAliensPosition2 <= width ** 2 - height) {
          cells[randomAliensPosition2].classList.add('ice')
        }
        if (cells[randomAliensPosition2].classList.contains('player')) {
          audioPlayer.src = './sounds/smash.wav'
          audioPlayer.volume = 0.3
          audioPlayer.play()
          cells[randomAliensPosition2].classList.add('smash')
          cells[randomAliensPosition2].classList.remove('player')

          setTimeout(() => {
            cells[randomAliensPosition2].classList.remove('smash')
          }, 800)
          currentLives -= 1
          playerPosition = 79
          cells[playerPosition].classList.add('player')
          lives.innerHTML = `Lives: ${currentLives}`
          if (currentLives === 0) {
            clearInterval(intervalIdIce)
            clearInterval(intervalbombs)
            lives.innerHTML = 'Game Over'
            gameOver.innerHTML = 'Game Over'
            game = false

          }
        }
      }
      else {
        console.log('line70')
        clearInterval(intervalIdIce)
      }

    }, 800)
  }
  // Alians shooting
  const intervalbombs = setInterval(() => {
    bombs()

  }, 800)


  // Alians moves 
  function movingAliens() {
    const intervalAliens = setInterval(() => {
      cells.forEach(indexNumber => {
        indexNumber.classList.remove('alien')
      })
      aliensPosition = aliensPosition.map(alien => alien + 1)
      aliensPosition.forEach(newIndex => {
        cells[newIndex].classList.add('alien')

      })
      if (aliensPosition.some(alien => alien > 71)) {
        clearInterval(intervalAliens)
        lives.innerHTML = 'Game Over'
        gameOver.innerHTML = 'Game Over'

      }
      if (game === false) {
        clearInterval(intervalAliens)
      }

    }, 450)
  }

  movingAliens()

  // Player shooting 
  function shootingAcorns() {

    let aconPosition = playerPosition
    const intervalIdAcorn = setInterval(() => {
      console.log(cells[aconPosition].classList)
      if (aconPosition >= width && !cells[aconPosition].classList.contains('alien') && !cells[aconPosition].classList.contains('ice')) {
        console.log('clearinterval')
        cells[aconPosition].classList.remove('acorn')
        aconPosition -= width
        cells[aconPosition].classList.add('acorn')
      } else if (aconPosition <= width) {
        clearInterval(intervalIdAcorn)
        cells[aconPosition].classList.remove('acorn')
      } else {
        cells[aconPosition].classList.remove('acorn')
        if (cells[aconPosition].classList.contains('ice')) {
          cells[aconPosition].classList.remove('ice')
        } else if (cells[aconPosition].classList.contains('alien')) {
          cells[aconPosition].classList.remove('alien')
          aliensPosition.splice(aliensPosition.indexOf(aconPosition), 1)
        }

        cells[aconPosition].classList.add('explosion')
        currentScore += 100
        console.log(currentScore)
        score.innerHTML = `Score: ${currentScore}`
        setTimeout(() => {
          cells[aconPosition].classList.remove('explosion')
        }, 100)

        clearInterval(intervalIdAcorn)
      }
    }, 30)

  }

}



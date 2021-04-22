const grid = document.querySelector('.grid')
const score = document.querySelector('.score')
const lives = document.querySelector('.lives')
const width = 9
const height = 9
let currentScore = 0
let currentLives = 3
let playerPosition = 76
let aliensPosition = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 29, 30, 31, 32, 33]
const cells = []
// let intervalIdAcorn
// let intervalIdIce

for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = i
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

document.addEventListener('keydown', (e) => {
  const key = e.key
  if (key === 'ArrowUp') {
    shootingAcorns()
  } else if (key === 'ArrowRight' && playerPosition !== (width ** 2 - 1)) {
    // clearInterval(intervalIdAcorn)
    cells[playerPosition].classList.remove('player')
    playerPosition += 1
    cells[playerPosition].classList.add('player')

  }
  else if (key === 'ArrowLeft' && playerPosition !== ((width ** 2) - height)) {
    // clearInterval(intervalIdAcorn)
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
    } else {
      console.log('line70')
      clearInterval(intervalIdIce)
    }

  }, 1000)
}
setInterval(() => {
  bombs()
}, 500)


// moving aliens  
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
      console.log('Game Over')

    }

  }, 1000)
}
movingAliens()

function shootingAcorns() {

  let aconPosition = playerPosition
  const intervalIdAcorn = setInterval(() => {
    console.log(aconPosition)
    if (aconPosition >= width && !cells[aconPosition].classList.contains('alien')) {
      console.log('clearinterval')
      cells[aconPosition].classList.remove('acorn')
      aconPosition -= width
      cells[aconPosition].classList.add('acorn')
    } else if (aconPosition <= width) {
      clearInterval(intervalIdAcorn)
      cells[aconPosition].classList.remove('acorn')
    } else {
      cells[aconPosition].classList.remove('acorn')
      cells[aconPosition].classList.remove('alien')
      aliensPosition.splice(aliensPosition.indexOf(aconPosition), 1)
      cells[aconPosition].classList.add('explosion')
      currentScore += 100
      console.log(currentScore)
      score.innerHTML = `Score: ${currentScore}`
      setInterval(() => {
        cells[aconPosition].classList.remove('explosion')
      }, 100)

      clearInterval(intervalIdAcorn)
    }
  }, 30)

}

// function looseLives() {
//   if (cells[playerPosition].classList.contains('ice')) {
//     cells[playerPosition].classList.remove('ice')
//     cells[playerPosition].classList.remove('player')
//     currentLives -= 1
//     playerPosition = 76
//     cells[playerPosition].classList.add('player')
//     lives.innerHTML = `Lives: ${currentLives}`
//     if (lives === 0) {
//       console.log('Game Over')
//     }
//   }
// }
// looseLives()
//

//   else if (cells.classList.contains('alien')) && (cells.classList.contains('player')) ||
//     (cells.classList.contains('ice')) && cells.classList.contains('player')
//   {
//     cells.classList.remove('alien')
//     cells.classList.remove('ice')
//     cells.classList.remove('player')
//     score -= 100
//     lives -= 1
//   } else {
//     return score
//   })


// killing player 


// / If(allCells.classList.contains('alien') && allCells.classList.contains('player')) ||
//   (allCells.classList.contains('ice')) && allCells.classList.contains('player') {
//   cells.classList.remove('alien')
//   cells.classList.remove('ice')
//   cells.classList.remove('player')
//   score -= 100
// else {
//     return score
//   }
// }

// bombs - ice cubes



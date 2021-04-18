const grid = document.querySelector('.grid')

const width = 9
const height = 9

let score = 0

let playerPosition = 76

const aliensPosition = [9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, , 29, 30, 31, 32, 33, 39, 40, 41, 49]

console.log('hello')

const cells = []

let intervalId = 0

for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  grid.appendChild(div)
  div.innerHTML = i
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / width}%`
  cells.push(div)
}

// starting pposition for the player- bottom middle
cells[playerPosition].classList.add('player')

aliensPosition.forEach((indexNumber) => {
  cells[indexNumber].classList.add('alien')
})



document.addEventListener('keydown', (e) => {
  const key = e.key
  console.log('hello')
  console.log(key)

  if (key === 'ArrowUp') {
    intervalId = setInterval(() => {
      cells[playerPosition - height].classList.remove('acorn')
      playerPosition = playerPosition - width
      cells[playerPosition - height].classList.add('acorn')
    }, 100)
  }
  else if (key === 'ArrowRight' && playerPosition !== (width ** 2 - 1)) {
    clearInterval(intervalId)
    cells[playerPosition].classList.remove('player')
    playerPosition += 1
    cells[playerPosition].classList.add('player')

  }
  else if (key === 'ArrowLeft' && playerPosition !== ((width ** 2) - height)) {
    clearInterval(intervalId)
    cells[playerPosition].classList.remove('player')
    playerPosition -= 1
    cells[playerPosition].classList.add('player')

  }
})


const allcells = document.querySelectorAll('div')
console.dir(allcells)


if (cells.classList.contains('acorn') && cells.classList.contains('alien')) {
  score += 100
  cells.classList.remove('acorn')
  cells.classList.remove('alien')
}
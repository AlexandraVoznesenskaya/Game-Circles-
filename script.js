const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
let time = 0
let score = 0
const timeEl = document.querySelector('#time')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('#board')
const colors = ['linear-gradient(315deg, rgb(29, 236, 26) 4%, rgb(173, 240, 152) 63%)', 'linear-gradient(135deg, rgb(26, 88, 236) 4%, rgb(133, 229, 208) 63%)', 'linear-gradient(135deg, rgb(242, 161, 85) 4%, rgb(238, 34, 14) 63%)', 'linear-gradient(135deg, rgb(242, 85, 134) 4%, rgb(184, 103, 153) 63%)', 'linear-gradient(135deg, rgb(85, 242, 242) 4%, rgb(20, 0, 139) 63%)', 'linear-gradient(135deg, rgb(242, 255, 38) 4%, rgb(247, 176, 5) 63%)']

startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})
timeList.addEventListener('click', (event) =>{
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})
board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})

function startGame () {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}
function decreaseTime (){
	if (time === 0) {
		finishGame()
	} else {
	let current = --time
	if (current < 10) {
		current = `0${current}`
	}
	setTime(current)
	}
}
function setTime (value){
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
	timeEl.parentNode.classList.add('hide')
}

function createRandomCircle(){
	const circle = document.createElement('div')
  circle.classList.add('circle')
	const size = getRandomNumber(5, 60)
	const {width, height} = board.getBoundingClientRect()
	const x = getRandomNumber(0 ,width - size )
	const y = getRandomNumber(0 ,height - size) 

	circle.style.width = `${size}px`
	circle.style.height =`${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`
  
  circle.style.background = getRandomColor()
  
	board.append(circle)
}

function getRandomNumber (min,max){
	return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor (){
 let index = Math.floor(Math.random () * colors.length)
 return colors[index]
}
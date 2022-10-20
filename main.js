let interval
let isPlaying = false
let laps = []
let hr = 0
let min = 0
let sec = 0
let ds = 0 // Deciseconds

const pause = function () {
	clearInterval(interval)
}

// prints the time on the stopwatch when the Lap button is pressed
const lap = function () {
	let sHr = hr
	let sMin = min
	let sSec = sec

	if(sec < 10){
		sSec = '0' + sec
	}
	if(min < 10){
		sMin = '0' + min
	}
	if(hr < 10){
		sHr = '0' + hr
	}

	laps.push(`${sHr}: ${sMin}: ${sSec}: ${ds}`)
	const lapContainer = document.querySelector('#lap-container')
	lapContainer.innerHTML = laps.join('<br>')
}

// if the timer is running, this function calls lap()
// if not, this function resets the stopwatch
const resetLap = function(){
	if(isPlaying){
		lap()
		return
	}

	reset()
}

// this function resets the stopwatch and its variables
const reset = function () {
	const watch = document.querySelector('#stopwatch-container')
	const playButton = document.querySelector('#playButton')
	const lapContainer = document.querySelector('#lap-container')

	pause()
	laps = []
	lapContainer.innerText = ''
	isPlaying = false

	hr = 0
	min = 0
	sec = 0
	ds = 0

	playButton.innerText = 'Play'
	watch.innerText = `00: 00: 00: 0`	
}

// this function starts the stopwatch timer
const startTime = function () {
	const watch = document.querySelector('#stopwatch-container')

	ds ++

	if(ds == 10){
		ds = 0
		sec ++
	}

	if(sec == 60){
		sec = 0
		min ++
	}

	if(min == 60){
		min = 0
		hr ++
	}

	let sHr = hr
	let sMin = min
	let sSec = sec

	// put a 0 if only single digit
	if(sec < 10){
		sSec = '0' + sec
	}
	if(min < 10){
		sMin = '0' + min
	}
	if(hr < 10){
		sHr = '0' + hr
	}

	watch.innerText = `${sHr}: ${sMin}: ${sSec}: ${ds}`
}

// starts the loop that is called every 100 milliseconds or 1 decisecond
const start = function(){

	interval = setInterval(function(){
			startTime()
		}, 100)	
}

// if the stopwatch is running, this function pauses the stopwatch,
// if not, this function starts the stopwatch
const startPause = function () {
	const playButton = document.querySelector('#playButton')
	const resetButton = document.querySelector('#resetButton')

	if(isPlaying){
		playButton.innerText = 'Play'
		resetButton.innerText = 'Reset'
		isPlaying = false
		pause()
		return
	}

	playButton.innerText = 'Pause'
	resetButton.innerText = 'Lap'

	isPlaying = true

	start()
}

// initialize variables
reset()
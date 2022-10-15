const gameContainer = document.getElementById('game')
const MAX_CARDS_SELECTED = 2

let options = {
	score: 0,
	time: 0,
	timer: null,
	basePoints: 100,
	bestScore: 0,
	worstScore: 0
}


document.addEventListener('DOMContentLoaded', () => {
	//parse localstorage on first load
	const parsedOptions = JSON.parse(localStorage.getItem('data'))
	if (parsedOptions) {
		options = parsedOptions
	}

	const startbtn = document.getElementById('startBtn')
	const endbtn = document.getElementById('endBtn')

	startbtn.addEventListener('click', () => {
		startGame()
	})

	endbtn.addEventListener('click', () => {
		endGame()
	})

	updateScores()
})

const updateScores = () => {
	const bestLabel = document.getElementById('bestScore')
	const worstLabel = document.getElementById('worstScore')

	bestLabel.innerText = options.bestScore
	worstLabel.innerText = options.worstScore
}

const startGame = () => {

	//pokemons array contains 100 cards
	//we need to concat the same array to have 2 of each cards
	const memorySize = document.getElementById('howMany').value
	const cards = pokemons.slice(0, memorySize)
	const mixedPokemonCards = shuffle(cards.concat(cards))
	toggleBtns()
	shuffle(mixedPokemonCards)
	showMemoryCards(mixedPokemonCards)
	startTimer()
}

const toggleBtns = () => {
	const startbtn = document.getElementById('startBtn')
	const endbtn = document.getElementById('endBtn')

	startbtn.classList.toggle('hide')
	endbtn.classList.toggle('hide')
}

const startTimer = () => {
	//should check if match is finished
	if(getPendingCards() > 0) {
		options.timer = setInterval(() => {
			options.time++
		}, 1000)
	} else {
		endGame()
	}
}

const endGame = () => {
	stopTimer()
	toggleBtns()
	setTimeout(() => {
		alert(`Game ended. Your score was ${options.score}`)
		if(options.score > options.bestScore) {
			options.bestScore = options.score
		}

		if(options.score < options.worstScore || options.worstScore == 0) {
			options.worstScore = options.score
		}

		options.score = 0
		localStorage.setItem('data', JSON.stringify(options))
		updateScores()
	}, 500)
}

const stopTimer = () => {
	clearInterval(options.timer)
	options.timer = null
	options.time = 0
}

const match = () => {
	calculatePoints()
	stopTimer()
	startTimer()
}

const getPendingCards = () => {
	const a = document.querySelectorAll('div.card:not(.revealed)').length
	return a
}

const calculatePoints = () => {
	//minimum points are 50 per match.
	if (options.time <= 5) {
		options.score += options.basePoints
	} else if (options.time <= 10) {
		options.score += (options.basePoints - 10)
	} else if ((options.basePoints - options.time) < 50) {
		options.score += 50
	} else {
		options.score += (options.basePoints - options.time)
	}
}

const countSelectedCards = () => {
	return gameContainer.getElementsByClassName('selected').length
}

const showMemoryCards = (pokemonsArray) => {
	gameContainer.innerHTML = ''

	for (let pokemon of pokemonsArray) {

		//create elements
		const card = document.createElement('div')
		const cardInner = document.createElement('div')
		const cardFront = document.createElement('div')
		const cardBack = document.createElement('div')
		const img = document.createElement('img')
		const label = document.createElement('label')

		//add classes
		card.classList.add('card')
		cardInner.classList.add('card-inner')
		cardFront.classList.add('card-front')
		cardBack.classList.add('card-back')

		//add identifiers
		card.dataset.id = `pokemon-${pokemon.name}`
		//put content on back and front
		img.src = pokemon.card
		label.innerText = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.substring(1)}`

		// card.classList.add('card-revealed')
		// card.append(img, label)
		cardBack.append(img, label)
		cardInner.append(cardFront, cardBack)
		card.append(cardInner)

		// call a function handleClick when a div is clicked on
		card.addEventListener('click', handleClick)

		// append the div to the element with an id of game
		gameContainer.append(card)
	}
}

const handleClick = (event) => {
	const selectedCards = countSelectedCards()

	if(selectedCards > 1) {
		console.error('You can only select 2 cards at the same time')
		return
	}

	let card = null

	// you can use event.target to see which element was clicked
	//when its not revealed, the container has a card-front class
	//when its revealed, the click can be at a label, img elements or card-back class
	if(event.target.className.indexOf('card-front') !== -1 || event.target.className.indexOf('card-back') !== -1) {
		//here we need to reveal the card
		card = event.target.parentElement.parentElement
	} else if(['IMG', 'LABEL'].includes(event.target.nodeName)) {
		card = event.target.parentElement.parentElement.parentElement
	}

	//optional: Prevent do hide a card after reveal.
	card.className.indexOf('selected') !== -1 && card.classList.toggle('selected')

	//we need to dismiss clicks for revealed cards
	card.className.indexOf('revealed') === -1 && card.classList.toggle('selected')

	if(selectedCards == 1)  {
		//add class and compare to properly handle
		compareSelectedCards()
	}
	
}

const compareSelectedCards = () => {

	const cards = gameContainer.getElementsByClassName('selected')
	let firstCard = null
	for (const card of cards) {
		if(firstCard == null) {
			firstCard = card
		} else {
			if(firstCard.dataset.id == card.dataset.id) {
				//we have a match
				firstCard.classList.add('revealed')
				card.classList.add('revealed')
				firstCard.classList.remove('selected')
				card.classList.remove('selected')
				match()
			} else {
				setTimeout(() => {
					firstCard.classList.remove('selected')
					card.classList.remove('selected')
				}, 1000)
			}
		}
	}
}
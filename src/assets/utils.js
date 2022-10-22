export const WORD_VALIDATOR = {
	URL: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/?entry=',
	OPTIONS: {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
			'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
		},
	},
	SUCCESS_MSG: 'Success',
}

export const RANDOM_WORD_GENERATOR = {
	URL: 'https://random-words5.p.rapidapi.com/getMultipleRandom?count=20&wordLength=5',
	OPTIONS: {
		method: 'GET',
		url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
		params: { count: '5', wordLength: '5' },
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
			'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
		},
	},
}

export const CORRECTNESS = {
	CORRECT: 'correct',
	PARTIALLY_CORRECT: 'partiallyCorrect',
	INCORRECT: 'incorrect',
}

export const GAME_STATUS = {
	WON: 'WON',
	LOST: 'LOST',
	PENDING: 'PENDING',
}

export const LETTERS = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))

export const KEYBOARD_TOP_ROW = [
	'Q',
	'W',
	'E',
	'R',
	'T',
	'Y',
	'U',
	'I',
	'O',
	'P',
]
export const KEYBOARD_MID_ROW = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
export const KEYBOARD_BOT_ROW = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

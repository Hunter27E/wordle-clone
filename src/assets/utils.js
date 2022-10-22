// https://rapidapi.com/twinword/api/word-dictionary
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

// https://rapidapi.com/sheharyar566/api/random-words5
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

export const KEYBOARD_TOP_ROW = 'QWERTYUIOP'.split('')
export const KEYBOARD_MID_ROW = 'ASDFGHJKL'.split('')
export const KEYBOARD_BOT_ROW = 'ZXCVBNM'.split('')

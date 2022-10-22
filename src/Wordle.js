import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Board } from './Board/Board'
import { Keyboard } from './Keyboard/Keyboard'
import {
	GAME_STATUS,
	WORD_VALIDATOR,
	CORRECTNESS,
	RANDOM_WORD_GENERATOR,
	/* TODO add this when handling keyboard input: LETTERS */
} from './assets/utils'

import './Wordle.css'

export const Wordle = () => {
	const [target, setTarget] = useState([])
	const [nextTargets, setNextTargets] = useState([])

	const [guess, setGuess] = useState([])
	const [guessIsInvalid, setGuessIsInvalid] = useState(false)
	const [guesses, setGuesses] = useState([])

	const [incorrect, setIncorrect] = useState(new Set())
	const [partiallyCorrect, setPartiallyCorrect] = useState(new Set())
	const [correct, setCorrect] = useState(new Set())

	// user submits 5-letter word as guess
	const submitGuess = async () => {
		if (guess.length !== 5) {
			setGuessIsInvalid(true)
			return
		}
		if (guesses.length === 6) return

		// validate guess: must be real 5-letter word
		const validatorRes = await fetch(
			`${WORD_VALIDATOR.URL}${guess.join('')}`,
			WORD_VALIDATOR.OPTIONS
		)
		const validatorMsg = await validatorRes.json()
		if (validatorMsg.result_msg !== WORD_VALIDATOR.SUCCESS_MSG) {
			setGuessIsInvalid(true)
			return
		}

		setGuesses((prevGuesses) => {
			const guessData = []
			guess.forEach((letter, i) => {
				if (letter === target[i])
					guessData.push([letter, CORRECTNESS.CORRECT])
				else if (target.some((char) => char === letter))
					guessData.push([letter, CORRECTNESS.PARTIALLY_CORRECT])
				else guessData.push([letter, CORRECTNESS.INCORRECT])
			})

			return [...prevGuesses, guessData] // add last guess to guesses
		})

		setGuess([])
	}

	// user deletes letter from their guess
	const deleteGuessLetter = () => {
		if (guess.length === 0) return
		setGuess((prevGuess) => prevGuess.slice(0, prevGuess.length - 1))
		setGuessIsInvalid(false)
	}

	// add letter to guess
	const updateGuess = (letter) => {
		if (guess.length === 5) return
		setGuess((prevGuess) => [...prevGuess, letter])
		setGuessIsInvalid(false)
	}

	// TODO handle user input by keyboard
	/* const handleKeyboardInput = ({ key }) => {
		if (key === 'Enter') submitGuess()
		else if (key === 'Backspace') deleteGuessLetter()
		else if (LETTERS.has(key.toUpperCase())) updateGuess(key.toUpperCase())
		else return
	} */

	const getGameStatus = () => {
		if (guesses.length === 0) return GAME_STATUS.PENDING

		// check last guess for correctness
		const lastGuess = guesses[guesses.length - 1]
		const lastGuessWasCorrect = lastGuess.every(
			([_, correctness]) => correctness === CORRECTNESS.CORRECT
		)

		// determine status of game
		if (lastGuessWasCorrect) return GAME_STATUS.WON
		if (guesses.length === 6) return GAME_STATUS.LOST
		return GAME_STATUS.PENDING
	}

	// fetch random 5-letter words for multiple games
	const getTargets = async () => {
		const randomWordGeneratorRes = await axios.request(
			RANDOM_WORD_GENERATOR.OPTIONS
		)
		const randomWords = randomWordGeneratorRes.data

		const target = randomWords[0].toUpperCase().split('')
		const nextTargets = randomWords
			.slice(1)
			.map((word) => word.toUpperCase().split(''))

		setTarget(target)
		setNextTargets(nextTargets)
	}

	// reset all state & generate new target
	const resetGame = () => {
		// use saved target for next game or fetch more
		if (nextTargets.length === 0) getTargets()
		else {
			setTarget(nextTargets[0])
			setNextTargets((prevNextTargets) => prevNextTargets.slice(1))
		}

		setGuess([])
		setGuesses([])
		setIncorrect(new Set())
		setPartiallyCorrect(new Set())
		setCorrect(new Set())
	}

	// update incorrect, partiallyCorrect, & correct letters after user submits new guess
	useEffect(() => {
		if (guesses.length === 0) return // on-mount, don't run this effect

		// update incorrect, partiallyCorrect, & correct letters
		const lastGuess = guesses.at(-1)
		const newIncorrect = new Set(incorrect)
		const newPartiallyCorrect = new Set(partiallyCorrect)
		const newCorrect = new Set(correct)
		for (const [letter, correctness] of lastGuess) {
			if (correctness === CORRECTNESS.CORRECT) newCorrect.add(letter)
			else if (correctness === CORRECTNESS.PARTIALLY_CORRECT)
				newPartiallyCorrect.add(letter)
			else newIncorrect.add(letter)
		}
		setIncorrect(newIncorrect)
		setPartiallyCorrect(newPartiallyCorrect)
		setCorrect(newCorrect)
	}, [guesses]) // eslint-disable-line react-hooks/exhaustive-deps

	// start first game
	useEffect(() => {
		getTargets()

		// TODO listen to keyboard input
		/* window.addEventListener('keydown', handleKeyboardInput)
		return () => window.removeEventListener('keydown', handleKeyboardInput) */
	}, [])

	const gameStatus = getGameStatus()

	return (
		<div>
			<h1 className='pageTitle'>HUNTER'S WORDLE</h1>

			{!(gameStatus === GAME_STATUS.PENDING) && (
				<div className={`gameResults ${gameStatus}`}>
					<h2>Game over, you {gameStatus}!</h2>
					<h3>
						The target was
						<span className='target'> {target.join('')}</span>
					</h3>

					<button onClick={resetGame} className='playAgainBtn'>
						Play Again
					</button>
				</div>
			)}

			<Board
				guess={guess}
				guesses={guesses}
				guessIsInvalid={guessIsInvalid}
			/>

			<Keyboard
				incorrect={incorrect}
				partiallyCorrect={partiallyCorrect}
				correct={correct}
				handleClickLetterKey={updateGuess}
				handleClickDeleteKey={deleteGuessLetter}
				handleClickEnterKey={submitGuess}
			/>
		</div>
	)
}

/*

target = ['T', 'E', 'S', 'T', 'S']
guesses = [
	[['A', 'incorrect'], ['F', 'incorrect'], ['T', 'partiallyCorrect'], ['E', 'partiallyCorrect'], ['R', 'incorrect']],
	[['S', 'partiallyCorrect'], ['T', 'partiallyCorrect'], ['A', 'incorrect'], ['R', 'incorrect'], ['T', 'partiallyCorrect']],
	[],
	[],
	[],
]
incorrect = ['A', 'F', 'R']
partiallyCorrect = ['S', 'T', 'E']
correct = []

*/

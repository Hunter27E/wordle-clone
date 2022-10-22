import React from 'react'
import PropTypes from 'prop-types'

import { BoardRow } from './BoardRow'

import './Board.css'

export const Board = ({ guess, guesses, guessIsInvalid }) => (
	<section className='board'>
		{guesses.map((guess, i) => (
			<BoardRow guess={guess} key={`guess#${i}`} />
		))}

		{guesses.length !== 6 && (
			<BoardRow guess={guess} guessIsInvalid={guessIsInvalid} />
		)}

		{Array(Math.max(6 - (guesses.length + 1), 0))
			.fill([])
			.map((blankGuess, i) => (
				<BoardRow guess={blankGuess} key={`emptyGuess#${i}`} />
			))}
	</section>
)

Board.propTypes = {
	guess: PropTypes.array.isRequired,
	guesses: PropTypes.array.isRequired,
	guessIsInvalid: PropTypes.bool.isRequired,
}

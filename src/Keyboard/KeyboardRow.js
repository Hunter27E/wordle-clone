import React from 'react'
import PropTypes from 'prop-types'

import { CORRECTNESS } from '../assets/utils'

import './KeyboardRow.css'

export const KeyboardRow = ({
	letters,
	incorrect,
	partiallyCorrect,
	correct,
	handleClickLetterKey,
}) => {
	const getClassName = (letter) => {
		if (correct.has(letter)) return CORRECTNESS.CORRECT
		if (partiallyCorrect.has(letter)) return CORRECTNESS.PARTIALLY_CORRECT
		if (incorrect.has(letter)) return CORRECTNESS.INCORRECT
	}

	return (
		<div className='keyboardRow'>
			{letters.map((letter) => (
				<button
					key={letter}
					className={`keyboardLetter ${getClassName(letter)}`}
					onClick={() => handleClickLetterKey(letter)}
				>
					{letter}
				</button>
			))}
		</div>
	)
}

KeyboardRow.propTypes = {
	letters: PropTypes.arrayOf(PropTypes.string).isRequired,
	incorrect: PropTypes.instanceOf(Set).isRequired,
	partiallyCorrect: PropTypes.instanceOf(Set).isRequired,
	correct: PropTypes.instanceOf(Set).isRequired,
	handleClickLetterKey: PropTypes.func.isRequired,
}

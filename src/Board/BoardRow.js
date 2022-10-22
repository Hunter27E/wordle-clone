import React from 'react'
import PropTypes from 'prop-types'

export const BoardRow = ({ guess, guessIsInvalid = false }) => (
	<div className={`boardRow ${guessIsInvalid && 'invalid'}`}>
		{guess.map(([letter, correctness], i) => (
			<p key={`guess[${i}]`} className={`boardSquare ${correctness}`}>
				{letter}
			</p>
		))}

		{Array(5 - guess.length)
			.fill(undefined)
			.map((_, i) => (
				<p key={`guess[${i}]`} className='boardSquare empty'></p>
			))}
	</div>
)

BoardRow.propTypes = {
	guess: PropTypes.array.isRequired,
	guessIsInvalid: PropTypes.bool,
}

import React from 'react'
import PropTypes from 'prop-types'

import { KeyboardRow } from './KeyboardRow'

import {
	KEYBOARD_TOP_ROW,
	KEYBOARD_MID_ROW,
	KEYBOARD_BOT_ROW,
} from '../assets/utils'

import './Keyboard.css'

export const Keyboard = ({
	incorrect,
	partiallyCorrect,
	correct,
	handleClickLetterKey,
	handleClickDeleteKey,
	handleClickEnterKey,
}) => {
	return (
		<section className='keyboard'>
			<KeyboardRow
				letters={KEYBOARD_TOP_ROW}
				incorrect={incorrect}
				partiallyCorrect={partiallyCorrect}
				correct={correct}
				handleClickLetterKey={handleClickLetterKey}
			/>
			<KeyboardRow
				letters={KEYBOARD_MID_ROW}
				incorrect={incorrect}
				partiallyCorrect={partiallyCorrect}
				correct={correct}
				handleClickLetterKey={handleClickLetterKey}
			/>
			<KeyboardRow
				letters={KEYBOARD_BOT_ROW}
				incorrect={incorrect}
				partiallyCorrect={partiallyCorrect}
				correct={correct}
				handleClickLetterKey={handleClickLetterKey}
			/>
			<div className='actionButtons'>
				<button className='enterButton' onClick={handleClickEnterKey}>
					ENTER
				</button>
				<button className='deleteButton' onClick={handleClickDeleteKey}>
					DELETE
				</button>
			</div>
		</section>
	)
}

Keyboard.propTypes = {
	incorrect: PropTypes.instanceOf(Set).isRequired,
	partiallyCorrect: PropTypes.instanceOf(Set).isRequired,
	correct: PropTypes.instanceOf(Set).isRequired,
	handleClickLetterKey: PropTypes.func.isRequired,
	handleClickDeleteKey: PropTypes.func.isRequired,
	handleClickEnterKey: PropTypes.func.isRequired,
}

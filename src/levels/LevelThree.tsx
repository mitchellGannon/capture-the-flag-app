/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/destructuring-assignment */
import { formatFlag } from 'helpers/utilities'
import { useState } from 'react'
import GridCipher from './GridCipher'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LevelThree(properties: { flag: string }): JSX.Element {
	const [reveal, setReveal] = useState('')
	return (
		<div className='flex flex-col items-center gap-y-6'>
			<p>
				I have hidden a message for you in the bellow cipher text. Use the grid
				to reveal the flag.
			</p>
			<p>ITSABOTTUOGETTR YKCI</p>
			<GridCipher
				onCorrectCipher={function (): void {
					setReveal(formatFlag(properties.flag))
				}}
			/>
			<p>{reveal}</p>
		</div>
	)
}

export default LevelThree

/* eslint-disable react/button-has-type */
/* eslint-disable unicorn/new-for-builtins */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/function-component-definition */
// eslint-disable-next-line import/no-extraneous-dependencies
import { RedoOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import type React from 'react'
import { useEffect, useState } from 'react'

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 10px;
	margin-bottom: 20px;
`

const StyledInput = styled.input`
	width: 100%;
	height: 40px;
	text-align: center;
	text-transform: uppercase;
`

const Cell = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
	<StyledInput {...props} />
)

interface Properties {
	onCorrectCipher: () => void
}

const GridCipher: React.FC<Properties> = ({ onCorrectCipher }) => {
	const correctCipher = 'ITSABOUTTOGETTRICKY'
	// eslint-disable-next-line unicorn/new-for-builtins
	const [userInput, setUserInput] = useState<string[]>(
		Array(correctCipher.length).fill('')
	)

	useEffect(() => {
		if (userInput.join('') === correctCipher) {
			onCorrectCipher()
		}
	}, [userInput, onCorrectCipher])

	const handleInputChange = (index: number, value: string) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const updatedInput = [...userInput]
		updatedInput[index] = value.toUpperCase()
		setUserInput(updatedInput)
	}

	return (
		<div>
			<Grid>
				{userInput.map((letter, index) => (
					<Cell
						key={index}
						maxLength={1}
						value={letter}
						onChange={e => handleInputChange(index, e.target.value)}
					/>
				))}
			</Grid>
			<button
				className='hover:bg-fce600 flex h-10 w-10 items-center justify-center bg-transparent transition-colors focus:outline-none'
				onClick={() => setUserInput(Array(correctCipher.length).fill(''))}
			>
				<RedoOutlined className='text-black hover:text-black' />
			</button>
		</div>
	)
}

export default GridCipher

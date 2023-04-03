/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react'

/* eslint-disable react/destructuring-assignment */
function LevelFive(properties: { flag: string }): JSX.Element {
	const decryptedMessage = 'ctf'
	const [inputValue, setInputValue] = useState('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const isMessageCorrect = inputValue === decryptedMessage
	return (
		<div>
			<p>I have encrypted a message for you: 2201 2460 2649.</p>
			<p>
				It is three letters in length and the numbers before encryption were
				ASCII values.
			</p>
			<p>It was encrypted using RSA. N = 3233, and the private key = 2753.</p>
			<div className='mt-4 flex items-center space-x-4'>
				<label htmlFor='decryptedMessage' className='font-bold'>
					Decrypted Message:
				</label>
				<input
					type='text'
					id='decryptedMessage'
					value={inputValue}
					onChange={handleInputChange}
					className='rounded-md border-2 border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none'
				/>
				{isMessageCorrect && (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 text-green-500'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M5 13l4 4L19 7'
						/>
					</svg>
				)}
			</div>
			{isMessageCorrect && (
				<div>
					<p className='mt-8'>
						What if I told you that ctf is the key to this encrypted message:
						U2FsdGVkX18J/VS0JbJXG6z/aoiEy7k4KrgnEDSlaK9qeuBTw1W+AkiuBnYJDiD+
					</p>
					<p className='mt-4'>Use openssl with -aes-128-cbc -d -a flags.</p>
				</div>
			)}
		</div>
	)
}

export default LevelFive

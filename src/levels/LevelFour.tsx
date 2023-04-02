/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable radix */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { formatFlag } from 'helpers/utilities'
import { useState } from 'react'

/* eslint-disable react/destructuring-assignment */
function LevelFour(properties: { flag: string }): JSX.Element {
	const prime1 = 3
	const prime2 = 11
	const modulus = prime1 * prime2
	const eulerTotient = (prime1 - 1) * (prime2 - 1)
	const publicKey = 3
	const privateKey = 7

	const [modulusInput, setModulusInput] = useState(0)
	const [eulerTotientInput, setEulerTotientInput] = useState(0)
	const [selectedPublicKey, setSelectedPublicKey] = useState(0)
	const [selectedPrivateKey, setSelectedPrivateKey] = useState(0)

	const checkAnswer = () =>
		modulusInput === modulus &&
		eulerTotientInput === eulerTotient &&
		selectedPublicKey === publicKey &&
		selectedPrivateKey === privateKey

	return (
		<div className='p-4'>
			<form className='space-y-4'>
				<div>
					<label htmlFor='modulus' className='mb-1 block'>
						Find the modulus of {prime1} and {prime2}:
					</label>
					<input
						type='number'
						id='modulus'
						className='w-full border-2 p-1'
						onChange={e => setModulusInput(Number.parseInt(e.target.value))}
					/>
					{modulusInput === modulus && (
						<span className='text-green-500'>✓</span>
					)}
				</div>

				<div>
					<label htmlFor='euler-totient' className='mb-1 block'>
						Find the Euler Totient of {prime1} and {prime2}:
					</label>
					<input
						type='number'
						id='euler-totient'
						className='w-full border-2 p-1'
						onChange={e =>
							setEulerTotientInput(Number.parseInt(e.target.value))
						}
					/>
					{eulerTotientInput === eulerTotient && (
						<span className='text-green-500'>✓</span>
					)}
				</div>

				<div>
					<label className='mb-1 block'>Select the valid public key:</label>
					{Array.from({ length: 3 }, (_, i) => i + 1).map(key => (
						<div key={key}>
							<input
								type='radio'
								id={`public-key-${key}`}
								name='public-key'
								value={key === 2 ? publicKey : key + 9}
								className='mr-1'
								onChange={e =>
									setSelectedPublicKey(Number.parseInt(e.target.value))
								}
							/>
							<label htmlFor={`public-key-${key}`}>{key}</label>
							{selectedPublicKey === publicKey && (
								<span className='ml-1 inline-block text-green-500'>✓</span>
							)}
						</div>
					))}
				</div>

				<div>
					<label className='mb-1 block'>Select the valid private key:</label>
					{Array.from({ length: 3 }, (_, index) => index + 1).map(key => (
						<div key={key}>
							<input
								type='radio'
								id={`private-key-${key}`}
								name='private-key'
								value={key === 2 ? privateKey : key + 5}
								className='mr-1'
								onChange={e =>
									setSelectedPrivateKey(Number.parseInt(e.target.value))
								}
							/>
							<label htmlFor={`private-key-${key}`}>{key + 5}</label>
						</div>
					))}
					{selectedPrivateKey === privateKey && (
						<span className='text-green-500'>✓</span>
					)}
				</div>
			</form>

			{checkAnswer() && (
				<p className='mt-4 rounded bg-green-200 p-2'>
					All answers are correct. Here is your flag:{' '}
					{formatFlag(properties.flag)}
				</p>
			)}
		</div>
	)
}

export default LevelFour

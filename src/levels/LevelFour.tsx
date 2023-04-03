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
			<form className='ml-auto mr-auto max-w-md space-y-4'>
				<div>
					<label htmlFor='modulus' className='mb-1 block'>
						Find the modulus of {prime1} and {prime2}:
					</label>
					<input
						type='number'
						id='modulus'
						className='w-full rounded-md border-2 border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none'
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
						className='w-full rounded-md border-2 border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none'
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
					{Array.from({ length: 3 }, (_, i) => [3, 2, 10][i]).map(key => (
						<div key={key}>
							<input
								type='radio'
								id={`public-key-${key}`}
								name='public-key'
								value={key}
								className='mr-1'
								onChange={e =>
									setSelectedPublicKey(Number.parseInt(e.target.value))
								}
							/>
							<label htmlFor={`public-key-${key}`}>{key}</label>
							{selectedPublicKey === publicKey && key === publicKey && (
								<span className='ml-1 inline-block text-green-500'>✓</span>
							)}
						</div>
					))}
				</div>

				<div>
					<label className='mb-1 block'>Select the valid private key:</label>
					{Array.from({ length: 3 }, (_, i) => [5, 7, 11][i]).map(key => (
						<div key={key}>
							<input
								type='radio'
								id={`private-key-${key}`}
								name='private-key'
								value={key}
								className='mr-1'
								onChange={e =>
									setSelectedPrivateKey(Number.parseInt(e.target.value))
								}
							/>
							<label htmlFor={`private-key-${key}`}>{key}</label>
							{selectedPrivateKey === privateKey && key === privateKey && (
								<span className='ml-1 inline-block text-green-500'>✓</span>
							)}
						</div>
					))}
				</div>
			</form>

			{checkAnswer() && (
				<div className='mt-16 flex justify-between rounded bg-green-200 p-4'>
					<p>All answers are correct.</p>
					<p>{formatFlag(properties.flag)}</p>
				</div>
			)}
		</div>
	)
}

export default LevelFour

/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import AppBar from 'components/AppBar'
import LevelOne from 'levels/LevelOne'
import LevelZero from 'levels/LevelZero'
import type { ReactElement, ReactNode } from 'react'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

interface Level {
	flag: string
	hint: string
	levelNumber: number
	levelTitle: string
	description: string
	component: ReactNode
}

export default function App(): ReactElement {
	const [flagInput, setFlagInput] = useState('')
	const navigate = useNavigate()
	const LevelZeroFlag = 'easy'
	const LevelOneFlag = 'now-we-are-cooking-with-gas'

	const levels: Level[] = [
		{
			flag: LevelZeroFlag,
			hint: 'Surely you don\t need a hint..',
			levelNumber: 0,
			levelTitle: 'Humble Beginnings.',
			description:
				'Copy the word inside the brackets, and paste it into the flag input text field below.',
			component: <LevelZero flag={LevelZeroFlag} />
		},
		{
			flag: LevelOneFlag,
			hint: 'Surely you don\t need a hint..',
			levelNumber: 1,
			levelTitle: 'Hidden in Plain Sight.',
			description:
				"What if I told you that the the flag is staring at you in the face. You just can't see it.",
			component: <LevelOne flag={LevelOneFlag} />
		}
	]

	function getCurrentLevel(): Level | undefined {
		if (window.location.pathname === '/') {
			return levels.find(l => l.levelNumber === 0)
		}

		const previousLevel = levels.find(
			l => l.flag === window.location.pathname.slice(1)
		)

		if (previousLevel) {
			return levels.find(l => l.levelNumber === previousLevel.levelNumber + 1)
		}

		return undefined
	}

	function getRouteForLevel(level: Level): string | undefined {
		if (level.levelNumber === 0) return ''

		return levels.find(l => l.levelNumber === level.levelNumber - 1)?.flag
	}

	function flagIsInvalid(): boolean {
		return flagInput !== getCurrentLevel()?.flag
	}

	function onClickGoToNextLevel(): void {
		alert('Congratulations!')
		setFlagInput('')
		navigate(getCurrentLevel()?.flag ?? '')
	}

	return (
		<>
			<AppBar level={getCurrentLevel()?.levelNumber ?? 0} />

			<main className='container mx-auto flex h-full max-w-5xl flex-col gap-y-8 p-8'>
				<h1 className='mt-8 text-5xl'>{getCurrentLevel()?.levelTitle}</h1>
				<p>{getCurrentLevel()?.description}</p>

				<div className='rounded-3xl bg-slate-100 p-8 dark:text-black'>
					<Routes>
						{levels.map(level => (
							<Route
								key={level.flag}
								path={getRouteForLevel(level)}
								element={level.component}
							/>
						))}
					</Routes>
				</div>

				<form className='flex flex-row items-center gap-8 rounded-3xl border-8 border-solid border-slate-100 p-7'>
					<h3 className='mx-auto'>Flag Input</h3>
					<div>
						flag&#123;
						<input
							className='mx-2 h-14 w-72 rounded-3xl px-4 text-black caret-black'
							value={flagInput}
							onChange={e => setFlagInput(e.target.value)}
						/>
						&#125;
					</div>
					<button
						className='h-14 w-32 rounded-3xl bg-green-700'
						disabled={flagIsInvalid()}
						onClick={(): void => onClickGoToNextLevel()}
						type='submit'
						style={{
							background: flagIsInvalid() ? 'gray' : '#ffe600',
							color: flagIsInvalid() ? 'white' : 'black'
						}}
					>
						next level
					</button>
				</form>
			</main>

			<footer
				className='h-12 flex-shrink-0 grid-cols-3 items-center bg-slate-900 px-4 text-center text-zinc-300'
				style={{ display: 'grid' }}
			>
				<p>Mitchell Gannon</p>
				<p>ZZEN9203</p>
				<p>Assessment 2</p>
			</footer>
		</>
	)
}

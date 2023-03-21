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
				'Copy the word inside the brackets, and paste it into the flag text field.',
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

		console.log(previousLevel, window.location.pathname)

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

			<main className='container mx-auto flex h-full flex-col gap-y-8 p-8'>
				<h1 className='text-5xl'>{getCurrentLevel()?.levelTitle}</h1>
				<p>{getCurrentLevel()?.description}</p>

				<Routes>
					{levels.map(level => (
						<Route
							key={level.flag}
							path={getRouteForLevel(level)}
							element={level.component}
						/>
					))}
				</Routes>

				<form className=''>
					<input
						value={flagInput}
						onChange={e => setFlagInput(e.target.value)}
					/>
					<button
						disabled={flagIsInvalid()}
						onClick={(): void => onClickGoToNextLevel()}
						type='submit'
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

/* eslint-disable @typescript-eslint/no-magic-numbers */
import AppBar from 'components/AppBar'
import LevelOne from 'levels/LevelOne'
import LevelZero from 'levels/LevelZero'
import type { ReactElement, ReactNode } from 'react'
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
	const navigate = useNavigate()

	const levels: Level[] = [
		{
			flag: 'easy',
			hint: 'Surely you don\t need a hint..',
			levelNumber: 0,
			levelTitle: 'Humble Beginnings',
			description:
				'Copy the word inside the brackets, and paste it into the flag text field.',
			component: <LevelZero />
		},
		{
			flag: 'now-we-are-cooking-with-gas',
			hint: 'Surely you don\t need a hint..',
			levelNumber: 1,
			levelTitle: 'Hidden in Plain Sight',
			description:
				"What if I told you that the the flag is staring at you in the face. You just can't see it.",
			component: <LevelOne />
		}
	]

	function getCurrentLevel(): Level | undefined {
		if (window.location.pathname === '/') {
			return levels.find(l => l.levelNumber === 0)
		}

		const previousLevel = levels.find(l => l.flag === window.location.pathname)

		if (previousLevel) {
			return levels.find(l => l.levelNumber === previousLevel.levelNumber + 1)
		}

		return undefined
	}

	function getRouteForLevel(level: Level): string | undefined {
		if (level.levelNumber === 0) return ''

		return levels.find(l => l.levelNumber === level.levelNumber - 1)?.flag
	}

	function onClickGoToNextLevel(): void {
		navigate(getCurrentLevel()?.flag ?? '')
	}

	return (
		// <BrowserRouter>

		// </BrowserRouter>
		<>
			<AppBar level={getCurrentLevel()?.levelNumber ?? 0} />

			<main className='container mx-auto h-full p-8'>
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

				<form>
					<input type='text' name='' id='' />
					<button onClick={(): void => onClickGoToNextLevel()} type='submit'>
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

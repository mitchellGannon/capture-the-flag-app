/* eslint-disable @typescript-eslint/no-magic-numbers */
import AppBar from 'components/AppBar'
import LevelOne from 'levels/LevelOne'
import LevelZero from 'levels/LevelZero'
import type { ReactElement, ReactNode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

interface Level {
	flag: string
	hint: string
	levelNumber: number
	levelTitle: string
	description: string
	component: ReactNode
}

export default function App(): ReactElement {
	// const navigate = useNavigate()

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
			levelTitle: 'Humble Beginnings',
			description:
				'Copy the word inside the brackets, and paste it into the flag text field. flag{easy}',
			component: <LevelOne />
		}
	]

	function getCurrentLevel(): Level | undefined {
		if (window.location.pathname === '/') {
			return levels.find(l => l.levelNumber === 0)
		}
		console.log(levels.find(l => l.flag === window.location.pathname))
		return levels.find(l => l.flag === window.location.pathname)
	}

	// function goToNextLevel() {
	// 	const currentLevel = getCurrentLevel()

	// 	if (currentLevel) {
	// 		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	// 		const nextLevel = levels.find(
	// 			l => l.levelNumber === currentLevel.levelNumber + 1
	// 		)

	// 		if (nextLevel) {
	// 			navigate(nextLevel.flag)
	// 		}
	// 	}
	// }

	return (
		<BrowserRouter>
			<AppBar level={getCurrentLevel()?.levelNumber ?? 0} />

			<main className='container mx-auto h-full p-8'>
				<h1 className='text-5xl'>{getCurrentLevel()?.levelTitle}</h1>
				<p>{getCurrentLevel()?.description}</p>

				<Routes>
					{levels.map(level => (
						<Route
							key={level.flag}
							path={level.levelNumber === 0 ? '/' : level.flag}
							element={level.component}
						/>
					))}
				</Routes>

				<form>
					<input type='text' name='' id='' />
					<button type='submit'>next level</button>
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
		</BrowserRouter>
	)
}

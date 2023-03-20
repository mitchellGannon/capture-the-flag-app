import AppBar from 'components/AppBar'
import LevelOne from 'levels/LevelOne'
import LevelZero from 'levels/LevelZero'
import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// interface Level {
// 	flag: string
// 	routePath: string
// 	hint: string
// 	levelNumber: number
// 	levelTitle: string
// 	description: string
// }

export default function App(): ReactElement {
	// const location = useLocation()

	// const levels: Level[] = [
	// 	{
	// 		flag: 'easy',
	// 		routePath: '/',
	// 		hint: 'Surely you don\t need a hint..',
	// 		levelNumber: 0,
	// 		levelTitle: 'Humble Beginnings',
	// 		description:
	// 			'Copy the word inside the brackets, and paste it into the flag text field. flag{easy}'
	// 	}
	// ]
	return (
		<div className='h-screen flex-col' style={{ display: 'flex' }}>
			<BrowserRouter>
				<AppBar />
				<main className='grow'>
					{/* <h1>I should really see this at some point {location.pathname}</h1> */}
					<h1>I should really see this at some point</h1>
					<Routes>
						<Route path='/' element={<LevelZero />} />
						<Route path='/one' element={<LevelOne />} />
					</Routes>
				</main>
				<footer
					className='h-12 grid-cols-3 items-center bg-slate-900 px-4 text-center text-zinc-300'
					style={{ display: 'grid' }}
				>
					<p>Mitchell Gannon</p>
					<p>ZZEN9203</p>
					<p>Assessment 2</p>
				</footer>
			</BrowserRouter>
		</div>
	)
}

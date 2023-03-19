import AppBar from 'components/AppBar'
import LevelOne from 'levels/LevelOne'
import LevelZero from 'levels/LevelZero'
import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<AppBar></AppBar>
			<Routes>
				<Route path='/' element={<LevelZero />} />
				<Route path='/one' element={<LevelOne />} />
			</Routes>
			<footer className='px-4 text-center text-zinc-300 h-12 grid-cols-3 bg-slate-900 items-center' style={{display: 'grid'}}>
				<p>Mitchell Gannon</p>
				<p>ZZEN9203</p>
			</footer>
		</BrowserRouter>
	)
}

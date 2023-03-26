/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Collapse, message } from 'antd'
import AppBar from 'components/AppBar'
import LevelOne from 'levels/LevelOne'
import LevelTwo from 'levels/LevelTwo'
import LevelZero from 'levels/LevelZero'
import type { ReactElement, ReactNode } from 'react'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

const { Panel } = Collapse

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
	const LevelTwoFlag = 'that-cannot-be-good'
	const [messageApi, contextHolder] = message.useMessage()
	const success = () => {
		void messageApi.open({
			type: 'success',
			content: 'Congratulations!'
		})
	}

	const [activeKeys, setActiveKeys] = useState<string[]>([])

	const closePanel = (key: string) => {
		setActiveKeys(activeKeys.filter(activeKey => activeKey !== key))
	}

	const onCollapseChange = (keys: string[] | string) => {
		if (Array.isArray(keys)) {
			setActiveKeys(keys)
		} else {
			setActiveKeys([keys])
		}
	}

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
			hint: 'Developer tools are great for locating issues within your application. Maybe the developer had accidently left an element in the page. You should check it out! 😅',
			levelNumber: 1,
			levelTitle: 'Hidden in Plain Sight.',
			description:
				"What if I told you that the the flag is staring at you in the face. You just can't see it.",
			component: <LevelOne flag={LevelOneFlag} />
		},
		{
			flag: LevelTwoFlag,
			hint: 'See if you can cause an error on the page and then check the developer tools for some insight into what has taken place.',
			levelNumber: 2,
			levelTitle: 'Human Error.',
			description:
				'How many cyber security events are caused by insecure code? Code is pushed into production without the proper integrity checks.',
			component: <LevelTwo flag={LevelTwoFlag} />
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
		setFlagInput('')
		success()
		closePanel('1')
		navigate(getCurrentLevel()?.flag ?? '')
	}

	return (
		<>
			<AppBar level={getCurrentLevel()?.levelNumber ?? 0} />
			{contextHolder}
			<main className='container mx-auto flex h-full max-w-5xl flex-col gap-y-8 p-8'>
				<h1 className='mt-8 text-5xl'>{getCurrentLevel()?.levelTitle}</h1>
				<p>{getCurrentLevel()?.description}</p>

				{/* challenge space */}
				<div className='h-72 rounded-3xl bg-slate-100 p-8 drop-shadow dark:text-black'>
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

				{/* hint collapsable */}
				<Collapse
					className='drop-shadow'
					activeKey={activeKeys}
					onChange={onCollapseChange}
				>
					<Panel header='hint?' key='1'>
						<p>{getCurrentLevel()?.hint}</p>
					</Panel>
				</Collapse>

				{/* flag input form */}
				<form className='ml-auto flex w-min flex-row items-center gap-8 rounded-3xl bg-slate-100 p-7 drop-shadow'>
					<div className='flex flex-row items-center'>
						<h3 className='text-3xl text-black'>flag&#123;</h3>
						<input
							className='mx-2 h-14 w-72 rounded-3xl border-white px-4 text-black caret-black'
							value={flagInput}
							onChange={e => setFlagInput(e.target.value)}
						/>
						<h3 className='text-3xl text-black'>&#125;</h3>
					</div>
					<button
						className='h-14 w-32 rounded-3xl'
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

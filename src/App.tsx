/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react/jsx-no-leaked-render */
/* eslint-disable unicorn/no-negated-condition */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Collapse, message } from 'antd'
import AppBar from 'components/AppBar'
import Victory from 'components/Victory'
import LevelFive from 'levels/LevelFive'
import LevelFour from 'levels/LevelFour'
import LevelOne from 'levels/LevelOne'
import LevelThree from 'levels/LevelThree'
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
	const [userHasWon, setUserHasWon] = useState(false)
	const navigate = useNavigate()
	const LevelZeroFlag = 'easy'
	const LevelOneFlag = 'now-we-are-cooking-with-gas'
	const LevelTwoFlag = 'that-cannot-be-good'
	const LevelThreeFlag = 'its-about-to-get-tricky'
	const LevelFourFlag = 'unstoppable'
	const LevelFiveFlag = 'wow-you-are-clever'
	const AppBaseRoute = 'capture-the-flag-app/'
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
		},
		{
			flag: LevelThreeFlag,
			hint: 'The key to this one is to alternate going from left to right when you input the characters in the grid. So, go from left to right for the first row, and right to left for the second row.',
			levelNumber: 3,
			levelTitle: 'A Tricky Cipher',
			description:
				'Transpose the cipher text using the grid. Once the characters have been input in the correct order, the flag will be revealed to you.',
			component: <LevelThree flag={LevelThreeFlag} />
		},
		{
			flag: LevelFourFlag,
			hint: 'Given two prime numbers: p and q. Modulus = p * q. Euler Totient = (p - 1) * (q - 1). Public key must be prime, less than the Totient, and not be a factor of the Totient. (Private key * public key) when modulus with the Totient must equal 1.',
			levelNumber: 4,
			levelTitle: 'RSA Key Generation',
			description:
				'Below are a set of challenges which pertain to the RSA algorithm. Wolfram Alpha is required for these challenges.',
			component: <LevelFour flag={LevelFourFlag} />
		},
		{
			flag: LevelFiveFlag,
			hint: 'To decrypt the frist message: message ^ (private key) mod N. The second one requires you to copy the encrypted text to a text file, and then run this command: openssl enc -aes-128-cbc -d -a -in YOUR_TEXT_FILE.txt -out decrypted_secret.txt -k ctf',
			levelNumber: 5,
			levelTitle: 'The Final Boss',
			description:
				'Completing the below challenge will uncover a key, which will be used to decrypt a string of characters, using openssl.',
			component: <LevelFive flag={LevelFiveFlag} />
		}
	]

	function getCurrentLevel(): Level | undefined {
		if (window.location.pathname === `/${AppBaseRoute}`) {
			return levels.find(l => l.levelNumber === 0)
		}

		const previousLevel = levels.find(
			l => l.flag === window.location.pathname.slice(AppBaseRoute.length + 1)
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
		if (
			getCurrentLevel()?.levelNumber !==
			Math.max(...levels.map(l => l.levelNumber))
		) {
			navigate(AppBaseRoute + getCurrentLevel()?.flag)
		} else {
			setUserHasWon(true)
		}
	}

	function getLevelNumber(): number | undefined {
		if (userHasWon) return Math.max(...levels.map(l => l.levelNumber)) + 1
		return getCurrentLevel()?.levelNumber ?? 0
	}

	return (
		<div className='flex h-full flex-col'>
			<AppBar level={getLevelNumber()} />
			{contextHolder}
			{!userHasWon && (
				<main className='fade-in-up container mx-auto flex max-w-5xl flex-col gap-y-8 p-8'>
					<h1 className='mt-8 text-5xl'>{getCurrentLevel()?.levelTitle}</h1>
					<p>{getCurrentLevel()?.description}</p>

					{/* challenge space */}
					<div
						className='grow rounded-3xl bg-slate-100 p-8 drop-shadow dark:text-black'
						style={{ minHeight: '250px' }}
					>
						<Routes>
							{levels.map(level => (
								<Route
									key={level.flag}
									path={AppBaseRoute + getRouteForLevel(level)}
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
			)}
			{userHasWon && <Victory />}
			<footer
				className='h-12 flex-shrink-0 grid-cols-3 items-center bg-slate-900 px-4 text-center text-zinc-300'
				style={{ display: 'grid', marginTop: 'auto' }}
			>
				<p>Mitchell Gannon</p>
				<p>ZZEN9203</p>
				<p>Assessment 2</p>
			</footer>
		</div>
	)
}

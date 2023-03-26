/* eslint-disable react/destructuring-assignment */
import { Button } from 'antd'
import { formatFlag } from 'helpers/utilities'

function LevelTwo(properties: { flag: string }): JSX.Element {
	const onDodgyFunction = (): void => {
		throw new Error(formatFlag(properties.flag))
	}

	return (
		<div className='flex flex-row items-center gap-x-6'>
			<p>
				Please do not click this red &quot;Danger!&quot; button.. We rushed a
				release and we haven&#39;t tested it.
			</p>
			<Button
				className='drop-shadow-l'
				onClick={onDodgyFunction}
				type='primary'
				danger
			>
				Danger!
			</Button>
		</div>
	)
}

export default LevelTwo

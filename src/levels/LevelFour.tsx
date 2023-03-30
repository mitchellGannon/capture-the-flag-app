import { formatFlag } from 'helpers/utilities'

/* eslint-disable react/destructuring-assignment */
function LevelFour(properties: { flag: string }): JSX.Element {
	return (
		<p>
			Absolutely nothing to see here....
			<span style={{ visibility: 'hidden' }}>
				flag{formatFlag(properties.flag)}
			</span>
		</p>
	)
}

export default LevelFour

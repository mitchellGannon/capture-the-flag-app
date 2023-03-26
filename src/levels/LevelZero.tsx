/* eslint-disable react/destructuring-assignment */

import { formatFlag } from 'helpers/utilities'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function LevelZero(properties: { flag: string }) {
	return <p>{formatFlag(properties.flag)}</p>
}

export default LevelZero

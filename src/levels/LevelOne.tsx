function LevelOne(): JSX.Element {
	const hiddenFlag = 'flag{now-we-are-cooking-with-gas}'
	return (
		<p>
			Absolutely nothing to see here....{' '}
			<span style={{ visibility: 'hidden' }}>{hiddenFlag}</span>
		</p>
	)
}

export default LevelOne

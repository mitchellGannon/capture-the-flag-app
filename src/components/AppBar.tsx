/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable react/destructuring-assignment */
const imageStyle = {
	height: '45px',
	width: 'auto'
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function AppBar(properties: { level: number }) {
	return (
		<div
			className='sticky top-0 h-16 w-full flex-shrink-0 grid-cols-3 items-center px-6 shadow-md'
			style={{ backgroundColor: '#ffe600', display: 'grid', zIndex: 10 }}
		>
			<img
				src='../../assets/unsw_logo.png'
				style={imageStyle}
				alt='UNSW Logo'
			/>
			<h1
				className='font-medium tracking-wider text-slate-700'
				style={{ textAlign: 'center' }}
			>
				Capture the Flag
			</h1>
			<p className='text-slate-700' style={{ textAlign: 'right' }}>
				Level: {properties.level}
			</p>
		</div>
	)
}

export default AppBar

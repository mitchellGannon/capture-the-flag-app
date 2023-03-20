const imageStyle = {
	height: '45px',
	width: 'auto'
}

function AppBar() {
	return (
		<div
			className='sticky top-0 h-16 w-full grid-cols-3 items-center px-6 shadow-md'
			style={{ backgroundColor: '#ffe600', display: 'grid' }}
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
		</div>
	)
}

export default AppBar

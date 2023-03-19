import React from 'react';

const imageStyle = {
  height: '45px',
  width: 'auto'
}

const AppBar = () => {
  return (
    <>
      <div className='fixed w-full top-0 h-16 px-6 shadow-md grid-cols-3 items-center' style={{backgroundColor: "#ffe600", display: 'grid'}}>
        <img src="../../assets/unsw_logo.png" style={imageStyle} />
        <h1 className='tracking-wider font-medium text-slate-700' style={{textAlign: 'center'}}>Capture the Flag</h1>
      </div>
    </>
  );
};

export default AppBar;

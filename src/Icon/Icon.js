import React from 'react';
import './Icon.css'


function Icon ({className, handleClick, fontColour}) {
	return (
		<i style={{color: fontColour}} className={className} onClick={handleClick}></i>
	)
}

export default Icon;

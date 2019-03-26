import React from 'react';
import './Icon.css'


function Icon ({className, handleClick}) {
	return (
		<i className={className} onClick={handleClick}></i>
	)
}

export default Icon;

import React from 'react'
import './AuthorName.css'

function AuthorName ({className, name, fontColour}) {
	return (
		<span style={{color: fontColour}} className='Author'>{name}</span>
	)
}

export default AuthorName;

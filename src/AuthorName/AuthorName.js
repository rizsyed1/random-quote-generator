import React from 'react'
import './AuthorName.css'

function AuthorName ({className, name}) {
	return (
		<span className='Author'>{name}</span>
	)
}

export default AuthorName;

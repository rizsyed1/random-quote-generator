import React from 'react';
import './QuoteButton.css';

function QuoteButton ({handleClick}) {
	return (
		<input type='button' value='New Quote' onClick={handleClick}></input>
	)
}

export default QuoteButton;

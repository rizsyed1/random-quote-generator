import React from 'react';
import './QuoteButton.css';

function QuoteButton ({handleClick, fontColour}) {
	return (
		<input style={{backgroundColor: fontColour}} type='button' value='New Quote' onClick={handleClick}></input>
	)
}

export default QuoteButton;

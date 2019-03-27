import React from 'react';
import './QuoteDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function QuoteDisplay({quote, className, quotationMark}) {
	return (
		<span className={className} ><FontAwesomeIcon icon={quotationMark} />{quote}</span>
	)
}

export default QuoteDisplay

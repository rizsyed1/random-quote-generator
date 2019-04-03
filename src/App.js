import React from 'react';
import QuoteButton from './QuoteButton/QuoteButton.js';
import QuoteDisplay from './QuoteDisplay/QuoteDisplay.js';
import Icon from './Icon/Icon.js';
import AuthorName from './AuthorName/AuthorName.js';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import Colours from './Colours/colours.js';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shareQuote: 'Quote Loading ',
			currentAuthor: 'Author Loading',
			colour: 'red'
		}

	}


	handleTwitterShare = () => {
		let state = this.state.shareQuote;
		let author = this.state.currentAuthor;
		window.open(`https://twitter.com/intent/tweet?hashtags=quotes&text=${state} ${author}`)
	}

	handleTumblrShare = () => {
		let author = encodeURIComponent(this.state.currentAuthor);
		let quote = encodeURIComponent(this.state.shareQuote);
		window.open(`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${author}&content=${quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`);
	}

	componentDidMount = () =>
		this.fetchData();



	decodeQuote = (html) => {
		let txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}


	fetchData = () => {
		fetch('https://thesimpsonsquoteapi.glitch.me/quotes' , {cache: "no-store"})
			.then(response => response.json())
			.then(data => {
				let parsedQuote = data[0]['quote'].replace(/<\/?\w+\s?>/g, '')
				let htmlQuote = this.decodeQuote(parsedQuote)

				if (htmlQuote.length > 300){
					this.fetchData()
				}	else {
						this.setState({
								shareQuote: htmlQuote,
								currentAuthor: data[0]['character']
						})
					}
			}
			);
		this.fetchColour();
		
	
	}

	fetchColour = () => {
		this.setState({
			colour: Colours[Math.floor(Math.random() * (Colours.length) )]
		});
	}

	render() {
		let mainColour = this.state.colour;
		return (	
			<div style={{backgroundColor: mainColour}} className='Container'>
				<div className='QuoteBox'>
					<div className='QuoteElement'>
					<QuoteDisplay fontColour={mainColour} className='quote' quotationMark={faQuoteLeft} quote={this.state.shareQuote} />
					</div>
					<div className='AuthorContainer'>
						<AuthorName fontColour={mainColour} className='Author' name={this.state.currentAuthor} />
					</div>
					<div className='ButtonsIconContainer'>
						<div className='Icons'>
							<Icon fontColour={mainColour} className="fab fa-twitter-square" handleClick={this.handleTwitterShare} />
							<Icon fontColour={mainColour} className="fab fa-tumblr-square" handleClick={this.handleTumblrShare} />
						</div>
						<div className='NewQuote'>
							<QuoteButton fontColour={mainColour} handleClick={this.fetchData} />
						</div>
					</div>
				</div>
			</div>
		);
	}

}


export default App;

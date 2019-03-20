import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
// Create the shareQuote and color functions for state.
//Update: look up how to set state inside the fetch function as is attempted below


class QuoteGenerator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shareQuote: 'I am Riz.',
			currentAuthor: 'Riz',
			color: 'red'
		}
		this.handleTwitterShare = this.handleTwitterShare.bind(this);
		this.handleTumblrShare = this.handleTumblrShare.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.decodeQuote = this.decodeQuote.bind(this)
	}


	handleTwitterShare(){
		window.open('https://twitter.com/intent/tweet?hashtags=quotes&text=' + '"' + this.state.shareQuote + '"' + ' ' + this.state.currentAuthor)
	}

	handleTumblrShare(){
		window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' + encodeURIComponent(this.state.currentAuthor) +'&content=' + encodeURIComponent(this.state.shareQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
	}


	componentDidMount() {
		this.fetchData();
	}

	decodeQuote (html) {
		let txt = document.createElement('textarea');
		txt.innerHTML = html;
		return txt.value;
	}

	fetchData () {
		fetch('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', {cache: "no-store"})
			.then(response => response.json())
			.then(data => {
				let parsedQuote = data[0]['content'].replace(/<\/?\w+>/g, '')
				let htmlQuote = this.decodeQuote(parsedQuote)

				this.setState({
						shareQuote: htmlQuote,
						currentAuthor: data[0]['title']
				})
			}
			)
	}



	render() {
		return (
			<div id='quoteBox'>
				<div id='quoteText'>
					<span id='text'><FontAwesomeIcon icon={faQuoteLeft} />{this.state.shareQuote}<FontAwesomeIcon icon={faQuoteRight} /></span>
				</div>
				<div id='quoteAuthor'>
					<span id='author'>{this.state.currentAuthor}</span>
				</div>
				<div id='buttons'>
					<button className='tweet-quote' onClick={this.handleTwitterShare}>Tweet</button>
					<button className='tumblr-quote' onClick={this.handleTumblrShare}>Tumblr Share</button>
					<input type='button' id='new-quote' value='New Quote' onClick={this.fetchData} />
				</div>
			</div>
		);
	}

}


ReactDOM.render(<QuoteGenerator />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

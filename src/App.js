import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight, faTwitter } from '@fortawesome/free-solid-svg-icons';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shareQuote: 'Quote Loading ',
			currentAuthor: 'Author Loading',
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
				let parsedQuote = data[0]['content'].replace(/<\/?\w+\s?>/g, '')
				let htmlQuote = this.decodeQuote(parsedQuote)

				if (htmlQuote.length > 300){
					this.fetchData()
				}	else {
						this.setState({
								shareQuote: htmlQuote,
								currentAuthor: data[0]['title']
						})
					}
			}
			)
	}



	render() {
		return (
      <div className='Container'>
  			<div className='QuoteBox'>
  				<div className='QuoteContainer'>
  					<span className='Quote'><FontAwesomeIcon icon={faQuoteLeft} />{this.state.shareQuote}</span>
  				</div>
  				<div className='AuthorContainer'>
  					<span className='Author'>{this.state.currentAuthor}</span>
  				</div>
  				<div className='Buttons'>
  					<i className="fab fa-twitter-square" onClick={this.handleTwitterShare}></i>
  					<i class="fab fa-tumblr-square" onClick={this.handleTumblrShare}></i>
  					<input type='button' id='new-quote' value='New Quote' onClick={this.fetchData} />
  				</div>
  			</div>
      </div>
		);
	}

}


export default App;

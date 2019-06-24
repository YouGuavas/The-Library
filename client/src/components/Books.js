import React, {Component} from 'react';
import {getBooksData} from '../utils/api';
import {Link} from 'react-router-dom';


export default class Books extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
			page:0,
			perPage: 3,
			displayBooks: [] 
		}
	}
	getBooks = () => {
		getBooksData().then(books => {
			this.setState({
				books
			}, () => {
				this.setState({
					displayBooks: this.state.books.slice(this.state.page * this.state.perPage, this.state.page * this.state.perPage + this.state.perPage),
					numPages: Math.ceil(this.state.books.length/this.state.perPage)
				})
			});
		});
	}
	incrementPage = () => {
		if (this.state.page < this.state.numPages - 1) {
		this.togglePage(this.state.page);
		this.togglePage(this.state.page+1);
		this.setState({
			page: this.state.page+1
		}, () => {this.displayBooks()})
		}
	}
	decrementPage = () => {
		if (this.state.page > 0) {
		this.togglePage(this.state.page);
		this.togglePage(this.state.page-1);
		this.setState({
			page: this.state.page-1
		}, () => {this.displayBooks()}) 
		}
	}
	displayBooks = () => {
		this.setState({
			displayBooks: this.state.books.slice(this.state.page*this.state.perPage, this.state.page*this.state.perPage+this.state.perPage)
		}, () => {
			if (this.state.displayBooks.length < this.state.perPage) {
				let books = this.state.displayBooks;
				console.log(this.state.displayBooks.length);
				for (let i = this.state.displayBooks.length; i < this.state.perPage; i++) {
					books.push({'title': '', 'author': '', '_id': ''})
				};
				this.setState({displayBooks: books});
			}
		})
	}

	setPage = (prevPage, newPage) => {
		this.togglePage(prevPage);
		this.togglePage(newPage);
		this.setState({
			page: newPage
		}, () => {this.displayBooks()});
	}
	togglePage = (page) => {
		document.getElementById(page).classList.toggle('is-current');
	} 
	componentDidMount() {
		this.getBooks();
	}
	render() {
		const books = this.state.displayBooks;
		return(
			<div className='books'>
				<div className='level' id='title-level'>
					<div className='level-item'>
						<div className='has-text-centered column'>
							Title
						</div>
						<div className='has-text-centered hideWhenSmall column'>
							Author
						</div>
					</div>
				</div>
				{Array.isArray(books) ? (
					console.log(books),
					books.map((book, index) => (
					<Item title={book.title} author={book.author} url={book._id} key={index}/>
				))) : null
				}
			<Paginator tabindex='0' setPage={(pP, nP) => {this.setPage(pP, nP)}} decrementPage={this.decrementPage} incrementPage={this.incrementPage} numPages={this.state.numPages}/>
			</div>
			)
	}
}
class Paginator extends Component {
	createLinks = () => {
		const links = [];
		for (let i = 0; i < this.props.numPages; i++) {
			links.push(
				[]
				)
		}
		return links;
	}
	render() {
		const links = this.createLinks();
		return (
			<nav className='pagination is-centered'>
				<button className='pagination-previous' onClick={this.props.decrementPage}>Previous</button>
				<button className='pagination-next' onClick={this.props.incrementPage}>Next</button>
				<ul className='pagination-list'>
				{ links.map((item, i) => (
					<li key={i}>
						{i === 0 ? <button className='pagination-link is-current' id={`${i}`} onClick={() => this.props.setPage(document.getElementsByClassName('is-current')[0].id, i)}>{i+1}</button> : <button className='pagination-link' id={`${i}`} onClick={() => this.props.setPage(document.getElementsByClassName('is-current')[0].id, i)}>{i+1}</button> }
					</li>
					))
					}
				</ul>
			</nav>
			)
		}
}


class Item extends Component {
	render() {
		return(
			<div className={this.props.title.length > 0 ? 'level-books level' : 'level'}>
				{this.props.title.length > 0 ? (<Link to={`/book/${this.props.url}`} className='level-item'>
						<div className='has-text-centered column'>
							{this.props.title}
							{this.props.title.length === 0 ? <span className='space-taker'></span> : null}
						</div>
						<div className='has-text-centered hideWhenSmall column'> 
							{this.props.author}
						</div>
					{this.props.title.length === 0 ? <span className='space-taker'></span> : null}
		</Link> ) : <span className='space-taker'></span> }
			</div>
			)
	}
}

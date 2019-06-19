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
	setPage = (page) => {
		this.setState({
			page: page
		}, () => {
				this.setState({
					displayBooks: this.state.books.slice(this.state.page*this.state.perPage, this.state.page*this.state.perPage+this.state.perPage)
				})
			});
	}
	incrementPage = () => {
		this.state.page < this.state.numPages-1 ? (
		this.setState({
			page: this.state.page+1
		}, () => {
				this.setState({
					displayBooks: this.state.books.slice(this.state.page*this.state.perPage, this.state.page*this.state.perPage+this.state.perPage)
				})
			})
		) : null;
	}
	decrementPage = () => {
		this.state.page > 0 ? (
		this.setState({
			page: this.state.page-1
		}, () => {
				this.setState({
					displayBooks: this.state.books.slice(this.state.page*this.state.perPage, this.state.page*this.state.perPage+this.state.perPage)
				})
			}) 
		) : null;
	}
	componentDidMount() {
		this.getBooks();
	}
	render() {
		const books = this.state.displayBooks;
		const {numPages} = this.state;
		let links = [];
		for (let i = 0; i < numPages; i++) {
			links.push(
				<li>
					<a className='pagination-link' onClick={() => this.setPage(i)}>{i+1}</a>
				</li>
				)
		}
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
				{books.map((book, index) => (
					<Item title={book.title} author={book.author || 'unknown'} url={book._id} key={index}/>
				))
			}
			<Paginator tabindex='0' decrementPage={this.decrementPage} incrementPage={this.incrementPage} links={links}/>
			</div>
			)
	}
}
class Paginator extends Component {
	render() {
		return (
			<nav className='pagination is-centered'>
				<a className='pagination-previous' onClick={this.props.decrementPage}>Previous</a>
				<a className='pagination-next' onClick={this.props.incrementPage}>Next</a>
				<ul className='pagination-list'>
				{
					this.props.links.map((item) => (
						item
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
			<div className='level-books level'>
				<Link to={`/book/${this.props.url}`} className='level-item'>
						<div className='has-text-centered column'>
							{this.props.title}
						</div>
						<div className='has-text-centered hideWhenSmall column'> 
							{this.props.author}
						</div>
				</Link>
			</div>
			)
	}
}

import React, {Component} from 'react';
import {getBookData, deleteBook} from '../utils/api';
import Comments from './Comments';

export default class Book extends Component {
	constructor() {
		super();
		this.state = {};
	}
	getBook = (bookID) => {
		getBookData(bookID).then(res => {
			const title = res.data.title;
			const author = res.data.author;
			const published = res.data.published;
			const finished = res.data.finished;
			const synopsis = res.data.synopsis;
			const notes = res.data.notes;
			const bID = res.data._id;
			const comments = res.data.comments;
			const userId = res.data.uid;
			this.setState({
				title, author, published, finished, synopsis, notes, bID, comments, userId
			})
		})
	}
	handleDelete = () => {
		deleteBook(this.state.bID);
		window.location.replace(window.location.origin);
	}
	componentDidMount() {
		const search = window.location.pathname.split('/')[2];
		this.getBook(search, () => {
			if (typeof localStorage['authData'] !== 'undefined') this.setState(JSON.parse(localStorage['authData']), () => {
				let isOwner;
				JSON.parse(localStorage['authData']).user.id === this.state.userId ? isOwner = true : isOwner = false
				this.setState({isOwner}); 
			});
		});
	}
	render() {
		const {title, author, published, finished, synopsis, notes, isOwner} = this.state;
		return(
			<div name={title}>
				{title ? <h1 className='title'>{title}</h1> : null /* display title if it exists */}
				{author ? <h2 className='title'>Written by: {author}</h2> : null /* display author if it exists */}
				{published ? <h3 className='title hideWhenSmall'>Published on: {published}</h3> : null /* display Published date if it exists */ }
				{finished ? <h3 className='title hideWhenSmall'>Finished reading on: {finished}</h3> : null /* display the date finished reading if it exists */ }
				{synopsis ? synopsis.split('\n').map((item,index) => <p key={index}>{item}<br/></p> ): null /* display synopsis if it exists */}
				{notes ? notes.indexOf('\n') !== -1 ? notes.split('\n').map((item, index) => { return <p key={index}>{item}</p> }) : <p>{notes}</p> : null /* display notes if they exist */ }
				
				{isOwner ? <button className='button is-danger' onClick={this.handleDelete}>Delete</button> : null /* only allow authed users to delete */ }
				{title ? <Comments comments={this.state.comments || ['']} book={this.state.bID} bookOwner={this.state.userId}/> : null /* display comments if book exists */ }
			</div>
			)
	}
}
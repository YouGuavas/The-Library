import React, {Component} from 'react';
import {getBookData, deleteBook} from '../utils/api';
import Comments from './Comments';

export default class Book extends Component {
	constructor() {
		super();
		this.state = {};
	}
	getBook(bookID) {
		getBookData(bookID).then(res => {
			const title = res.data.title;
			const author = res.data.author;
			const published = res.data.published;
			const finished = res.data.finished;
			const synopsis = res.data.synopsis;
			const notes = res.data.notes;
			const bID = res.data._id;
			const comments = res.data.comments;
			this.setState({
				title, author, published, finished, synopsis, notes, bID, comments
			})

		})
	}
	handleDelete() {
		deleteBook(this.state.bID);
		window.location.replace(window.location.origin);
	}
	componentDidMount() {
		typeof localStorage['authData'] !== 'undefined' ? this.setState(JSON.parse(localStorage['authData'])) : null;
		const search = window.location.pathname.split('/')[2];
		this.getBook(search);
	}
	render() {
		const {title, author, published, finished, synopsis, notes, isAuthed} = this.state;
		return(
			<div>
				{title ? <h1 className='title'>{title}</h1> : null}
				{author ? <h2 className='title'>Written by: {author}</h2> : null}
				{published ? <h3 className='title hideWhenSmall'>Published on: {published}</h3> : null}
				{finished ? <h3 className='title hideWhenSmall'>Finished reading on: {finished}</h3> : null}
				{synopsis ? synopsis.split('\n').map(item => <p>{item}<br/></p> ): null}
				{notes ? notes.indexOf('\n') !== -1 ? notes.split('\n').map(item => { <p>{item}</p> }) : <p>{notes}</p> : null}
				{isAuthed ? <button className='button is-danger' onClick={this.handleDelete}>Delete</button> : null }
				{title ? <Comments comments={this.state.comments || ['']}/> : null}
			</div>
			)
	}
}
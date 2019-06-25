import React, {Component} from 'react';
import {newBook} from '../utils/api';

export default class NewBook extends Component {
	constructor(props) {
		super();
		this.state = {
			title: '',
			author: '',
			synopsis: '',
			'notes': [],
			isAuthed: props.isAuthed
		}
	}
	handleChange = e => {
		e.target.id !== 'notes' ? (
		this.setState({
			[e.target.id]: e.target.value
		})
		) : (
			this.setState({
				[e.target.id]: e.target.value.split('\n')
			})
		)
	}
	handleClick = () => {
		if (this.state.isAuthed) {
		newBook(this.state);
		window.location.replace(window.location.origin);
		} else alert("Please sign in before creating a new book.")
	}
	toggleHidden = (t) => {
		document.getElementById(t).classList.toggle('hidden');
	}
	componentDidMount() {
		this.setState(JSON.parse(localStorage['authData']));

	}
	render() {
		return(
				<div>
					<div className='field'>
						<label className='title'>Title *</label>
						<div className='control'>
							<input onChange={this.handleChange} id='title' className='input' type='text'/>
						</div>
					</div>
					<div className='field'>
						<label className='title' onClick={() => this.toggleHidden('author')}>Author *</label>
						<div className='control'>
							<input onChange={this.handleChange} id='author' className='input' type='text'/>
						</div>
					</div>
					<div className='field'>
						<label className='title'>Synopsis</label>
						<div className='control'>
							<textarea onChange={this.handleChange} id='synopsis' className='textarea'/>
						</div>
					</div>
					<div className='field'>
						<label className='title' onClick={() => this.toggleHidden('notes')}>Notes</label>
						<div className='control'>
							<textarea onChange={this.handleChange} id='notes' className='textarea hidden'/>
						</div>
					</div>
					<button className='button is-light' onClick={this.handleClick}>Submit</button>
				</div>
			)
	}
}
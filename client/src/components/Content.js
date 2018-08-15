import React, {Component} from 'react';
import Books from './Books';

export default class Content extends Component {
	render() {
		return(
		<div>
			<h1 className='title'>Welcome to The Library!</h1>
			<p>
				A collection of every book I've read since April, 2018.
			</p>
			<Books/>
		</div>
	)}
}
import React, {Component} from 'react';
import {newComment} from '../utils/api';

export default class Comments extends Component {
	constructor(props) {
		super();
		this.state = {
			comments: props.comments
		}
	}
	handleComment = comment => {
		this.setState({
			comments: this.state.comments + comment
		});
	}
	render() {
		const comments = this.state.comments;
		const user = JSON.parse(localStorage['authData']).user;
		return(
			<div className='comments books'>
				<h3 className='title'>Comments</h3>
				{
					comments.length > 0 ? (
						console.log(comments),
						comments.map((item, index) => (
							item.comment ? <Comment item={item} key={index} /> : null
					))
						) : null
			}
			{user.id ? <NewComment user={user} onComment={(comment) => {this.handleComment(comment)}}/> : null}
				</div>
			)
	}
}

class NewComment extends Component {
	constructor() {
		super();
		this.state = {
			user:  JSON.parse(localStorage['authData']).user,
			comment:''
		};
	}
	handleChange = e => {
		this.setState({
			comment: e.target.value
		})
	}
	handleSubmit = () => {
		const search = window.location.pathname.split('/')[2];
		if (this.state.comment.length > 1) { 
			newComment(search, this.state);
			this.props.onComment(this.state.comment);
			this.setState({
				comment: ''
			})
	 } else alert('Please type out a comment.')
	}
	render() {
		return (
			<article className='media'>
				<figure className='media-left'>
					<p className='image is-64x64'>
						<img src={this.props.user.picture} className='commenterAvatar' alt={`User ${this.props.user.username}'s avatar`}/>
					</p>
				</figure>
				<div className='media-content'>
					<div className='field'>
						<div className='control'>
							<textarea className='input' type='textarea' onChange={this.handleChange}/>
						</div>
						<nav className="level">
				      <div className="level-left">
				        <div className="level-item">
				          <button className="button is-info" onClick={this.handleSubmit}>Submit</button>
				        </div>
				      </div>
				     </nav>
					</div>
				</div>
			</article>
			)
	}
}

class Comment extends Component {
	render() {
		const {comment, user} = this.props.item;
		return(
			<article className='media'>
				<figure className='media-left'>
					<p className='image is-64x64'>
						<img src={user.picture} alt={`User ${user.username}'s avatar`}/>
					</p>
				</figure>
				<div className='media-content'>
					<div className='content comment-content'>
						<p>
							<strong>@{user.username}</strong>
							<br/>
							{comment}
						</p>
					</div>
				</div>
		
			</article>
			)
	}
}
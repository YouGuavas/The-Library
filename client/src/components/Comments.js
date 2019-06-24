import React, {Component} from 'react';
import {newComment, deleteComment} from '../utils/api';

export default class Comments extends Component {
	constructor(props) {
		super();
		this.state = {
			comments: props.comments,
			bookOwner: props.bookOwner
		}
	}
	handleComment = comment => {
		const comments = this.state.comments || [];
		comments.push(comment);
		this.setState({
			comments
		});
	}
	handleDelete = order => {
		let comments = this.state.comments || [];
		comments = comments.slice(0, order).concat(comments.slice(order+1, comments.length));
		this.setState({
			comments
		});
	}
	render() {
		const comments = this.state.comments;
		const user = JSON.parse(localStorage['authData']).user;
		const isOwner = JSON.parse(localStorage['authData']).user === this.props.bookOwner;
		return(
			<div className='comments books'>
				<h3 className='title'>Comments</h3>
				{
					comments.length > 0 ? Array.isArray(comments) ? (
						comments.map((item, index) => (
							item.comment ? <Comment item={item} key={index} index={index} onDelete={comment => {this.handleDelete(comment)}} /> : null
					))
						) : console.log(comments) : console.log(comments)
			}
			{user.id ? <NewComment isBookOwner={isOwner} user={user} onComment={(comment) => {this.handleComment(comment)}}/> : null}
				</div>
			)
	}
}

class NewComment extends Component {
	constructor(props) {
		super();
		this.state = {
			user:  JSON.parse(localStorage['authData']).user,
			comment:'',
			bookOwner: props.isBookOwner
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
			this.props.onComment(this.state);
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
							<textarea className='input' type='textarea' onChange={this.handleChange} value={this.state.comment}/>
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
	constructor(props) {
		super();
		this.state = {
			order: props.index
		};
	}
	handleDelete = () => {
		const search = window.location.pathname.split('/')[2];
		this.props.onDelete(this.state.order);
		deleteComment(search, this.state.order);
	}
	componentDidMount() {
		if (typeof localStorage['authData'] !== 'undefined') {
			let isOwner;
			JSON.parse(localStorage['authData']).user.id === this.props.item.user.id ? isOwner = true : isOwner = false 
			this.setState(JSON.parse(localStorage['authData']), () => {
				this.setState({isOwner});
			});
		}
	}
	render() {
		const {comment, user} = this.props.item;
		const isOwner = this.state;
		return(
			<article className='media'>
				<figure className='media-left'>
					<p className='image is-64x64'>
						<img src={user.picture} className='commenterAvatar' alt={`User ${user.username}'s avatar`}/>
					</p>
				</figure>
				<div className='media-content'>
					<div className='content comment-content'>
						<p>
							<strong>@<a href={`https://twitter.com/${user.username}`}>{user.username}</a></strong>
							<br/>
							{comment}
						</p>
						{isOwner ? <button className='button is-danger' onClick={this.handleDelete}>Delete</button> : null /* only allow authed users to delete */ }
					</div>
				</div>
		
			</article>
			)
	}
}
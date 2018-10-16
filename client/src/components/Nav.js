import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TwitterLogin from 'react-twitter-auth';

export default class Nav extends Component {
	handleClick = () => {
		document.getElementById('burger').classList.toggle('is-active');
		document.getElementById('navMenu').classList.toggle('is-active');
		//toggle hamburger menu
	}
	handleSuccess = res => {
		this.props.handleSuccess(res);
	}
	logout = () => {
		this.props.logout();
	}
	handleFail = err => {
		this.props.handleFail(err);
	}
	render() {
		return(
			<div className='hero-head'>
				<nav className='navbar is-dark'>
					<div className='navbar-brand'>
						<Link to='/' onClick={this.handleClickItem} className='navbar-item'>The Library</Link>
						<span id='burger' className="navbar-burger burger" onClick={this.handleClick}>
		          <span></span>
		          <span></span>
		          <span></span>
						</span>
					</div>
					<div id='navMenu' className='navbar-menu'>
						<div className='navbar-end'>
							{this.props.isAuthed === true ? <a href={`https://twitter.com/${this.props.user.username}`} target='_blank' id='twitterUser'><img className='twitterAvi' src={this.props.user.picture}/>@{this.props.user.username}</a> : null}
							<Link to='/' onClick={this.handleClickItem} className='navbar-item'>Home</Link>
							{this.props.isAuthed === true ? <Link to='/newbook' onClick={this.handleClickItem} className='navbar-item'>New Book</Link> : null}
							{this.props.isAuthed === true ? <Link to='/' onClick={this.logout} className='navbar-item'>Logout</Link> : <TwitterLogin className='navbar-item twitterer' loginUrl='http://localhost:3333/api/auth/twitter' onFailure={this.handleFail} onSuccess={this.handleSuccess} requestTokenUrl='http://localhost:3333/api/auth/twitter/reverse' /> }
						</div>
					</div>
				</nav>
				</div>
			)
	}
}
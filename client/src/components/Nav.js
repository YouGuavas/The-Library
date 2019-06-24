import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TwitterLogin from 'react-twitter-auth';

const environment = process.env.NODE_ENV;
let API_URL;

environment === 'dev' || 'development' ? API_URL = 'https://the-library-of-guavas.herokuapp.com' : API_URL = 'https://the-library-of-guavas.herokuapp.com';


export default class Nav extends Component {
	handleClick = () => {
		document.getElementById('burger').classList.toggle('is-active');
		document.getElementById('navMenu').classList.toggle('is-active');
		//toggle hamburger menu
	}
	handleClickItem = (cName) => {
		if (cName === 'main') {
			if (document.getElementById('navMenu').classList.contains('is-active')) {
				document.getElementById('burger').classList.toggle('is-active');
				document.getElementById('navMenu').classList.toggle('is-active');
			}
		} else {
			document.getElementById('burger').classList.toggle('is-active');
			document.getElementById('navMenu').classList.toggle('is-active');
		}
	}
	handleSuccess = (res) => {
		this.props.handleSuccess(res);
	}
	logout = () => {
		this.props.logout();
	}
	handleFail = (err) => {
		this.props.handleFail(err);
	}
	render() {
		return(
			<div className='hero-head'>
				<nav className='navbar is-dark'>
					<div className='navbar-brand'>
						<Link to='/' onClick={this.handleClickItem('main')} className='navbar-item'>The Library</Link>
						<span id='burger' className="navbar-burger burger" onClick={this.handleClick}>
		          <span></span>
		          <span></span>
		          <span></span>
						</span>
					</div>
					<div id='navMenu' className='navbar-menu'>
						<div className='navbar-end'>
							{this.props.isAuthed === true ? <a href={`https://twitter.com/${this.props.user.username}`} target='_blank' rel='noopener noreferrer' id='twitterUser'><img className='twitterAvi' alt={`User ${this.props.user.username}'s avatar`} src={this.props.user.picture}/><span>@{this.props.user.username}</span></a> : null}
							<Link to='/' onClick={this.handleClickItem('n')} className='navbar-item'>Home</Link>
							{this.props.isAuthed === true ? <Link to='/newbook' onClick={this.handleClickItem('n')} className='navbar-item'>New Book</Link> : null}
							{this.props.isAuthed === true ? <Link to='/' onClick={this.logout} className='navbar-item'>Logout</Link> : <TwitterLogin className='navbar-item twitterer' loginUrl={`${API_URL}/api/auth/twitter`} onFailure={this.handleFail} onSuccess={this.handleSuccess} requestTokenUrl={`${API_URL}/api/auth/twitter/reverse`} /> }
						</div>
					</div>
				</nav>
				</div>
			)
	}
}
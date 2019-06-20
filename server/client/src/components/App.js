import React, {Component} from 'react';
import Nav from './Nav';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Content from './Content';
import NewBook from './NewBook';
import Book from './Book';


export default class App extends Component {
	constructor() {
		super();
		this.state = {
			isAuthed: false,
			user: null, 
			token: ''
		}
	}
	handleSuccess = (res) => {
		const token = res.headers.get('x-auth-token');
		res.json().then(user => {
			if(token) {
				localStorage.setItem('authData', JSON.stringify({isAuthed: true, user: user, token: token}));
				this.setState({
					isAuthed: true,
					user: user,
					token: token
				});
			}
		})
	}
	handleFail = (err) => {
		console.log(err);
	}
	logout = () => {
		localStorage.setItem('authData', JSON.stringify({isAuthed: false, user: {id: null}, token: ''}))
			this.setState({
				isAuthed: false,
				user: null,
				token: ''
			})
	}
	componentDidMount() {
		if (typeof localStorage['authData'] !== 'undefined') this.setState(JSON.parse(localStorage['authData']));
	}
	render() {
		const {isAuthed} = this.state;
		const {user} = this.state;
		return(
				<Router>
					<div>
						<Nav user={user} isAuthed={isAuthed} handleFail={this.handleFail} handleSuccess={this.handleSuccess} logout={this.logout}/>
						<section className='hero is-dark'>
							<div className='container'>
								<div className='hero-body'>
									<div className='columns'>
										<div className='column is-12 has-text-centered'>
											<Route exact path='/' component={Content}/>
											<Route path='/newbook' component={NewBook}/>
											<Route path='/book' component={Book}/>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</Router>
			)
	}
}
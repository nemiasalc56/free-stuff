import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import ItemsContainer from './ItemsContainer'
import { Search, Grid, Header, Segment, Button, Input } from 'semantic-ui-react'


class App extends Component {
	constructor() {
		super()

		this.state = {
			loggedId: false,
			loginOpen: false,
			userId: -1,
			message: '',
			category: '',
			user: ''
		}
	}

	componentDidMount() {
		this.loginStatus()
	}

	// check if the user is still logged in
	loginStatus = async () =>{
		const url = process.env.REACT_APP_API_URL + '/api/v1/users/logged_in'

		try {
			const loginStatusResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const loginStatusJson = await loginStatusResponse.json()

			if(loginStatusJson.status === 200) {
				this.setState({
					loggedId: true,
					userId: loginStatusJson.data.id,
					message: loginStatusJson.message,
					user: loginStatusJson.data
				})
			}
		} catch(err) {
			console.error(err);
		}
	}


	// register method
	register = async (registerInfo) =>{
		// get our url from our enviroment variable
		const url = process.env.REACT_APP_API_URL + '/api/v1/users/register'

		try {
			// fetch the url
			const registerResponse = await fetch(url, {
				credentials: 'include',
        		method: 'POST',
        		body: JSON.stringify(registerInfo),
        		headers: {
          			'Content-Type': 'application/json'
        		}
			})

			// convert to json
			const registerJson = await registerResponse.json()
			
			if(registerJson.status === 200) {
				this.setState({
					loggedId: true,
					userId: registerJson.data.id,
					message: registerJson.message,
					user: registerJson.data
				})
			}

		}catch(err) {
			console.error(err);
		}
	}

	// login method
	login = async (loginInfo) => {
		// get our url from our enviroment variable
		const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'

		try {
			// fetch our url
			const loginResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(loginInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			// convert our response to json
			const loginJson = await loginResponse.json()
			
			if(loginJson.status === 200) {
				this.setState({
					loggedId: true,
					loginOpen: false,
					userId: loginJson.data.id,
					message: loginJson.message,
					user: loginJson.data
				})
			}

		}catch(err) {
			console.error(err);
		}
 	}

 	
  
  	render() {
  		return (
	    	<div className="App">
	    		<div className="nav-header">
		    		<Header>
		    			<div className="main">
								<Grid>
									<Grid.Row>
									<h1>Free Stuff</h1>
									
									<Search/>
									
									{this.state.loggedId
										? null
										:<h2 
											className="login-logo"
				    						onClick={()=>this.setState({loginOpen:true})}
				    						>Login
				    					</h2>
										}
										
									</Grid.Row>
								</Grid>

		    			</div>
					</Header>
	    			
	    		</div>
	      		{/* this is so that we can render conditionally */}
	      		{this.state.loginOpen
	      			? <LoginRegisterForm 
	      				register={this.register}
	      				login={this.login}
	      			/>
	      		: <ItemsContainer user={this.state.user}/>

	      		}
	      	
	    	</div>
  		)
  	}
}

export default App;
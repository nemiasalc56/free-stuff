import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import ItemsContainer from './ItemsContainer'


class App extends Component {
	constructor() {
		super()

		this.state = {
			loggedId: false,
			userId: -1,
			message: ''
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
			console.log(registerJson);
			if(registerJson.status === 200) {
				this.setState({
					loggedId: true,
					userId: registerJson.data.id,
					message: registerJson.message
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
			console.log(loginJson);
			if(loginJson.status === 200) {
				this.setState({
					loggedId: true,
					userId: loginJson.data.id,
					message: loginJson.message
				})
			}

		}catch(err) {
			console.error(err);
		}
 	}

 	
  
  	render() {
  		return (
	    	<div className="App">
	      		<h1>Free Stuff App</h1>
	      		{/* this is so that we can render conditionally */}
	      		{!this.state.loggedId
	      			? <LoginRegisterForm 
	      				register={this.register}
	      				login={this.login}
	      			/>
	      		: <ItemsContainer />

	      		}
	      	
	    	</div>
  		)
  	}
}

export default App;

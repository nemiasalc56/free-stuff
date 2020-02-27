import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'


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
  
  	render() {
  		return (
	    	<div className="App">
	      		<h1>Free Stuff App</h1>
	      	<LoginRegisterForm register={this.register}/>
	    	</div>
  		)
  	}
}

export default App;

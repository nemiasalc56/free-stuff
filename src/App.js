import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'


class App extends Component {
	constructor() {
		super()

		this.state = {
			loggedId: false,
			userId: -1
		}
	}
  
  	render() {
  		return (
	    	<div className="App">
	      		<h1>Free Stuff App</h1>
	      	<LoginRegisterForm />
	    	</div>
  		)
  	}
}

export default App;

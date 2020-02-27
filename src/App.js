import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'


class App extends Component {
  
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

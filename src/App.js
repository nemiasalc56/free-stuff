import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import ItemsContainer from './ItemsContainer'
import { Search, Grid, Header, Segment, Button, Input } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProfileContainer from './ProfileContainer'



class App extends Component {
	constructor() {
		super()

		this.state = {
			loggedIn: false,
			loginOpen: false,
			userId: -1,
			message: '',
			category: ''
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
					loggedIn: false,
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
			console.log(loginJson);
			if(loginJson.status === 200) {
				this.setState({
					loggedIn: true,
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
	    		<Router>
		    		<div className="nav-header">
			    		<Header>
			    			<div className="main">
									<Grid>
										<Grid.Row>
											<Link to='/'>
												<h1 onClick={()=>this.setState({loginOpen:false})}>Free Stuff</h1>	
											</Link>
										
										<Search size="large"
											style={{width:"400px"}}
										/>
										{this.state.loggedIn
											?null
											:<Link to='/login'
					    					onClick={()=>this.setState({loginOpen:true})}
					    					>Login</Link>
										}
											
										</Grid.Row>
									</Grid>
			    			</div>
						</Header>
		    			
		    		</div>
		      		{/* this is so that we can render conditionally */}
		      		<Switch>
		      			<Route path='/login'>
		      				<LoginRegisterForm 
		      					register={this.register}
		      					login={this.login}
		      				/>
		      			</Route>
		      			
		      			<Route path='/'>
		      				<ItemsContainer user={this.state}/>	
		      			</Route>
		      		</Switch>

		      		
	      		
	      			
	      		</Router>
	    	</div>
  		)
  	}
}

export default App;
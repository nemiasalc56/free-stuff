import React, { Component } from 'react';
import _ from 'lodash'
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import ItemsContainer from './ItemsContainer'
import { Grid, Header, Button, Input } from 'semantic-ui-react'


class App extends Component {
	constructor() {
		super()

		this.state = {
			loggedIn: false,
			loginOpen: false,
			userId: -1,
			message: '',
			category: '',
			user: '',
			isLoading: false, 
			results: [], 
			value: '',
			items: null,
			data: null,
			searching: false
		}
	}

	componentDidMount() {
		this.loginStatus()

		this.getItems()

	}

		// get get all the items
	getItems = async () => {
		// get the url from our enviroment variable
		const url = process.env.REACT_APP_API_URL + '/api/v1/items/'
		try {
			// fetch url
			const itemsResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			
			// convert data to json
			const itemsJson = await itemsResponse.json()

			if(itemsJson.status === 200) {
				this.setState({
					items: itemsJson.data
				})
			}

		}catch(err) {
			console.error(err);
		}

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
					loggedIn: true,
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
					loggedIn: true,
					loginOpen: false,
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
					loggedIn: true,
					loginOpen: false,
					userId: loginJson.data.id,
					message: loginJson.message,
					user: loginJson.data
				})
			}else{
				console.log("didnt work");
			}

		}catch(err) {
			console.error(err);
		}
 	}

 	// log user out
 	logout = async () =>{

 		const url = process.env.REACT_APP_API_URL + '/api/v1/users/logout'
 		// fetch url
 		const logoutResponse = await fetch(url, {
 			credentials: 'include',
 			method: 'GET',
 			headers: {
 				'Content-Type': 'application/json'
 			}
 		})

 		// convert to json
 		const logoutJson = await logoutResponse.json()

 		if(logoutJson.status === 201) {
				this.setState({
					loggedIn: false,
					loginOpen: false,
					userId: -1,
					message: '',
					category: '',
					user: ''
				})
			}
 	}

  	handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({
      		isLoading: false, 
			results: [], 
			value: ''
      })

      const re = new RegExp(this.state.value, 'i')
      const isMatch = (result) => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.items, isMatch),
      })
    }, 300)
  }
  
  	handleSubmit = (e) =>{
  		e.preventDefault()		
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
									<form onSubmit={this.handleSubmit}>
									    <div className="ui icon input">

											<Input
												className="search"
												type="text"
									        	loading={this.state.isLoading}
									            onChange={_.debounce(this.handleSearchChange, 500, {
									              leading: true,
									            })}
									            results={this.state.results}
									            value={this.state.value}
									        />
									        <i aria-hidden="true" className="search icon"></i>
								          </div>

								          <Button type="submite">Search</Button>
									</form>
									
									{this.state.loggedIn
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
	      		: <ItemsContainer 
	      			user={this.state.user}
	      			itemSearch={this.state.results}
	      			logout={this.logout}
	      		/>

	      		}
	    	</div>
  		)
  	}
}

export default App;
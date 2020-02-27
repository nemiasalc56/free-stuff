import React, {Component} from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import './index.css'

class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			first_name: '',
			last_name: '',
			picture: '',
			address_1: '',
			address_2: '',
			city: '',
			state: '',
			zip_code: '',
			email: '',
			password: '',
			action: 'login'
		}
	}

	// handle changes
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// switch form
	switchForm = () => {
		if(this.state.action === 'login'){
			this.setState({action: 'register'})
		} else if(this.state.action === 'register') {
			this.setState({action: 'login'})
		}
		this.clearForm()
	}

	// handle submit
	handleSubmit = (e) => {
		e.preventDefault()

		if(this.state.action === "register") {
			this.props.register(this.state)

		} else if(this.state.action === "login") {
			this.props.login({
				email: this.state.email,
				password: this.state.password
			})
		}

		this.clearForm()
	}

	// clear form
	clearForm = () => {
		this.setState(this.state)
	}

	render() {
		return (			
			
				<Grid className="center aligned">
					<Segment 
						style={{
							marginTop: '200px'
						}}
					>
						<Grid.Row>
							<h2>
								{this.state.action === "login"
									? "Login"
									: "Create A New Account"
								}
							</h2>
						</Grid.Row>
						<Form onSubmit={this.handleSubmit}>
							{this.state.action === 'register'
								?
								<div>
									<Form.Group>
									<Form.Input 
										label="First name"
										type="text" 
										name="first_name"
										value={this.state.first_name}
										onChange={this.handleChange}
										placeholder="First name" />
									<Form.Input 
										label="Last name"
										type="text"
										name="last_name"
										value={this.state.last_name}
										onChange={this.handleChange} 
										placeholder="Last name" />
								</Form.Group>
								<Form.Group>
									
									<Form.Input 
										label="Address 1"
										type="text" 
										name="address_1"
										value={this.state.address_1}
										onChange={this.handleChange}
										placeholder="Address 1" />
								
									<Form.Input 
										label="Address 2" 
										type="text" 
										name="address_2"
										value={this.state.address_2}
										onChange={this.handleChange}
										placeholder="Address 2" />
								
									<Form.Input 
										label="City"
										type="text" 
										name="city"
										value={this.state.city}
										onChange={this.handleChange}
										placeholder="City" />
								
									<Form.Input 
										label="State" 
										type="text" 
										name="state"
										value={this.state.state}
										onChange={this.handleChange}
										placeholder="state" />
								
									<Form.Input 
										label="Zipcode"
										type="text" 
										name="zip_code"
										value={this.state.zip_code}
										onChange={this.handleChange}
										placeholder="Zipcode" />
								</Form.Group>

								<Form.Field>
									<Form.Input 
										label="Image"
										type="text" 
										name="picture"
										value={this.state.picture}
										onChange={this.handleChange}
										placeholder='Image' />
								</Form.Field>
								</div>
								: null
							} 

								

							<Form.Field>
								<label>Email</label>
								<input 
									type="text" 
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
									placeholder="Enter email" />
							</Form.Field>

							<Form.Field>
								<label>Password</label>
								<input 
									type="password" 
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									placeholder="Enter password" />
							</Form.Field>

							<Button color="green" className="big" type='submit'>
								{this.state.action === "login"
									? "Sign In"
									: "Sign Up"
								}
							</Button>
							<Grid className="center aligned option">
								<p onClick={this.switchForm}>
									{this.state.action === "login"
										? "Already have an account?"
										: "login"
									}
								</p>	
							</Grid>
						</Form>
					
					</Segment>
				</Grid>
			
			)
	}
}




export default LoginRegisterForm
import React, {Component} from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import './index.css'

class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: '',
			lastName: '',
			picture: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zipcode: '',
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
	}

	// handle submit
	handleSubmit = (e) => {
		e.preventDefault()

		if(this.state.action === "register") {
			this.props.register({
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				picture: this.state.picture,
				address1: this.state.address1,
				address2: this.state.address2,
				city: this.state.city,
				state: this.state.state,
				zipcode: this.state.zipcode,
				email: this.state.email,
				password: this.state.password
			})

		} else if(this.state.action === "login") {
			this.props.register({
				email: this.state.email,
				password: this.state.password
			})
		}

		this.clearForm()
	}

	// clear form
	clearForm = () => {
		this.setState({
			firstName: '',
			lastName: '',
			picture: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zipcode: '',
			email: '',
			password: '',
			action: 'login'
		})
	}

	render() {
		return (
			<div className="login-register-container">
				<Grid className="center aligned">
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
									name="firstName"
									value={this.state.firstName}
									onChange={this.handleChange}
									placeholder="First name" />
								<Form.Input 
									label="Last name"
									type="text"
									name="lastName"
									value={this.state.lastName}
									onChange={this.handleChange} 
									placeholder="Last name" />
							</Form.Group>
							<Form.Group>
								
								<Form.Input 
									label="Address 1"
									type="text" 
									name="address1"
									value={this.state.address1}
									onChange={this.handleChange}
									placeholder="Address 1" />
							
								<Form.Input 
									label="Address 2" 
									type="text" 
									name="address2"
									value={this.state.address2}
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
									name="zipcode"
									value={this.state.zipcode}
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
					
				</Grid>
			</div>
			)
	}
}




export default LoginRegisterForm
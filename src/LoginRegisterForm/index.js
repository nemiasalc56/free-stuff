import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'
import './index.css'

class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: '',
			lastName: '',
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

	render() {
		return (
			<div>
				<div className="login-register-container">
					<h2>LoginRegisterForm</h2>
					<Form>
						<Form.Field>
							<label>First name</label>
							<input 
								type="text" 
								name="firstName"
								value={this.state.firstName}
								onChange={this.handleChange}
								placehoder="First name" />
						</Form.Field>
						<Form.Field>
							<label>Last name</label>
							<input 
								type="text"
								name="lastName"
								value={this.state.lastName}
								onChange={this.handleChange} 
								placehoder="Last name" />
						</Form.Field>
						<Form.Field>
							<label>Address 1</label>
							<input 
								type="text" 
								name="address1"
								value={this.state.address1}
								onChange={this.handleChange}
								placehoder="Address 1" />
						</Form.Field>

						<Form.Field>
							<label>Address 2</label>
							<input 
								type="text" 
								name="address2"
								value={this.state.address2}
								onChange={this.handleChange}
								placehoder="Address 2" />
						</Form.Field>
						<Form.Field>
							<label>City</label>
							<input 
								type="text" 
								name="city"
								value={this.state.city}
								onChange={this.handleChange}
								placehoder="City" />
						</Form.Field>

						<Form.Field>
							<label>State</label>
							<input 
								type="text" 
								name="state"
								value={this.state.state}
								onChange={this.handleChange}
								placehoder="state" />
						</Form.Field>

						<Form.Field>
							<label>Zipcode</label>
							<input 
								type="text" 
								name="zipcode"
								value={this.state.zipcode}
								onChange={this.handleChange}
								placehoder="Zipcode" />
						</Form.Field>

						<Form.Field>
							<label>Email</label>
							<input 
								type="text" 
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
								placehoder="Enter email" />
						</Form.Field>

						<Form.Field>
							<label>Password</label>
							<input 
									type="password" 
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								placehoder="Enter password" />
						</Form.Field>

						<Button type='submit'>Submit</Button>
						<p onClick={this.switch}>Register</p>
					</Form>
					
				</div>
			</div>
			)
	}
}




export default LoginRegisterForm
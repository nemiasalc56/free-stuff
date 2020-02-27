import React, {Component} from 'react'
import { Button, Form } from 'semantic-ui-react'

class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: ''
		}
	}

	render() {
		return (
			<div>
				<h2>LoginRegisterForm</h2>
				<Form>
					<Form.Field>
						<label>First name</label>
						<input 
							type="text" 
							name="firstName"
							placehoder="First name" />
					</Form.Field>
					<Form.Field>
						<label>Last name</label>
						<input 
							type="text"
							name="lastName" 
							placehoder="Last name" />
					</Form.Field>
					<Form.Field>
						<label>Address 1</label>
						<input 
							type="text" 
							name="address1"
							placehoder="Address 1" />
					</Form.Field>

					<Form.Field>
						<label>Address 2</label>
						<input 
							type="text" 
							name="address2"
							placehoder="Address 2" />
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input 
							type="text" 
							name="city"
							placehoder="City" />
					</Form.Field>

					<Form.Field>
						<label>State</label>
						<input 
							type="text" 
							name="state"
							placehoder="state" />
					</Form.Field>

					<Form.Field>
						<label>Zipcode</label>
						<input 
							type="text" 
							name="zipcode"
							placehoder="Zipcode" />
					</Form.Field>

					<Form.Field>
						<label>Email</label>
						<input 
							type="text" 
							name="email"
							placehoder="Enter email" />
					</Form.Field>

					<Form.Field>
						<label>Password</label>
						<input 
								type="password" 
								name="password"
							placehoder="Enter password" />
					</Form.Field>

					<Button type='submit'>Submit</Button>
				</Form>
			</div>
			)
	}
}




export default LoginRegisterForm
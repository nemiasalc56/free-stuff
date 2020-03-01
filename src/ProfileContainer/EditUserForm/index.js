import React, { Component } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'


class EditUserForm extends Component {
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
			password: ''
		}
	}

	// store the info in state
	componentDidMount() {
		this.setState({
			first_name: this.props.user.first_name,
			last_name: this.props.user.last_name,
			picture: this.props.user.picture,
			address_1: this.props.user.address.address_1,
			address_2: this.props.user.address.address_2,
			city: this.props.user.address.city,
			state: this.props.user.address.state,
			zip_code: this.props.user.address.zip_code,
			email: this.props.user.email
		})
	}

	// allow user to type
	handleChange = (e) => {
		
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.updateAccount(this.state)
	}


	render() {
		
		return(
			<Grid className="center aligned">
				<Segment 
					style={{
						marginTop: '200px'
					}}
				>
					
					<Grid.Row>
						<h2>Update your account information</h2>
					</Grid.Row>
					<Form onSubmit={this.handleSubmit}>
						
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

						<Button color="green" className="big login-button" type='submit'>
							Update Account
						</Button>
						<Button 
							onClick={()=>this.props.cancelEdit()}
							className="big login-button" 
							type='submit'>
							Cancel update
						</Button>
						
					</Form>
					
					</Segment>
			</Grid>
		)
	}
}



export default EditUserForm
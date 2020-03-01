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


	render() {
		console.log("props in EditUserForm");
		console.log(this.props);
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
					<Form >
						
						<Form.Group>
							<Form.Input 
								label="First name"
								type="text" 
								name="first_name"
								value={this.state.first_name}
								placeholder="First name" />
							<Form.Input 
								label="Last name"
								type="text"
								name="last_name"
								value={this.state.last_name}
								placeholder="Last name" />
						</Form.Group>
						<Form.Group>
							
							<Form.Input 
								label="Address 1"
								type="text" 
								name="address_1"
								value={this.state.address_1}
								placeholder="Address 1" />
						
							<Form.Input 
								label="Address 2" 
								type="text" 
								name="address_2"
								value={this.state.address_2}
								placeholder="Address 2" />
						
							<Form.Input 
								label="City"
								type="text" 
								name="city"
								value={this.state.city}
								placeholder="City" />
						
							<Form.Input 
								label="State" 
								type="text" 
								name="state"
								value={this.state.state}
								placeholder="state" />
						
							<Form.Input 
								label="Zipcode"
								type="text" 
								name="zip_code"
								value={this.state.zip_code}
								placeholder="Zipcode" />
						</Form.Group>

						<Form.Field>
							<Form.Input 
								label="Image"
								type="text" 
								name="picture"
								value={this.state.picture}
								placeholder='Image' />
						</Form.Field>

						<Form.Field>
							<label>Email</label>
							<input 
								type="text" 
								name="email"
								value={this.state.email}
								placeholder="Enter email" />
						</Form.Field>

						<Form.Field>
							<label>Password</label>
							<input 
								type="password" 
								name="password"
								value={this.state.password}
								placeholder="Enter password" />
						</Form.Field>

						<Button color="green" className="big login-button" type='submit'>
							Update Account
						</Button>
						
					</Form>
					
					</Segment>
			</Grid>
		)
	}
}



export default EditUserForm
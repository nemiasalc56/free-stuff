import React, { Component } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'


class EditUserForm extends Component {


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
						<Form >
							
								<Form.Group>
								<Form.Input 
									label="First name"
									type="text" 
									name="first_name"
									placeholder="First name" />
								<Form.Input 
									label="Last name"
									type="text"
									name="last_name"
									placeholder="Last name" />
							</Form.Group>
							<Form.Group>
								
								<Form.Input 
									label="Address 1"
									type="text" 
									name="address_1"
									placeholder="Address 1" />
							
								<Form.Input 
									label="Address 2" 
									type="text" 
									name="address_2"
									placeholder="Address 2" />
							
								<Form.Input 
									label="City"
									type="text" 
									name="city"
									placeholder="City" />
							
								<Form.Input 
									label="State" 
									type="text" 
									name="state"
									placeholder="state" />
							
								<Form.Input 
									label="Zipcode"
									type="text" 
									name="zip_code"
									placeholder="Zipcode" />
							</Form.Group>

							<Form.Field>
								<Form.Input 
									label="Image"
									type="text" 
									name="picture"
									placeholder='Image' />
							</Form.Field>

							<Form.Field>
								<label>Email</label>
								<input 
									type="text" 
									name="email"
									placeholder="Enter email" />
							</Form.Field>

							<Form.Field>
								<label>Password</label>
								<input 
									type="password" 
									name="password"
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
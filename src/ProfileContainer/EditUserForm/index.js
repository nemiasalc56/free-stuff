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
			password: '',
			lat: '',
			lng: ''
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
			email: this.props.user.email,
			lat: this.props.user.address.lat,
			lng: this.props.user.address.lng
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
		// this.props.updateAccount(this.state)
		this.getCoordinates()
	}

	// get location coordinates
	getCoordinates = async () => {
		// we can fetch mapbox to get latitude and longitude from that location
		const mapboxResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.address_1} ${this.state.address_2} ${this.state.city} ${this.state.state} ${this.state.zip_code}.json?types=address&limit=1&access_token=pk.eyJ1IjoibmVtaWFzYWxjIiwiYSI6ImNrN2M2NzN0YTAwdW0zZnB0OGN1M2RiaW0ifQ.QalGDzlT9KrXIhoOYr5erg`)

		const mapboxJson = await mapboxResponse.json()
		console.log(mapboxJson);
		this.setState({
			lat: mapboxJson.features[0].geometry.coordinates[1],
			lng: mapboxJson.features[0].geometry.coordinates[0]
		})
		console.log("getCoordinates in profile EditUserForm");
		console.log(this.state.lat);
		console.log(this.state.lng);

	}

	render() {
		console.log(this.props);
		console.log(this.state);
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
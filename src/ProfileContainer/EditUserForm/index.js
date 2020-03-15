import React, { Component } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios'

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
			lat: this.props.user.address.lat,
			lng: this.props.user.address.lng,
			formData: null
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
		
		this.getCoordinates()
	}

	// get location coordinates
	getCoordinates = async () => {
		// we can fetch mapbox to get latitude and longitude from that location
		const mapboxResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.address_1} ${this.state.address_2} ${this.state.city} ${this.state.state} ${this.state.zip_code}.json?types=address&limit=1&access_token=pk.eyJ1IjoibmVtaWFzYWxjIiwiYSI6ImNrN2M2NzN0YTAwdW0zZnB0OGN1M2RiaW0ifQ.QalGDzlT9KrXIhoOYr5erg`)

		const mapboxJson = await mapboxResponse.json()
		
		this.setState({
			lat: mapboxJson.features[0].geometry.coordinates[1],
			lng: mapboxJson.features[0].geometry.coordinates[0]
		})
		
		this.uploadImage()
	}

	// this method will handle the changes when user selects a photo
	handleImageUpload = (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		
		// insert the info from the file and from cloudinary in our formData
		formData.append("upload_preset", "nehemias")
		formData.append("file", file)
		// store the form data in state
		this.setState({
			formData: formData
		})
		
	}

	uploadImage = async () => {
		await axios.post('https://api.cloudinary.com/v1_1/free-stuff/image/upload', this.state.formData)
			// when the fetch is resolved we store the image url on state
			.then(res => this.setState({picture: res.data.secure_url}))
			.catch(err => console.log(err))
		
		this.sendUpdate()
	}

	sendUpdate = () => {
		this.props.updateAccount(this.state)
		this.props.closeEditForm()
	}

	render() {

		return(
			<Grid className="center aligned" id="user-edit-form">
				<Segment 
					style={{
						marginTop: '70px'
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
								required={true}
								value={this.state.first_name}
								onChange={this.handleChange}
								placeholder="First name" />
							<Form.Input 
								label="Last name"
								type="text"
								name="last_name"
								required={true}
								value={this.state.last_name}
								onChange={this.handleChange}
								placeholder="Last name" />
						</Form.Group>
						<Form.Group>
							
							<Form.Input 
								label="Address 1"
								type="text" 
								name="address_1"
								required={true}
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
								required={true}
								value={this.state.city}
								onChange={this.handleChange}
								placeholder="City" />
						
							<Form.Input
								label="State" 
								type="text" 
								name="state"
								required={true}
								value={this.state.state}
								onChange={this.handleChange}
								placeholder="state" />
						
							<Form.Input
								label="Zipcode"
								type="text" 
								name="zip_code"
								required={true}
								value={this.state.zip_code}
								onChange={this.handleChange}
								placeholder="Zipcode" />
						</Form.Group>

						<Form.Field>
							<Form.Input 
								label="Image"
								type="file" 
								name="file"
								onChange={this.handleImageUpload}
								placeholder='Image' />
						</Form.Field>

						<Form.Field>
							<Form.Input 
								label="Password"
								type="password" 
								name="password"
								required={true}
								value={this.state.password}
								onChange={this.handleChange}
								placeholder="Enter password" />
						</Form.Field>

						<Button color="green" className="big login-button" type='submit'>
							Update Account
						</Button>
						<Button
							onClick={()=>this.props.closeEditForm()}
							className="big login-button"
							id="cancel-accont-update"
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
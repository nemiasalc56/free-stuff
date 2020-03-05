import React, {Component} from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import './index.css'
import axios from 'axios'

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
			lat: '',
			lng: '',
			email: '',
			password: '',
			action: 'login',
			formData: null
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
			this.setState({action: "register"})
		} else {
			this.setState({action: 'login'})
		}
		this.clearForm()
	}

	// get location coordinates
	getCoordinates = async () => {
		// get latitude and longitude from the address
		const mapboxResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.address_1},${this.state.address_2},${this.state.city},${this.state.state},${this.state.zip_code}.json?types=address&limit=1&access_token=pk.eyJ1IjoibmVtaWFzYWxjIiwiYSI6ImNrN2M2NzN0YTAwdW0zZnB0OGN1M2RiaW0ifQ.QalGDzlT9KrXIhoOYr5erg`)

		const mapboxJson = await mapboxResponse.json()

		this.setState({
			lat: mapboxJson.features[0].geometry.coordinates[1],
			lng: mapboxJson.features[0].geometry.coordinates[0]
		})
	}

	// handle submit
	handleSubmit = async (e) => {
		if(this.state.action === "register"){
			this.getCoordinates()

		}
		e.preventDefault()

		await axios.post('https://api.cloudinary.com/v1_1/free-stuff/image/upload', this.state.formData)
			// when the fetch is resolved we store the image url on state
			.then(res => this.setState({picture: res.data.secure_url}))
			.catch(err => console.log(err))

		if(this.state.action === "register") {
			if(this.state.picture === '') {

				// if the user doesn't select a profile picture we can set this one
				this.setState({picture: "https://i.imgur.com/NNwipjI.png"})
			}
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
		this.setState({
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
		})
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

	render() {
		return (			
			
			<Grid className="center aligned">
				<Segment 
					style={{
						marginTop: '7em',
						boxShadow: '15px 10px 20px 2px #0d6b82'
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
										required={true}
										label="First name"
										type="text" 
										name="first_name"
										value={this.state.first_name}
										onChange={this.handleChange}
										placeholder="First name" />
									<Form.Input 
										required={true}
										label="Last name"
										type="text"
										name="last_name"
										value={this.state.last_name}
										onChange={this.handleChange} 
										placeholder="Last name" />
								</Form.Group>
								
								<Form.Group>
									<Form.Input 
										required={true}
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
										required={true}
										label="City"
										type="text" 
										name="city"
										value={this.state.city}
										onChange={this.handleChange}
										placeholder="City" />
								
									<Form.Input 
										required={true}
										label="State" 
										type="text" 
										name="state"
										value={this.state.state}
										onChange={this.handleChange}
										placeholder="state" />
								
									<Form.Input 
										required={true}
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
										type="file" 
										name="file"
										onChange={this.handleImageUpload}
										placeholder='Image' />
								</Form.Field>
							</div>
							: null
						}

						<Form.Field>
							<Form.Input 
								label="Email"
								type="text" 
								name="email"
								required={true}
								style={{width: "30em"}}
								value={this.state.email}
								onChange={this.handleChange}
								placeholder="Enter email" />
						</Form.Field>

						<Form.Field>
							<Form.Input 
								label="Password"
								type="password" 
								name="password"
								required={true}
								style={{width: "30em"}}
								value={this.state.password}
								onChange={this.handleChange}
								placeholder="Enter password" />
						</Form.Field>

						<Button color="green" className="big login-button" type='submit'>
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
import React, { Component } from 'react'
import { Button, Form, Grid, Segment, TextArea, Select } from 'semantic-ui-react'
import axios from 'axios'

class EditItemForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			description: '',
			picture: '',
			category: '',
			address_1: '',
			address_2: '',
			city: '',
			state: '',
			zip_code: '',
			lat: '',
			lng: '',
			options: this.getOptions(),
			formData: null
		}
	}

	// update info on state with current item
	componentDidMount(){
		this.setState({
			name: this.props.itemToEdit.name,
			description: this.props.itemToEdit.description,
			picture: this.props.itemToEdit.picture,
			category: this.props.itemToEdit.category,
			address_1: this.props.itemToEdit.address_1,
			address_2: this.props.itemToEdit.address_2,
			city: this.props.itemToEdit.city,
			state: this.props.itemToEdit.state,
			zip_code: this.props.itemToEdit.zip_code,
			lat: this.props.itemToEdit.lat,
			lng: this.props.itemToEdit.lng
		})
	}


	// options for our category
	getOptions = () => {
		const categoryOptions = [
			{ key: 'el', value: 'electronics', text: 'Electronics' },
			{ key: 'ca', value: 'collectibles_art', text: 'Collectibles & Art' },
			{ key: 'hg', value: 'home_garden', text: 'Home & Garden' },
			{ key: 'cl', value: 'clothing', text: 'Clothing' },
			{ key: 'sp', value: 'sport', text: 'Sport' },
			{ key: 'to', value: 'toys', text: 'Toys' },
			{ key: 'mb', value: 'music_books', text: 'Music & Books' },
			{ key: 'en', value: 'entertaiment', text: 'Entertaiment' },
			{ key: 'ot', value: 'other', text: 'Other' }
		]
		return categoryOptions
	}



	// method to allow user to type
	handleChange = (e)=>{

		this.setState({
			[e.target.name]: e.target.value
		})
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
		console.log(this.state.lat);
		console.log(this.state.lng);
		this.uploadImage()
		console.log("getCoordinates 2");
	}

	// handle submit
	handleSubmit = (e) => {
		e.preventDefault()
		console.log("handleSubmit 1");
		this.getCoordinates()
	}

	uploadImage = async () => {
		await axios.post('https://api.cloudinary.com/v1_1/free-stuff/image/upload', this.state.formData)
			// when the fetch is resolved we store the image url on state
			.then(res => this.setState({picture: res.data.secure_url}))
			.catch(err => console.log(err))
		console.log("uploadImage 3");
		this.sendUpdate()
	}

	sendUpdate = () => {
		this.props.updateItem(this.state)
		console.log("sendUpdate 4");
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
		
		return(
			<div>
				<Grid className="center aligned">
					<Segment 
						style={{
							marginTop: '200px'
						}}
					>
						<Grid.Row>
							<h2>Edit this item</h2>
						</Grid.Row>
						<Form onSubmit={this.handleSubmit}>
	
								<div>
									<Form.Field>
									<Form.Input 
										label="Name"
										type="text" 
										name="name"
										value={this.state.name}
										onChange={this.handleChange}
										placeholder="Name" />
									
								</Form.Field>
								<Form.Field>
								<label>Category</label>
								<Select 
									placeholder='Select a category' 
									value={this.state.category}
									options={this.state.options}
									onChange={(e, { value }) => this.setState({category: value})} 

								/>
							</Form.Field>
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
										type="file" 
										name="file"
										onChange={this.handleImageUpload}
										placeholder='Image' />
								</Form.Field>
								</div>


							<label>Description</label>
							<TextArea
								type="text"
								name="description"
								value={this.state.description}
								placeholder="Description"
								onChange={this.handleChange}
							/>
								

							<Button color="green" className="big" type='submit'>
								Update
							</Button>
							
						</Form>
					
					</Segment>
				</Grid>
			</div>
			)
	}
}





export default EditItemForm
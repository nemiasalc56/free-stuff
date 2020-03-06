import React, { Component } from 'react'
import { Button, Form, Grid, Segment, TextArea, Select, Checkbox } from 'semantic-ui-react'
import axios from 'axios'

class NewItemForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			description: '',
			picture: '',
			category: '',
			useProfileAddr: false,
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

	// options for our category
	getOptions = () => {
		const categoryOptions = [
			{ key: 'el', value: 'electronics', text: 'Electronics' },
			{ key: 'ca', value: 'collectibles_and_art', text: 'Collectibles & Art' },
			{ key: 'hg', value: 'home_and_garden', text: 'Home & Garden' },
			{ key: 'cl', value: 'clothing', text: 'Clothing' },
			{ key: 'sp', value: 'sport', text: 'Sport' },
			{ key: 'to', value: 'toys', text: 'Toys' },
			{ key: 'mb', value: 'music_and_books', text: 'Music & Books' },
			{ key: 'en', value: 'entertaiment', text: 'Entertaiment' },
			{ key: 'ot', value: 'others', text: 'Others' }
		]
		return categoryOptions
	}

	// handle change
	handleChange = (e) => {

		this.setState({
			[e.target.name]: e.target.value
		})

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

	// handle submit
	handleSubmit = (e) => {
		this.getCoordinates()
		e.preventDefault()
	}

	uploadImage = async () => {
		await axios.post('https://api.cloudinary.com/v1_1/free-stuff/image/upload', this.state.formData)
			// when the fetch is resolved we store the image url on state
			.then(res => this.setState({picture: res.data.secure_url}))
			.catch(err => console.log(err))

		if(this.state.picture !== ''){
			this.createItem()
		}
	}

	createItem = () => {
		this.props.postItem(this.state)
	}

	// use profile address
	useProfileAddr = () => {
		if(this.state.useProfileAddr) {
			this.setState({
				useProfileAddr: false,
				address_1: '',
				address_2: '',
				city: '',
				state: '',
				zip_code: '',
				lat: '',
				lng: ''
		})
		} else {
			this.setState({
				useProfileAddr: true,
				address_1: this.props.user.address.address_1,
				address_2: this.props.user.address.address_2,
				city: this.props.user.address.city,
				state: this.props.user.address.state,
				zip_code: this.props.user.address.zip_code,
				lat: this.props.user.address.lat,
				lng: this.props.user.address.lng
			})
		}
		
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
						id="item-new-form"
						style={{
							marginTop: '50px'
						}}
					>
						<Grid.Row style={{textAlign: "center"}}>
							<h2>Post a Free Item</h2>
						</Grid.Row>
						<Form onSubmit={this.handleSubmit}>
	
							<div>
								<Form.Field>
									<Form.Input 
										label="Name"
										type="text" 
										name="name"
										required={true}
										value={this.state.name}
										onChange={this.handleChange}
										placeholder="Name" />
									
								</Form.Field>
								<Form.Field>
									<label>Category</label>
									<Select 
										placeholder='Select a category'
										required={true}
										options={this.state.options}
										onChange={(e, { value }) => this.setState({category: value})} 

									/>
								</Form.Field>
								<Form.Field>
									<Checkbox 
										onChange={this.useProfileAddr}
										label="Use your account address"/>
									
								</Form.Field>

								<Form.Group>
									<Form.Input 
										label="Address 1"
										type="text" 
										name="address_1"
										required={true}
										value={this.state.address_1}
										onChange={this.state.useProfileAddr?null:this.handleChange}
										placeholder="Address 1" />
								
									<Form.Input 
										label="Address 2" 
										type="text" 
										name="address_2"
										value={this.state.address_2}
										onChange={this.state.useProfileAddr?null:this.handleChange}
										placeholder="Address 2" />
								
									<Form.Input 
										label="City"
										type="text" 
										name="city"
										required={true}
										value={this.state.city}
										onChange={this.state.useProfileAddr?null:this.handleChange}
										placeholder="City" />
								
									<Form.Input 
										label="State" 
										type="text" 
										name="state"
										required={true}
										value={this.state.state}
										onChange={this.state.useProfileAddr?null:this.handleChange}
										placeholder="state" />
								
									<Form.Input 
										label="Zipcode"
										type="text" 
										name="zip_code"
										required={true}
										value={this.state.zip_code}
										onChange={this.state.useProfileAddr?null:this.handleChange}
										placeholder="Zipcode" />
								</Form.Group>

								<Form.Field>
									<Form.Input 
										label="Image"
										type="file" 
										name="file"
										required={true}
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
								

							<Button 
								style={{width: "100%"}} 
								color="green" 
								className="big" 
								type='submit'>
								Post Free Item
							</Button>
							
						</Form>
					
					</Segment>
				</Grid>
			</div>
			)
	}
}





export default NewItemForm